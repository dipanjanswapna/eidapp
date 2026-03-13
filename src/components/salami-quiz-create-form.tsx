'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createSalamiQuizAction } from '@/lib/actions';
import { Loader2, Copy, Link as LinkIcon, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SalamiQuizCreateForm() {
  const { translations } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdQuizId, setCreatedQuizId] = useState<string | null>(null);
  const quizQuestions = translations.salamiQuiz.questions;

  const formSchema = z.object({
    creatorName: z.string().min(2, translations.salamiQuiz.form.name.error),
    maxSalami: z.coerce.number().min(1, translations.salamiQuiz.form.maxSalami.error),
    gender: z.enum(['male', 'female', 'other'], {
      required_error: translations.salamiQuiz.form.gender.error,
    }),
    questions: z.record(z.string()).refine(val => Object.keys(val).length > 0, {
      message: translations.salamiQuiz.form.questions.error,
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      creatorName: '',
      maxSalami: 500,
      gender: 'male',
      questions: {},
    },
  });

  const watchQuestions = form.watch('questions');
  const selectedQuestionIds = Object.keys(watchQuestions);
  
  const quizUrl = createdQuizId && typeof window !== 'undefined'
    ? `${window.location.origin}/salami-quiz/${createdQuizId}`
    : '';

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const formattedQuestions = Object.entries(values.questions).map(([id, correctAnswer]) => {
        const questionData = quizQuestions.find(q => q.id === id);
        return {
            id,
            question: questionData!.question,
            options: questionData!.options,
            correctAnswer: correctAnswer,
        }
    });

    const result = await createSalamiQuizAction({
        ...values,
        questions: formattedQuestions
    });

    if (result?.success && result.quizId) {
        setCreatedQuizId(result.quizId);
        toast({
            title: translations.salamiQuiz.form.success.title,
            description: translations.salamiQuiz.form.success.description,
        });
    } else if (result?.error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please check your form for errors."
        })
        if (result.error.questions) {
             form.setError("questions", { type: "server", message: result.error.questions[0] as string });
        }
    }
    setIsSubmitting(false);
  }
  
  const handleCopy = () => {
    if (!quizUrl) return;
    navigator.clipboard.writeText(quizUrl);
    toast({ title: translations.salamiQuiz.form.success.linkCopied });
  };
  
  const handleReset = () => {
    form.reset({
      creatorName: '',
      maxSalami: 500,
      gender: 'male',
      questions: {},
    });
    setCreatedQuizId(null);
  };
  
  if (createdQuizId) {
    return (
     <Card className="w-full">
       <CardHeader>
         <CardTitle>{translations.salamiQuiz.form.linkCreatedTitle}</CardTitle>
         <CardDescription>{translations.salamiQuiz.form.shareDescription}</CardDescription>
       </CardHeader>
       <CardContent className="space-y-4">
           <div className="flex flex-col sm:flex-row gap-2">
               <Input readOnly value={quizUrl} className="bg-muted" />
               <Button onClick={handleCopy} variant="outline" className="w-full sm:w-auto shrink-0">
                   <Copy className="mr-2 h-4 w-4" />
                   {translations.salamiQuiz.form.copyButton}
               </Button>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Button asChild>
                   <a href={quizUrl} target="_blank" rel="noopener noreferrer">
                       <LinkIcon className="mr-2 h-4 w-4" />
                       {translations.salamiQuiz.form.viewQuizButton}
                   </a>
               </Button>
               <Button onClick={handleReset} variant="secondary">
                   <RotateCcw className="mr-2 h-4 w-4" />
                   {translations.salamiQuiz.form.createAnotherButton}
               </Button>
           </div>
       </CardContent>
     </Card>
   );
  }


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{translations.salamiQuiz.create.title}</CardTitle>
        <CardDescription>{translations.salamiQuiz.create.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="creatorName"
                render={({ field }) => (
                    <FormItem>
                    <Label>{translations.salamiQuiz.form.name.label}</Label>
                    <FormControl>
                        <Input placeholder={translations.salamiQuiz.form.name.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="maxSalami"
                render={({ field }) => (
                    <FormItem>
                    <Label>{translations.salamiQuiz.form.maxSalami.label}</Label>
                    <FormControl>
                        <Input type="number" placeholder={translations.salamiQuiz.form.maxSalami.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <Label>{translations.salamiQuiz.form.gender.label}</Label>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="male" /></FormControl>
                        <Label className="font-normal">{translations.salamiQuiz.form.gender.male}</Label>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="female" /></FormControl>
                        <Label className="font-normal">{translations.salamiQuiz.form.gender.female}</Label>
                      </FormItem>
                       <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl><RadioGroupItem value="other" /></FormControl>
                        <Label className="font-normal">{translations.salamiQuiz.form.gender.other}</Label>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
                <Label>{translations.salamiQuiz.form.questions.label}</Label>
                <p className="text-sm text-muted-foreground">{translations.salamiQuiz.form.questions.description}</p>
                {form.formState.errors.questions && <p className="text-sm font-medium text-destructive">{form.formState.errors.questions.message as string}</p>}
                <div className="space-y-6 pt-4">
                    {quizQuestions.map((q, index) => (
                    <Card key={q.id} className="p-4">
                        <div className="flex items-start gap-4">
                        <Checkbox
                            id={`q-select-${q.id}`}
                            checked={selectedQuestionIds.includes(q.id)}
                            onCheckedChange={(checked) => {
                            const currentQuestions = form.getValues('questions');
                            if (checked) {
                                currentQuestions[q.id] = q.options[0]; // Default to first option
                            } else {
                                delete currentQuestions[q.id];
                            }
                            form.setValue('questions', currentQuestions, { shouldValidate: true, shouldDirty: true });
                            }}
                            className="mt-1"
                        />
                        <div className="flex-1">
                            <Label htmlFor={`q-select-${q.id}`} className="font-bold text-base cursor-pointer">
                                {index + 1}. {q.question}
                            </Label>
                            {selectedQuestionIds.includes(q.id) && (
                            <Controller
                                control={form.control}
                                name={`questions.${q.id}`}
                                render={({ field }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="mt-4 space-y-2"
                                >
                                    {q.options.map((option) => (
                                    <FormItem key={option} className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                                        </FormControl>
                                        <Label htmlFor={`${q.id}-${option}`} className="font-normal cursor-pointer">{option}</Label>
                                    </FormItem>
                                    ))}
                                </RadioGroup>
                                )}
                            />
                            )}
                        </div>
                        </div>
                    </Card>
                    ))}
                </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : '🔗'}
              {translations.salamiQuiz.form.submitButton}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
