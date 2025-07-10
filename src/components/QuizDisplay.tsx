
'use client';

import type React from 'react';
import type { Question } from '@/lib/quizData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';

interface QuizDisplayProps {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  setSelectedAnswer: (answer: string | null) => void;
  showFeedback: boolean;
  isCorrect: boolean | null;
  handleSubmitAnswer: () => void;
  handleNextQuestion: () => void;
  isQuizComplete: boolean;
}

const QuizDisplay: React.FC<QuizDisplayProps> = ({
  questions,
  currentQuestionIndex,
  selectedAnswer,
  setSelectedAnswer,
  showFeedback,
  isCorrect,
  handleSubmitAnswer,
  handleNextQuestion,
  isQuizComplete,
}) => {
  if (isQuizComplete || questions.length === 0 || currentQuestionIndex >= questions.length) {
    return null; // Or show a completion message
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="bg-secondary rounded-t-lg p-4">
        <CardTitle className="text-lg font-semibold text-secondary-foreground flex items-center gap-2">
           <BookOpen className="h-5 w-5"/>
           Question {currentQuestionIndex + 1} of {questions.length}
         </CardTitle>
        <p className="text-sm text-muted-foreground">{currentQuestion.subject} - {currentQuestion.level}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <p className="text-base font-medium text-foreground">{currentQuestion.question}</p>

        <RadioGroup
          value={selectedAnswer ?? ''}
          onValueChange={setSelectedAnswer}
          disabled={showFeedback}
          className="space-y-3"
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="text-sm font-normal cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {showFeedback && isCorrect !== null && (
          <Alert variant={isCorrect ? 'default' : 'destructive'} className={`mt-4 ${isCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}>
             {isCorrect ? <CheckCircle className="h-4 w-4 text-green-700" /> : <XCircle className="h-4 w-4 text-red-700" />}
            <AlertTitle className={isCorrect ? 'text-green-800' : 'text-red-800'}>
              {isCorrect ? "Correct!" : "Incorrect"}
            </AlertTitle>
            <AlertDescription className={isCorrect ? 'text-green-700' : 'text-red-700'}>
              {!isCorrect && (
                 <>
                    <strong>Correct Answer:</strong> {currentQuestion.correctAnswer} <br />
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                 </>
              )}
               {isCorrect && currentQuestion.explanation && (
                   <>
                      <strong>Explanation:</strong> {currentQuestion.explanation}
                   </>
               )}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex justify-end mt-6">
          {!showFeedback ? (
            <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizDisplay;
