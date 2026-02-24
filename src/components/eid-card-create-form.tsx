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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { cn } from '@/lib/utils';
import { createEidCardAction } from '@/lib/actions';

export default function EidCardCreateForm() {
  const { translations } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    recipientName: z.string().min(2, "Recipient's name is required."),
    message: z.string().min(5, "Message must be at least 5 characters."),
    theme: z.enum(['royal-blue', 'bright-red', 'golden-yellow']),
    bkashNumber: z.string().optional(),
    nagadNumber: z.string().optional(),
    rocketNumber: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientName: '',
      message: '',
      theme: 'royal-blue',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await createEidCardAction(values);
    // Redirect is handled by server action
  }

  const themes = [
    { value: 'royal-blue', label: translations.eidCard.create.theme['royal-blue'], color: 'bg-blue-600' },
    { value: 'bright-red', label: translations.eidCard.create.theme['bright-red'], color: 'bg-red-600' },
    { value: 'golden-yellow', label: translations.eidCard.create.theme['golden-yellow'], color: 'bg-yellow-500' },
  ] as const;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{translations.eidCard.create.title}</CardTitle>
        <CardDescription>{translations.eidCard.create.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="recipientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.eidCard.create.recipient.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.eidCard.create.recipient.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.eidCard.create.message.label}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={translations.eidCard.create.message.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{translations.eidCard.create.theme.label}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                      {themes.map(theme => (
                        <FormItem key={theme.value}>
                            <FormControl>
                                <RadioGroupItem value={theme.value} className="sr-only" />
                            </FormControl>
                            <FormLabel className={cn(
                                "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                field.value === theme.value && "border-primary"
                            )}>
                                <span className={cn("mb-2 block h-6 w-6 rounded-full", theme.color)}></span>
                                {theme.label}
                            </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
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
            
            <FormField
              control={form.control}
              name="rocketNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.form.rocket.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.form.rocket.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {translations.eidCard.create.submitButton}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
