import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, X, Brain, BarChart3 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
  "History", "Geography", "Economics", "Literature", "Psychology",
  "Art", "Music", "Physical Education", "Environmental Science"
];

const sampleQuestions = {
  "Mathematics": [
    { q: "What is the derivative of x²?", options: ["x", "2x", "x²", "2"], correct: 1 },
    { q: "What is 15% of 200?", options: ["25", "30", "35", "40"], correct: 1 },
    { q: "What is the area of a circle with radius 5?", options: ["25π", "10π", "5π", "15π"], correct: 0 },
    { q: "Solve: 2x + 5 = 15", options: ["x=5", "x=10", "x=7.5", "x=2.5"], correct: 0 },
    { q: "What is the value of sin(90°)?", options: ["0", "1", "0.5", "-1"], correct: 1 },
  ],
  "Physics": [
    { q: "What is Newton's first law?", options: ["F=ma", "Inertia", "Action-Reaction", "Gravity"], correct: 1 },
    { q: "Speed of light in vacuum?", options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10⁹ m/s", "3×10⁷ m/s"], correct: 0 },
    { q: "Unit of electric current?", options: ["Volt", "Ampere", "Ohm", "Watt"], correct: 1 },
    { q: "What is kinetic energy formula?", options: ["mgh", "½mv²", "mv", "m/v"], correct: 1 },
    { q: "What causes rainbow?", options: ["Reflection", "Refraction", "Dispersion", "Diffraction"], correct: 2 },
  ],
  "Chemistry": [
    { q: "What is H₂O?", options: ["Hydrogen", "Oxygen", "Water", "Acid"], correct: 2 },
    { q: "Atomic number of Carbon?", options: ["6", "12", "8", "14"], correct: 0 },
    { q: "What is pH of pure water?", options: ["6", "7", "8", "9"], correct: 1 },
    { q: "Noble gas configuration?", options: ["Stable", "Reactive", "Incomplete", "Heavy"], correct: 0 },
    { q: "What is NaCl?", options: ["Sugar", "Salt", "Acid", "Base"], correct: 1 },
  ],
  "Biology": [
    { q: "Powerhouse of cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Vacuole"], correct: 1 },
    { q: "Process of photosynthesis occurs in?", options: ["Roots", "Stem", "Leaves", "Flowers"], correct: 2 },
    { q: "Human blood type is determined by?", options: ["Proteins", "Antigens", "Plasma", "Platelets"], correct: 1 },
    { q: "DNA stands for?", options: ["Deoxyribonucleic Acid", "Dinitric Acid", "Deoxyribonic Acid", "Dynamic Acid"], correct: 0 },
    { q: "How many chambers in human heart?", options: ["2", "3", "4", "5"], correct: 2 },
  ],
  "Computer Science": [
    { q: "What is CPU?", options: ["Memory", "Processor", "Storage", "Network"], correct: 1 },
    { q: "Binary of 10?", options: ["1010", "1100", "1001", "1111"], correct: 0 },
    { q: "What is HTML?", options: ["Programming Language", "Markup Language", "Database", "Operating System"], correct: 1 },
    { q: "What is algorithm?", options: ["Code", "Step-by-step instructions", "Program", "Software"], correct: 1 },
    { q: "What is RAM?", options: ["Storage", "Memory", "Processor", "Network"], correct: 1 },
  ]
};

const Assessment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();

  const filteredSubjects = subjects.filter(subject =>
    subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addSubject = (subject: string) => {
    if (!selectedSubjects.includes(subject) && selectedSubjects.length < 5) {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const removeSubject = (subject: string) => {
    setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
  };

  const generateRandomTest = () => {
    const randomSubjects = subjects.sort(() => 0.5 - Math.random()).slice(0, 3);
    setSelectedSubjects(randomSubjects);
    startTest(randomSubjects);
  };

  const startTest = (subjectsToTest = selectedSubjects) => {
    if (subjectsToTest.length === 0) {
      toast({
        title: "No subjects selected",
        description: "Please select at least one subject or generate a random test.",
        variant: "destructive",
      });
      return;
    }

    const testQuestions: any[] = [];
    subjectsToTest.forEach(subject => {
      if (sampleQuestions[subject as keyof typeof sampleQuestions]) {
        const subjectQuestions = sampleQuestions[subject as keyof typeof sampleQuestions];
        testQuestions.push(...subjectQuestions.map(q => ({ ...q, subject })));
      }
    });

    setQuestions(testQuestions);
    setAnswers(new Array(testQuestions.length).fill(-1));
    setCurrentQuestion(0);
    setIsTestStarted(true);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    const subjectScores: { [key: string]: { correct: number; total: number } } = {};
    
    questions.forEach((question, index) => {
      const subject = question.subject;
      if (!subjectScores[subject]) {
        subjectScores[subject] = { correct: 0, total: 0 };
      }
      subjectScores[subject].total++;
      if (answers[index] === question.correct) {
        subjectScores[subject].correct++;
      }
    });

    const resultsData = Object.entries(subjectScores).map(([subject, scores]) => ({
      subject,
      percentage: Math.round((scores.correct / scores.total) * 100),
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }));

    setResults(resultsData);
    setShowResults(true);

    // Save to localStorage
    localStorage.setItem('assessmentResults', JSON.stringify(resultsData));
    
    toast({
      title: "Assessment Complete!",
      description: "Your results have been calculated and saved.",
    });
  };

  if (showResults) {
    const strongestSubject = results.reduce((max, current) => 
      current.percentage > max.percentage ? current : max, results[0]);

    const careerSuggestions = {
      "Mathematics": "Engineering, Data Science, Actuarial Science, Finance",
      "Physics": "Engineering, Research, Astronomy, Nuclear Science",
      "Chemistry": "Chemical Engineering, Pharmacy, Medicine, Research",
      "Biology": "Medicine, Biotechnology, Environmental Science, Research",
      "Computer Science": "Software Development, AI/ML, Cybersecurity, Game Development",
      "default": "Business Administration, Management, Liberal Arts"
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-success/5 p-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-elegant">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <BarChart3 className="h-6 w-6 text-success" />
                Assessment Results
              </CardTitle>
              <CardDescription>Your performance analysis across subjects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={results}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ subject, percentage }) => `${subject}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {results.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">Your Strongest Area</h3>
                <Card className="border-2 border-success bg-gradient-success/10">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-success">{strongestSubject.subject}</h4>
                      <p className="text-3xl font-bold text-success mt-2">{strongestSubject.percentage}%</p>
                      <p className="text-muted-foreground mt-2">
                        Recommended career fields: {careerSuggestions[strongestSubject.subject as keyof typeof careerSuggestions] || careerSuggestions.default}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center gap-4">
                <Link to="/roadmap">
                  <Button variant="hero">
                    Explore Career Paths
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isTestStarted) {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const question = questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/5 p-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="shadow-elegant">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Assessment Test</CardTitle>
                <Badge variant="outline">{currentQuestion + 1} / {questions.length}</Badge>
              </div>
              <Progress value={progress} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Subject: {question.subject}</p>
                <h3 className="text-lg font-medium">{question.q}</h3>
              </div>

              <div className="space-y-3">
                {question.options.map((option: string, index: number) => (
                  <Button
                    key={index}
                    variant={answers[currentQuestion] === index ? "default" : "outline"}
                    className="w-full justify-start h-auto p-4 text-left"
                    onClick={() => selectAnswer(index)}
                  >
                    <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-muted text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </Button>
                ))}
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={answers[currentQuestion] === -1}
                  variant="hero"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/5 p-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Brain className="h-6 w-6 text-primary" />
              Career Assessment Test
            </CardTitle>
            <CardDescription>
              Choose subjects for your personalized assessment or generate a random test
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Subject Search */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search subjects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {filteredSubjects.map((subject) => (
                  <Button
                    key={subject}
                    variant="outline"
                    size="sm"
                    onClick={() => addSubject(subject)}
                    disabled={selectedSubjects.includes(subject) || selectedSubjects.length >= 5}
                    className="hover:bg-accent transition-colors"
                  >
                    {subject}
                  </Button>
                ))}
              </div>
            </div>

            {/* Selected Subjects */}
            <div className="space-y-2">
              <h3 className="font-medium">Selected Subjects ({selectedSubjects.length}/5):</h3>
              <div className="flex flex-wrap gap-2">
                {selectedSubjects.map((subject) => (
                  <Badge key={subject} variant="default" className="gap-1">
                    {subject}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => removeSubject(subject)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Button
                  onClick={() => startTest()}
                  disabled={selectedSubjects.length === 0}
                  size="lg"
                  variant="hero"
                >
                  Start Custom Test ({selectedSubjects.length * 5} questions)
                </Button>
                <Button
                  onClick={generateRandomTest}
                  variant="outline"
                  size="lg"
                  className="border-2 hover:bg-accent"
                >
                  Generate Random Test (15 questions)
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Each selected subject will have 5 questions in the test
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;