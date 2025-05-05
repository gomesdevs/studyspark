
'use client';

import React from 'react'; // Import React
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Award, BrainCircuit, RefreshCcw, Target } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  weakTopics: string[];
  suggestions: string | null;
  isLoadingSuggestions: boolean;
  handleRestartQuiz: () => void;
  generateSuggestions: () => void;
  subject: string;
  level: string;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  weakTopics,
  suggestions,
  isLoadingSuggestions,
  handleRestartQuiz,
  generateSuggestions,
  subject,
  level
}) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  React.useEffect(() => {
    // Generate suggestions automatically when results are shown
    if (totalQuestions > 0 && !suggestions && !isLoadingSuggestions) {
      generateSuggestions();
    }
  }, [totalQuestions, suggestions, isLoadingSuggestions, generateSuggestions]);


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="bg-secondary rounded-t-lg p-4">
        <CardTitle className="text-lg font-semibold text-secondary-foreground flex items-center gap-2">
            <Award className="h-5 w-5"/> Quiz Complete!
        </CardTitle>
         <p className="text-sm text-muted-foreground">{subject} - {level}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xl font-medium text-foreground">Your Score:</p>
          <p className="text-4xl font-bold text-primary">{score} / {totalQuestions}</p>
          <Progress value={percentage} className="w-full h-3 mt-2" />
          <p className="text-sm text-muted-foreground">{percentage}% Correct</p>
        </div>

         {weakTopics.length > 0 && (
          <Alert variant="default" className="bg-orange-100 border-orange-400">
             <Target className="h-4 w-4 text-orange-700" />
            <AlertTitle className="text-orange-800">Areas for Improvement</AlertTitle>
            <AlertDescription className="text-orange-700">
              Focus on these topics: {weakTopics.join(', ')}
            </AlertDescription>
          </Alert>
        )}

        <Card className="bg-card border border-border">
           <CardHeader className="pb-2">
             <CardTitle className="text-md font-semibold flex items-center gap-2 text-primary">
               <BrainCircuit className="h-5 w-5"/> AI Study Suggestions
             </CardTitle>
           </CardHeader>
           <CardContent>
            {isLoadingSuggestions ? (
               <div className="space-y-2">
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-5/6" />
                 <Skeleton className="h-4 w-4/6" />
               </div>
            ) : suggestions ? (
              <p className="text-sm text-foreground">{suggestions}</p>
            ) : (
               <p className="text-sm text-muted-foreground">Click "Generate Suggestions" to get personalized study tips.</p>
            )}
            <div className="flex justify-end mt-4">
                 <Button
                    onClick={generateSuggestions}
                    disabled={isLoadingSuggestions}
                    variant="outline"
                    size="sm"
                 >
                     {isLoadingSuggestions ? 'Generating...' : 'Regenerate Suggestions'}
                 </Button>
            </div>
           </CardContent>
         </Card>


        <div className="flex justify-center">
          <Button onClick={handleRestartQuiz} variant="secondary" className="flex items-center gap-2">
             <RefreshCcw className="h-4 w-4"/> Retake Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResults;
