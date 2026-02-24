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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SalamiCalculator() {
  const { translations } = useLanguage();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    gender: z.enum(['male', 'female']),
    relationshipStatus: z.enum([
      'single',
      'in_a_relationship',
      'engaged',
      'married',
      'has_crush',
      'divorced',
      'secret_relation',
    ]),
    profession: z.enum([
        'student','unemployed','job_holder','govt_job_holder','doctor','engineer','teacher','freelancer','businessman','expat_worker','gen_z','retired_awami_leaguer'
    ]),
    monthlyIncome: z.string().refine(val => !isNaN(parseInt(val, 10)), {
        message: "Must be a number"
    }).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      gender: 'male',
      relationshipStatus: 'single',
      profession: 'student',
      monthlyIncome: '0',
    },
  });

  const profession = form.watch('profession');
  const isJobHolder = profession === 'job_holder' || profession === 'govt_job_holder';

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const params = new URLSearchParams(values as Record<string, string>);
    router.push(`/calculator/result?${params.toString()}`);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{translations.calculator.title}</CardTitle>
        <CardDescription>{translations.calculator.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.calculator.form.name.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.calculator.form.name.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{translations.calculator.form.gender.label}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">{translations.calculator.form.gender.male}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">{translations.calculator.form.gender.female}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relationshipStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.calculator.form.relationship.label}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={translations.calculator.form.relationship.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(translations.calculator.form.relationship.options).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translations.calculator.form.profession.label}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={translations.calculator.form.profession.placeholder} />
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

            {isJobHolder && (
                 <FormField
                    control={form.control}
                    name="monthlyIncome"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>{translations.calculator.form.income.label}</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder={translations.calculator.form.income.placeholder} {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {translations.calculator.form.submitButton}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
