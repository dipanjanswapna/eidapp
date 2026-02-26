'use client';
import { useEffect, useState, useRef } from 'react';
import { NGLMessage, NGLUser } from '@/lib/types';
import { getNGLMessagesAction, replyToMessageAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MessageCircle, LogOut, Share2, Copy, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useLanguage } from '@/contexts/language-context';
import { formatDistanceToNow } from 'date-fns';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import NGLReplyAndShareCard from './ngl-reply-and-share-card';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

export function NGLInboxClient({ user, pin }: { user: NGLUser, pin: string }) {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();

  const [messages, setMessages] = useState<NGLMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [currentMessage, setCurrentMessage] = useState<NGLMessage | null>(null);

  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const shareCardRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await getNGLMessagesAction(user.username, pin);
        setMessages(fetchedMessages);
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: (error as Error).message });
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [user.username, pin, toast]);

  const handleReplyClick = (message: NGLMessage) => {
    setCurrentMessage(message);
    setReplyText(message.reply || '');
    setShowReplyDialog(true);
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage || !replyText.trim()) return;
    setIsReplying(true);
    try {
      const updatedMessage = await replyToMessageAction(currentMessage.id, replyText, user.username, pin);
      setMessages(msgs => msgs.map(m => m.id === updatedMessage.id ? updatedMessage : m));
      setCurrentMessage(updatedMessage);
      setShowReplyDialog(false);
      setShowShareDialog(true);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: (error as Error).message });
    } finally {
      setIsReplying(false);
    }
  };
  
  const handleDownload = () => {
    if (!shareCardRef.current) return;
    setIsDownloading(true);
    html2canvas(shareCardRef.current, { scale: 2, useCORS: true, backgroundColor: null }).then(canvas => {
      const link = document.createElement('a');
      link.download = `eidvibe-reply-${currentMessage?.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setIsDownloading(false);
    }).catch(err => {
      console.error(err);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not generate image.' });
      setIsDownloading(false);
    })
  };
  
    const handleShareStory = async () => {
    if (!shareCardRef.current) return;

    setIsSharing(true);
    try {
      const canvas = await html2canvas(shareCardRef.current, { scale: 2, useCORS: true, backgroundColor: null });
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));

      if (!blob) {
        throw new Error("Failed to convert card to an image.");
      }

      const filesArray = [
        new File([blob], `eidvibe-reply-${currentMessage?.id}.png`, {
          type: 'image/png',
          lastModified: new Date().getTime(),
        }),
      ];
      
      if (!navigator.share) {
        throw new Error("Sharing not supported on this browser.");
      }
      
      if (navigator.canShare && !navigator.canShare({ files: filesArray })) {
          throw new Error("Sharing files not supported on this browser.");
      }

      await navigator.share({
        title: 'My EidVibe Reply!',
        files: filesArray,
      });

    } catch (error: any) {
      if (error.name !== 'AbortError') {
        toast({
          variant: 'destructive',
          title: "Share Failed",
          description: translations.ngl.inbox.shareModal.shareError,
        });
      }
    } finally {
      setIsSharing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(`ngl_pin_${user.username}`);
    router.push('/ngl/inbox');
    toast({ title: "Logged out successfully."});
  };

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/ngl/${user.username}` : '';
  
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({ title: translations.ngl.inbox.share.linkCopied });
  };

  const handleShare = () => {
    if (navigator.share) {
        navigator.share({
            title: `Send me anonymous messages!`,
            text: `Send me secret Eid letters on EidVibe!`,
            url: shareUrl,
        }).catch(err => {
            // Avoid showing an error if the user cancels the share sheet
            if (err.name !== 'AbortError') {
              console.error("Share failed", err);
              toast({
                  variant: 'destructive',
                  title: "Share Failed",
                  description: "Could not share the link automatically.",
              });
            }
        });
    }
  };


  return (
    <div className="container relative z-10 mx-auto max-w-3xl px-4 py-12">
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>{translations.ngl.inbox.share.title}</CardTitle>
                <CardDescription>{translations.ngl.inbox.share.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input 
                        readOnly 
                        value={shareUrl}
                        className="bg-muted"
                    />
                    <Button onClick={handleCopy} className="w-full sm:w-auto shrink-0" variant="outline">
                        <Copy className="mr-2 h-4 w-4" />
                        {translations.ngl.inbox.share.copyButton}
                    </Button>
                    <Button onClick={handleShare} className="w-full sm:w-auto shrink-0">
                        <Share2 className="mr-2 h-4 w-4" />
                        {translations.ngl.inbox.share.shareButton}
                    </Button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle>{translations.ngl.inbox.title}</CardTitle>
                    <CardDescription>@{user.username}</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" />{translations.ngl.inbox.logout}</Button>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                ) : messages.length > 0 ? (
                    <div className="space-y-4">
                        {messages.map(msg => (
                            <div key={msg.id} className="rounded-lg border bg-secondary/30 p-4">
                                <p className="italic text-lg">"{msg.message}"</p>
                                <div className="mt-3 flex justify-between items-center text-sm">
                                    <span className="font-semibold text-muted-foreground">- {translations.ngl.send.senderTag.options[msg.senderTag as keyof typeof translations.en.ngl.send.senderTag.options]}</span>
                                    <span className="text-muted-foreground">{formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}</span>
                                </div>
                                {msg.isReplied && (
                                    <div className="mt-3 rounded-md bg-primary/10 p-3">
                                        <p className="font-semibold text-primary">Your Reply:</p>
                                        <p className="italic text-primary/80">"{msg.reply}"</p>
                                    </div>
                                )}
                                <div className="mt-4 flex justify-end">
                                    <Button size="sm" onClick={() => handleReplyClick(msg)}>
                                        {msg.isReplied ? translations.ngl.inbox.repliedStatus : translations.ngl.inbox.replyButton}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-muted-foreground">
                        <MessageCircle className="mx-auto h-12 w-12" />
                        <p className="mt-4">{translations.ngl.inbox.noMessages}</p>
                        <Button variant="link" asChild><Link href={`/ngl/${user.username}`}>Share your link!</Link></Button>
                    </div>
                )}
            </CardContent>
        </Card>

        <Dialog open={showReplyDialog} onOpenChange={setShowReplyDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{translations.ngl.inbox.replyModal.title}</DialogTitle>
                </DialogHeader>
                <div className="italic border-l-4 border-muted-foreground/20 pl-4 text-muted-foreground">"{currentMessage?.message}"</div>
                <form onSubmit={handleReplySubmit} className="space-y-4">
                    <Textarea 
                        placeholder={translations.ngl.inbox.replyModal.reply.placeholder} 
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        className="min-h-[100px]"
                    />
                    <Button type="submit" className="w-full" disabled={isReplying}>
                        {isReplying && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                        {translations.ngl.inbox.replyModal.submitButton}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>

        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <DialogContent className="max-w-md">
                 <DialogHeader>
                    <DialogTitle>{translations.ngl.inbox.shareModal.title}</DialogTitle>
                    <DialogDescription>{translations.ngl.inbox.shareModal.description}</DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] rounded-md">
                    <div className="p-4" ref={shareCardRef}>
                        {currentMessage && <NGLReplyAndShareCard user={user} message={currentMessage} />}
                    </div>
                </ScrollArea>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button onClick={handleDownload} disabled={isDownloading || isSharing} className="w-full">
                        {isDownloading ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Download className="mr-2 h-4 w-4" />}
                        {translations.ngl.inbox.shareModal.downloadButton}
                    </Button>
                    <Button onClick={handleShareStory} disabled={isSharing || isDownloading} className="w-full">
                        {isSharing ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Share2 className="mr-2 h-4 w-4" />}
                        {isSharing ? translations.ngl.inbox.shareModal.sharing : translations.ngl.inbox.shareModal.shareButton}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  );
}
