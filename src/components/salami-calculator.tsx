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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from 'react';
import { Calculator, Loader2 } from 'lucide-react';
import SalamiCalculatorResult from './salami-calculator-result';

type RelationshipStatus = 'single' | 'in_relationship' | 'engaged' | 'married' | 'crush';
type Gender = 'male' | 'female';

export type CalculatorResultData = {
    name: string;
    relationshipStatus: RelationshipStatus;
    gender: Gender;
}

export default function SalamiCalculator() {
  const { translations } = useLanguage();
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculatorResultData | null>(null);

  const formSchema = z.object({
    name: z.string().min(2, translations.form.errors.name.min),
    relationshipStatus: z.enum(['single', 'in_relationship', 'engaged', 'married', 'crush']),
    gender: z.enum(['male', 'female']),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      relationshipStatus: 'single',
      gender: 'male',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsCalculating(true);
    setResult(null);
    // Simulate calculation time for animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setResult(values as CalculatorResultData);
    setIsCalculating(false);
  }

  if (result) {
    return <SalamiCalculatorResult result={result} onReset={() => setResult(null)} />;
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
                  <FormLabel>{translations.calculator.name.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={translations.calculator.name.placeholder} {...field} />
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
                  <FormLabel>{translations.calculator.gender.label}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {translations.calculator.gender.options.male}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {translations.calculator.gender.options.female}
                        </FormLabel>
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
                  <FormLabel>{translations.calculator.relationship.label}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={translations.calculator.relationship.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="single">{translations.calculator.relationship.options.single}</SelectItem>
                      <SelectItem value="in_relationship">{translations.calculator.relationship.options.in_relationship}</SelectItem>
                      <SelectItem value="engaged">{translations.calculator.relationship.options.engaged}</SelectItem>
                      <SelectItem value="married">{translations.calculator.relationship.options.married}</SelectItem>
                      <SelectItem value="crush">{translations.calculator.relationship.options.crush}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" size="lg" disabled={isCalculating}>
              {isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calculator className="mr-2 h-4 w-4" />}
              {isCalculating ? translations.calculator.calculating : translations.calculator.calculateButton}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
