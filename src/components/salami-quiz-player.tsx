'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SalamiQuiz } from '@/lib/types';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Input } from './ui/input';

export default function SalamiQuizPlayer({ quiz }: { quiz: SalamiQuiz }) {
  const { translations } = useLanguage();
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [takerName, setTakerName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // End of quiz
      let score = 0;
      quiz.questions.forEach(q => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          score++;
        }
      });
      router.push(`/salami-quiz/${quiz.id}/result?score=${score}&total=${quiz.questions.length}&takerName=${encodeURIComponent(takerName)}&quizId=${quiz.id}`);
    }
  };
  
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(takerName.trim()) {
        setNameSubmitted(true);
    }
  }

  if (!nameSubmitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{translations.salamiQuiz.player.title.replace('{name}', quiz.creatorName)}</CardTitle>
          <CardDescription>{translations.salamiQuiz.player.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <Input 
              value={takerName}
              onChange={(e) => setTakerName(e.target.value)}
              placeholder={translations.salamiQuiz.player.name.placeholder}
              required
            />
            <Button type="submit" className="w-full">{translations.salamiQuiz.player.startButton}</Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="text-xl">
          {translations.salamiQuiz.player.question} {currentQuestionIndex + 1}/{quiz.questions.length}
        </CardTitle>
        <CardDescription className="text-lg pt-2">{currentQuestion.question}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswers[currentQuestion.id]}
          onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
          className="space-y-3"
        >
          {currentQuestion.options.map(option => (
            <div key={option} className="flex items-center space-x-3 rounded-md border p-4 hover:bg-accent/50 has-[[data-state=checked]]:bg-accent">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button 
          onClick={handleNextQuestion} 
          disabled={!selectedAnswers[currentQuestion.id]}
          className="w-full mt-6"
          size="lg"
        >
          {currentQuestionIndex < quiz.questions.length - 1 ? translations.salamiQuiz.player.nextButton : translations.salamiQuiz.player.finishButton}
        </Button>
      </CardContent>
    </Card>
  );
}
