'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createSalamiPageAction, generateMessageAction } from '@/lib/actions';
import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CreateSalamiForm() {
  const { translations } = useLanguage();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    userName: z.string().min(2, translations.form.errors.name.min),
    salamiMessage: z.string().min(5, translations.form.errors.message.min),
    cardTheme: z.enum(['Funny', 'Cute', 'Traditional']),
    bkashNumber: z.string().optional(),
    nagadNumber: z.string().optional(),
  }).refine(data => data.bkashNumber || data.nagadNumber, {
    message: translations.form.errors.payment.required,
    path: ['bkashNumber'],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: '',
      salamiMessage: '',
      cardTheme: 'Funny',
      bkashNumber: '',
      nagadNumber: '',
    },
  });

  async function handleGenerateMessage() {
    setIsGenerating(true);
    const { userName, cardTheme } = form.getValues();
    if (!userName) {
        toast({
            variant: "destructive",
            title: translations.form.ai.errorTitle,
            description: translations.form.ai.nameRequired,
        });
        setIsGenerating(false);
        return;
    }

    try {
        const result = await generateMessageAction({
            userName,
            targetAudience: "friends and family",
            cardTheme,
            amountDesired: "any amount",
        });
        if (result.salamiMessage) {
            form.setValue('salamiMessage', result.salamiMessage);
        } else {
             toast({
                variant: "destructive",
                title: translations.form.ai.errorTitle,
                description: "Failed to generate message.",
            });
        }
    } catch (error) {
        console.error(error);
        toast({
            variant: "destructive",
            title: translations.form.ai.errorTitle,
            description: (error as Error).message,
        });
    } finally {
        setIsGenerating(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await createSalamiPageAction(values);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{translations.form.title}</CardTitle>
        <CardDescription>{translations.form.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.form.name.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.form.name.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salamiMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.form.message.label}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={translations.form.message.placeholder}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="button" variant="outline" size="sm" onClick={handleGenerateMessage} disabled={isGenerating}>
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {translations.form.ai.buttonText}
            </Button>


            <FormField
              control={form.control}
              name="cardTheme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.form.theme.label}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={translations.form.theme.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Funny">{translations.form.theme.options.funny}</SelectItem>
                      <SelectItem value="Cute">{translations.form.theme.options.cute}</SelectItem>
                      <SelectItem value="Traditional">{translations.form.theme.options.traditional}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bkashNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.form.bkash.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.form.bkash.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nagadNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.form.nagad.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.form.nagad.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {translations.form.submitButton}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
