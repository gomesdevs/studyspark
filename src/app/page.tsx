
'use client';

import type React from 'react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import QuizSelection from '@/components/QuizSelection';
import QuizDisplay from '@/components/QuizDisplay';
import QuizResults from '@/components/QuizResults';
import { allQuestions, subjects as initialSubjects, levels as initialLevels, type Question } from '@/lib/quizData';
import { generateStudySuggestions } from '@/ai/flows/generate-study-suggestions';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { BookHeart } from 'lucide-react';

type QuizState = 'selection' | 'inProgress' | 'results';

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [quizState, setQuizState] = useState<QuizState>('selection');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [studySuggestions, setStudySuggestions] = useState<string | null>(null);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState<boolean>(false);
  const { toast } = useToast();

   // Filter questions based on selection
   const filteredQuestions = useMemo(() => {
    if (!selectedSubject || !selectedLevel) return [];
    return allQuestions.filter(
      (q) => q.subject === selectedSubject && q.level === selectedLevel
    );
  }, [selectedSubject, selectedLevel]);

  const isQuizComplete = quizState === 'results';


  const handleStartQuiz = () => {
    if (!selectedSubject || !selectedLevel) {
      toast({
          title: "Selection Required",
          description: "Please select both a subject and a level to start the quiz.",
          variant: "destructive",
        });
      return;
    }
     if (filteredQuestions.length === 0) {
      toast({
        title: "No Questions Found",
        description: `No questions available for ${selectedSubject} at the ${selectedLevel} level. Please try different options.`,
        variant: "destructive",
      });
      return;
    }
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers(new Array(filteredQuestions.length).fill(null));
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(null);
    setStudySuggestions(null); // Clear previous suggestions
    setQuizState('inProgress');
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;

    setIsCorrect(correct);
    setShowFeedback(true);

    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(updatedAnswers);

    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsCorrect(null);

    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizState('results'); // Move to results state
    }
  };

  const handleRestartQuiz = () => {
    setQuizState('selection');
    setSelectedSubject('');
    setSelectedLevel('');
  };

   const getWeakTopics = useCallback(() => {
    const incorrectTopics = new Set<string>();
    filteredQuestions.forEach((question, index) => {
      if (userAnswers[index] !== null && userAnswers[index] !== question.correctAnswer) {
        incorrectTopics.add(question.topic);
      }
    });
    return Array.from(incorrectTopics);
  }, [filteredQuestions, userAnswers]);


 const generateSuggestions = useCallback(async () => {
    setIsLoadingSuggestions(true);
    setStudySuggestions(null); // Clear previous suggestions
    const weakTopics = getWeakTopics();
    const performanceSummary = `Scored ${score} out of ${filteredQuestions.length}. Struggled with topics: ${weakTopics.join(', ')}.`;

    try {
      const result = await generateStudySuggestions({
        quizPerformance: performanceSummary,
        subject: selectedSubject,
        level: selectedLevel,
      });
      setStudySuggestions(result.suggestions);
    } catch (error) {
      console.error("Error generating study suggestions:", error);
       toast({
         title: "AI Error",
         description: "Could not generate study suggestions at this time. Please try again.",
         variant: "destructive",
       });
      setStudySuggestions("Could not generate suggestions due to an error."); // Provide feedback
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, [score, filteredQuestions.length, getWeakTopics, selectedSubject, selectedLevel, toast]);


  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 md:p-12 lg:p-24 bg-background text-foreground">
       <header className="w-full max-w-4xl mb-8 text-center space-y-2">
          <div className="flex justify-center items-center gap-3">
           <BookHeart className="h-10 w-10 text-primary" />
           <h1 className="text-4xl font-bold tracking-tight text-primary">StudySpark</h1>
          </div>
         <p className="text-lg text-muted-foreground">Your Personalized Study Review Tool</p>
       </header>

       <div className="w-full max-w-2xl">
        {quizState === 'selection' && (
          <Card className="shadow-md">
             <CardHeader>
                <CardTitle className="text-center text-xl font-semibold text-primary">Start Your Quiz!</CardTitle>
             </CardHeader>
             <CardContent>
               <QuizSelection
                selectedSubject={selectedSubject}
                setSelectedSubject={setSelectedSubject}
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
               />
               <div className="flex justify-center mt-4">
                 <Button onClick={handleStartQuiz} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                   Start Quiz
                 </Button>
               </div>
             </CardContent>
          </Card>
        )}

        {quizState === 'inProgress' && (
          <QuizDisplay
            questions={filteredQuestions}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            handleSubmitAnswer={handleSubmitAnswer}
            handleNextQuestion={handleNextQuestion}
            isQuizComplete={isQuizComplete}
          />
        )}

        {quizState === 'results' && (
          <QuizResults
            score={score}
            totalQuestions={filteredQuestions.length}
            weakTopics={getWeakTopics()}
            suggestions={studySuggestions}
            isLoadingSuggestions={isLoadingSuggestions}
            handleRestartQuiz={handleRestartQuiz}
            generateSuggestions={generateSuggestions}
            subject={selectedSubject}
            level={selectedLevel}
          />
        )}
      </div>
       <Toaster />
       <footer className="mt-12 text-center text-sm text-muted-foreground">
            Built with Next.js, ShadCN UI, and Genkit AI.
       </footer>
    </main>
  );
}
