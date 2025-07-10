
export type Question = {
  id: number;
  subject: string;
  level: string;
  question: string;
  options: string[];
  correctAnswer: string;
  topic: string;
  explanation: string;
};

export const subjects: string[] = ["Mathematics", "Portuguese", "Science"];
export const levels: string[] = ["High School", "University Entrance"];

export const allQuestions: Question[] = [
  // Mathematics - High School
  {
    id: 1,
    subject: "Mathematics",
    level: "High School",
    question: "What is the value of x in the equation 2x + 3 = 7?",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
    topic: "Linear Equations",
    explanation: "Subtract 3 from both sides: 2x = 4. Then divide by 2: x = 2.",
  },
  {
    id: 2,
    subject: "Mathematics",
    level: "High School",
    question: "What is the area of a rectangle with length 5 and width 3?",
    options: ["8", "15", "16", "25"],
    correctAnswer: "15",
    topic: "Geometry",
    explanation: "Area of a rectangle = length × width. So, 5 × 3 = 15.",
  },
  {
    id: 3,
    subject: "Mathematics",
    level: "High School",
    question: "Simplify the expression: (x^2 * x^3) / x^4",
    options: ["x", "x^2", "1", "x^9"],
    correctAnswer: "x",
    topic: "Exponents",
    explanation: "Using exponent rules: x^(2+3-4) = x^1 = x.",
  },
  // Mathematics - University Entrance
  {
    id: 4,
    subject: "Mathematics",
    level: "University Entrance",
    question: "What are the roots of the quadratic equation x² - 5x + 6 = 0?",
    options: ["1, 6", "2, 3", "-1, -6", "-2, -3"],
    correctAnswer: "2, 3",
    topic: "Quadratic Equations",
    explanation: "Factor the equation: (x - 2)(x - 3) = 0. The roots are x = 2 and x = 3.",
  },
  {
    id: 5,
    subject: "Mathematics",
    level: "University Entrance",
    question: "Calculate the derivative of f(x) = 3x^2 + 2x + 1.",
    options: ["6x + 2", "3x + 2", "6x", "x^3 + x^2 + x"],
    correctAnswer: "6x + 2",
    topic: "Calculus",
    explanation: "Using the power rule for differentiation: d/dx(ax^n) = n*ax^(n-1). So, d/dx(3x^2) = 6x, d/dx(2x) = 2, d/dx(1) = 0. Summing them gives 6x + 2.",
  },
   {
    id: 6,
    subject: "Mathematics",
    level: "University Entrance",
    question: "What is the integral of 2x dx?",
    options: ["x^2 + C", "2 + C", "x + C", "2x^2 + C"],
    correctAnswer: "x^2 + C",
    topic: "Calculus",
    explanation: "Using the power rule for integration: ∫x^n dx = (x^(n+1))/(n+1) + C. So, ∫2x dx = 2 * (x^2)/2 + C = x^2 + C.",
  },
  // Portuguese - High School
  {
    id: 7,
    subject: "Portuguese",
    level: "High School",
    question: "Which word is spelled correctly?",
    options: ["Conciência", "Consciência", "Consiência", "Conçiência"],
    correctAnswer: "Consciência",
    topic: "Orthography",
    explanation: "The correct spelling uses 'sc' for the sound.",
  },
  {
    id: 8,
    subject: "Portuguese",
    level: "High School",
    question: "Identify the subject in the sentence: 'The cat sleeps on the mat.'",
    options: ["sleeps", "mat", "The cat", "on the mat"],
    correctAnswer: "The cat",
    topic: "Syntax",
    explanation: "The subject performs the action of the verb. 'The cat' is doing the sleeping.",
  },
  // Portuguese - University Entrance
  {
    id: 9,
    subject: "Portuguese",
    level: "University Entrance",
    question: "What figure of speech is present in 'The wind whispered through the trees'?",
    options: ["Metaphor", "Simile", "Personification", "Hyperbole"],
    correctAnswer: "Personification",
    topic: "Figures of Speech",
    explanation: "Personification gives human qualities (whispering) to inanimate objects (wind).",
  },
  {
    id: 10,
    subject: "Portuguese",
    level: "University Entrance",
    question: "Which literary movement is characterized by objectivity and focus on social reality?",
    options: ["Romanticism", "Realism", "Modernism", "Baroque"],
    correctAnswer: "Realism",
    topic: "Literature",
    explanation: "Realism, prominent in the late 19th century, aimed to depict life and society accurately, often focusing on its issues.",
  },
  // Science - High School
  {
    id: 11,
    subject: "Science",
    level: "High School",
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    correctAnswer: "H2O",
    topic: "Chemistry",
    explanation: "Water is composed of two hydrogen atoms and one oxygen atom.",
  },
  {
    id: 12,
    subject: "Science",
    level: "High School",
    question: "What process do plants use to make their own food?",
    options: ["Respiration", "Transpiration", "Photosynthesis", "Fermentation"],
    correctAnswer: "Photosynthesis",
    topic: "Biology",
    explanation: "Photosynthesis uses sunlight, water, and carbon dioxide to create glucose (food) and oxygen.",
  },
  // Science - University Entrance
   {
    id: 13,
    subject: "Science",
    level: "University Entrance",
    question: "What is Newton's second law of motion?",
    options: ["Inertia", "F=ma", "Action-Reaction", "Gravity"],
    correctAnswer: "F=ma",
    topic: "Physics",
    explanation: "Newton's second law states that the force acting on an object is equal to the mass of that object times its acceleration (F=ma).",
  },
   {
    id: 14,
    subject: "Science",
    level: "University Entrance",
    question: "What is the main function of mitochondria in a cell?",
    options: ["Photosynthesis", "Protein Synthesis", "Cellular Respiration", "Cell Division"],
    correctAnswer: "Cellular Respiration",
    topic: "Biology",
    explanation: "Mitochondria are known as the 'powerhouses' of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.",
  },
   {
    id: 15,
    subject: "Science",
    level: "University Entrance",
    question: "Balance the chemical equation: __H2 + __O2 -> __H2O",
    options: ["1, 1, 1", "2, 1, 2", "1, 2, 1", "2, 2, 2"],
    correctAnswer: "2, 1, 2",
    topic: "Chemistry",
    explanation: "To balance the equation, you need 2 molecules of H2 and 1 molecule of O2 to produce 2 molecules of H2O (2H2 + O2 -> 2H2O).",
  },
];
