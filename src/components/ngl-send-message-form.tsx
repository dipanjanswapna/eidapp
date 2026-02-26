'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sendNGLMessageAction } from '@/lib/actions';
import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from './ui/toast';
import Link from 'next/link';

export function NGLSendMessageForm({ username }: { username: string }) {
  const { translations } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    message: z.string().min(1, translations.ngl.send.message.error),
    senderTag: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      senderTag: 'anonymous',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
        await sendNGLMessageAction(username, values);
        toast({ 
            title: translations.ngl.send.success.title,
            description: translations.ngl.send.success.description,
            action: (
                <ToastAction asChild altText={translations.ngl.send.success.cta}>
                    <Link href="/ngl/create">{translations.ngl.send.success.cta}</Link>
                </ToastAction>
            )
        });
        form.reset();
    } catch(error) {
        toast({ variant: 'destructive', title: 'Error', description: (error as Error).message });
    }
    setIsSubmitting(false);
  }

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={translations.ngl.send.message.placeholder}
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="senderTag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translations.ngl.send.senderTag.label}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={translations.ngl.send.senderTag.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(translations.ngl.send.senderTag.options).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send />}
            {translations.ngl.send.submitButton}
          </Button>

          <div className="relative flex items-center justify-center text-sm">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted" />
            </div>
            <div className="relative bg-card px-2 text-muted-foreground">
              {translations.ngl.send.orSeparator}
            </div>
          </div>

          <Button variant="outline" className="w-full" asChild>
            <Link href="/ngl/create">{translations.ngl.send.getYourOwnButton}</Link>
          </Button>
        </form>
      </Form>
    </CardContent>
  );
}
