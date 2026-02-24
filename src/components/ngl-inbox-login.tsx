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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyPinAndGetUserAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { CheckCircle2 } from 'lucide-react';


export default function NGLInboxLogin() {
  const { translations } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
        setShowSuccess(true);
        const timer = setTimeout(() => setShowSuccess(false), 5000);
        // clean up timer and url
        return () => {
            clearTimeout(timer);
            window.history.replaceState(null, '', '/ngl/inbox');
        }
    }
  }, [searchParams]);

  const formSchema = z.object({
    username: z.string().min(1, "Username is required."),
    pin: z.string().min(1, "PIN is required."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: searchParams.get('username') || '',
      pin: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
        const user = await verifyPinAndGetUserAction(values.username, values.pin);
        if (user) {
            sessionStorage.setItem(`ngl_pin_${user.username}`, values.pin);
            router.push(`/ngl/inbox/${user.username}`);
        } else {
            toast({
                variant: 'destructive',
                title: 'Login Failed',
                description: translations.ngl.login.error,
            });
             form.setError("pin", { type: "server", message: translations.ngl.login.error });
        }
    } catch(e) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: (e as Error).message,
        });
    }
    setIsSubmitting(false);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{translations.ngl.login.title}</CardTitle>
        <CardDescription>{translations.ngl.login.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {showSuccess && (
            <Alert className="mb-4 border-green-500 bg-green-50 text-green-800">
                <CheckCircle2 className="h-4 w-4 !text-green-600" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                    {translations.ngl.create.success}
                </AlertDescription>
            </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.ngl.login.username.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.ngl.login.username.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.ngl.login.pin.label}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={translations.ngl.login.pin.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {translations.ngl.login.submitButton}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="w-full" asChild>
            <Link href="/ngl/create">{translations.ngl.login.createLink}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
