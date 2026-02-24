'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createNGLProfileAction } from '@/lib/actions';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export default function NGLCreateForm() {
  const { translations } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    username: z.string().min(3, "Username must be at least 3 characters.").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
    pin: z.string().min(4, "PIN must be at least 4 digits.").max(6, "PIN can be at most 6 digits."),
    gender: z.enum(['male', 'female', 'other']),
    profession: z.string().min(1, "Profession is required."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      username: '',
      pin: '',
      gender: 'male',
      profession: 'student',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await createNGLProfileAction(values);
    
    if (result?.error) {
        if(result.error.name) form.setError("name", { type: "server", message: result.error.name[0] });
        if(result.error.username) form.setError("username", { type: "server", message: result.error.username[0] });
        if(result.error.pin) form.setError("pin", { type: "server", message: result.error.pin[0] });
    }
    
    setIsSubmitting(false);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{translations.ngl.create.title}</CardTitle>
        <CardDescription>{translations.ngl.create.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.ngl.create.name.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.ngl.create.name.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.ngl.create.username.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.ngl.create.username.placeholder} {...field} />
                  </FormControl>
                  <FormDescription>{translations.ngl.create.username.description.replace('{username}', field.value || 'username')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.ngl.create.pin.label}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={translations.ngl.create.pin.placeholder} {...field} />
                  </FormControl>
                  <FormDescription>{translations.ngl.create.pin.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{translations.ngl.create.gender.label}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="male" /></FormControl>
                        <FormLabel className="font-normal">{translations.ngl.create.gender.male}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="female" /></FormControl>
                        <FormLabel className="font-normal">{translations.ngl.create.gender.female}</FormLabel>
                      </FormItem>
                       <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="other" /></FormControl>
                        <FormLabel className="font-normal">{translations.ngl.create.gender.other}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.ngl.create.profession.label}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={translations.ngl.create.profession.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(translations.calculator.form.profession.options).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {translations.ngl.create.submitButton}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
