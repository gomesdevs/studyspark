# StudySpark 🎯

An intelligent quiz application that provides personalized study recommendations based on your performance. Built with Next.js and powered by AI to help students improve their learning efficiency.

## ✨ Features

- **📚 Multi-Subject Quizzes**: Choose from Mathematics, Portuguese, and Science
- **🎚️ Difficulty Levels**: High School and University Entrance level questions
- **🤖 AI-Powered Study Suggestions**: Get personalized recommendations based on your quiz performance
- **📊 Performance Tracking**: Track your progress and identify weak areas
- **💡 Detailed Explanations**: Learn from mistakes with comprehensive answer explanations


## 🏗️ Project Structure

```
src/
├── ai/                     # AI integration and flows
│   ├── ai-instance.ts     # AI configuration
│   ├── dev.ts            # Development utilities
│   └── flows/            # AI workflow definitions
├── app/                   # Next.js app directory
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main application page
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── QuizDisplay.tsx  # Quiz question display
│   ├── QuizResults.tsx  # Results and AI suggestions
│   └── QuizSelection.tsx # Subject/level selection
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and data
│   ├── quizData.ts     # Quiz questions database
│   └── utils.ts        # Helper utilities
```

## 🎯 How It Works

1. **Select Your Focus**: Choose a subject (Mathematics, Portuguese, Science) and difficulty level
2. **Take the Quiz**: Answer multiple-choice questions with immediate feedback
3. **Get AI Insights**: Receive personalized study suggestions based on your performance
4. **Learn & Improve**: Use detailed explanations and recommendations to enhance your knowledge

## 🤖 AI Integration

StudySpark uses Google's Gemini AI through the Genkit framework to:
- Analyze quiz performance patterns
- Identify knowledge gaps and weak areas
- Generate personalized study recommendations
- Provide targeted learning resources

## 🎨 Design System

- **Primary**: Light blue (#E0F7FA) for a calm, focused atmosphere
- **Secondary**: Light gray (#F5F5F5) for clean backgrounds
- **Accent**: Teal (#008080) for interactive elements
- **Typography**: Clean, readable fonts optimized for learning
- **Layout**: Responsive design that works on all devices

## 🧪 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI**: Google Gemini AI via Genkit framework
- **State Management**: React hooks and local state
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation

## 📈 Future Enhancements

- [ ] User authentication and progress tracking
- [ ] More subjects and question types
- [ ] Difficulty adaptation based on performance
- [ ] Study streaks and gamification
- [ ] Social features and leaderboards
- [ ] Offline mode support

## 🤝 Contributing

Contributions are welcome for non-commercial purposes! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**.

**You are free to:**
- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

**Under the following terms:**
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made
- **NonCommercial** — You may not use the material for commercial purposes

For more details, see the [CC BY-NC 4.0 License](https://creativecommons.org/licenses/by-nc/4.0/)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [Google Gemini](https://ai.google.com/)
- Icons by [Lucide](https://lucide.dev/)

---

