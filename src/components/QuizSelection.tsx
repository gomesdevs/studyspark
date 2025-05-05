
import type React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { subjects, levels } from '@/lib/quizData';

interface QuizSelectionProps {
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}

const QuizSelection: React.FC<QuizSelectionProps> = ({
  selectedSubject,
  setSelectedSubject,
  selectedLevel,
  setSelectedLevel,
}) => {
  return (
    <div className="space-y-4 mb-6 p-4 bg-card rounded-lg shadow">
       <h2 className="text-xl font-semibold text-primary">Select Quiz Options</h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="subject-select" className="mb-2 block text-sm font-medium text-foreground">Subject</Label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger id="subject-select" className="w-full">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="level-select" className="mb-2 block text-sm font-medium text-foreground">Level</Label>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger id="level-select" className="w-full">
              <SelectValue placeholder="Select a level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default QuizSelection;
