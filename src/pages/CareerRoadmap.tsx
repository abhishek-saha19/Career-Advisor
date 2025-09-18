import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Save, MessageCircle, GraduationCap, BookOpen, Building, Trophy, Briefcase } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface PathNode {
  id: string;
  title: string;
  description: string;
  type: 'class' | 'stream' | 'course' | 'specialization' | 'college' | 'exam' | 'job';
  children: PathNode[];
  icon: any;
  color: string;
}

const careerData: PathNode = {
  id: 'class-x',
  title: 'Class X',
  description: 'Complete your secondary education',
  type: 'class',
  icon: GraduationCap,
  color: 'primary',
  children: [
    {
      id: 'science',
      title: 'Science Stream',
      description: 'Physics, Chemistry, Mathematics/Biology',
      type: 'stream',
      icon: BookOpen,
      color: 'primary',
      children: [
        {
          id: 'class-xii-pcm',
          title: 'Class XII (PCM)',
          description: 'Physics, Chemistry, Mathematics',
          type: 'class',
          icon: GraduationCap,
          color: 'primary',
          children: [
            {
              id: 'btech',
              title: 'B.Tech',
              description: 'Bachelor of Technology',
              type: 'course',
              icon: BookOpen,
              color: 'success',
              children: [
                {
                  id: 'cse',
                  title: 'Computer Science Engineering',
                  description: 'Software development, AI, Data Science',
                  type: 'specialization',
                  icon: BookOpen,
                  color: 'success',
                  children: [
                    {
                      id: 'nit-srinagar',
                      title: 'NIT Srinagar',
                      description: 'National Institute of Technology',
                      type: 'college',
                      icon: Building,
                      color: 'warning',
                      children: [
                        {
                          id: 'jee-main',
                          title: 'JEE Main',
                          description: 'Joint Entrance Examination',
                          type: 'exam',
                          icon: Trophy,
                          color: 'warning',
                          children: [
                            {
                              id: 'software-engineer',
                              title: 'Software Engineer',
                              description: 'Design and develop software applications',
                              type: 'job',
                              icon: Briefcase,
                              color: 'success',
                              children: []
                            },
                            {
                              id: 'data-scientist',
                              title: 'Data Scientist',
                              description: 'Analyze complex data to drive decisions',
                              type: 'job',
                              icon: Briefcase,
                              color: 'success',
                              children: []
                            }
                          ]
                        }
                      ]
                    },
                    {
                      id: 'iiit-srinagar',
                      title: 'IIIT Srinagar',
                      description: 'Indian Institute of Information Technology',
                      type: 'college',
                      icon: Building,
                      color: 'warning',
                      children: [
                        {
                          id: 'jee-main-2',
                          title: 'JEE Main',
                          description: 'Joint Entrance Examination',
                          type: 'exam',
                          icon: Trophy,
                          color: 'warning',
                          children: [
                            {
                              id: 'ai-engineer',
                              title: 'AI Engineer',
                              description: 'Develop artificial intelligence systems',
                              type: 'job',
                              icon: Briefcase,
                              color: 'success',
                              children: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 'ece',
                  title: 'Electronics & Communication',
                  description: 'Electronics, Communication systems',
                  type: 'specialization',
                  icon: BookOpen,
                  color: 'success',
                  children: [
                    {
                      id: 'nit-srinagar-ece',
                      title: 'NIT Srinagar',
                      description: 'Electronics & Communication Department',
                      type: 'college',
                      icon: Building,
                      color: 'warning',
                      children: [
                        {
                          id: 'gate-exam',
                          title: 'GATE',
                          description: 'Graduate Aptitude Test in Engineering',
                          type: 'exam',
                          icon: Trophy,
                          color: 'warning',
                          children: [
                            {
                              id: 'electronics-engineer',
                              title: 'Electronics Engineer',
                              description: 'Design electronic systems and devices',
                              type: 'job',
                              icon: Briefcase,
                              color: 'success',
                              children: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'commerce',
      title: 'Commerce Stream',
      description: 'Business Studies, Economics, Accountancy',
      type: 'stream',
      icon: BookOpen,
      color: 'primary',
      children: [
        {
          id: 'class-xii-commerce',
          title: 'Class XII (Commerce)',
          description: 'Business Studies, Economics, Accountancy',
          type: 'class',
          icon: GraduationCap,
          color: 'primary',
          children: [
            {
              id: 'bba',
              title: 'BBA',
              description: 'Bachelor of Business Administration',
              type: 'course',
              icon: BookOpen,
              color: 'success',
              children: [
                {
                  id: 'finance',
                  title: 'Finance',
                  description: 'Financial management and analysis',
                  type: 'specialization',
                  icon: BookOpen,
                  color: 'success',
                  children: [
                    {
                      id: 'kashmir-university',
                      title: 'University of Kashmir',
                      description: 'Department of Business & Financial Studies',
                      type: 'college',
                      icon: Building,
                      color: 'warning',
                      children: [
                        {
                          id: 'cat-exam',
                          title: 'CAT',
                          description: 'Common Admission Test for MBA',
                          type: 'exam',
                          icon: Trophy,
                          color: 'warning',
                          children: [
                            {
                              id: 'financial-analyst',
                              title: 'Financial Analyst',
                              description: 'Analyze financial data and market trends',
                              type: 'job',
                              icon: Briefcase,
                              color: 'success',
                              children: []
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const CareerRoadmap = () => {
  const [currentPath, setCurrentPath] = useState<PathNode[]>([careerData]);
  const [selectedPath, setSelectedPath] = useState<PathNode[]>([]);
  const [savedPaths, setSavedPaths] = useState<PathNode[][]>(() => {
    const saved = localStorage.getItem('savedCareerPaths');
    return saved ? JSON.parse(saved) : [];
  });
  const { toast } = useToast();

  const selectNode = (node: PathNode) => {
    const newSelectedPath = [...selectedPath, node];
    setSelectedPath(newSelectedPath);
    
    if (node.children.length > 0) {
      setCurrentPath(node.children);
    }
  };

  const goBack = () => {
    if (selectedPath.length > 0) {
      const newSelectedPath = selectedPath.slice(0, -1);
      setSelectedPath(newSelectedPath);
      
      if (newSelectedPath.length === 0) {
        setCurrentPath([careerData]);
      } else {
        const lastNode = newSelectedPath[newSelectedPath.length - 1];
        setCurrentPath(lastNode.children);
      }
    }
  };

  const savePath = () => {
    if (selectedPath.length === 0) {
      toast({
        title: "No path selected",
        description: "Please select a career path to save.",
        variant: "destructive",
      });
      return;
    }

    const newSavedPaths = [...savedPaths, [...selectedPath]];
    setSavedPaths(newSavedPaths);
    localStorage.setItem('savedCareerPaths', JSON.stringify(newSavedPaths));
    
    toast({
      title: "Path Saved!",
      description: "Your career path has been saved to your dashboard.",
    });
  };

  const getNodeIcon = (node: PathNode) => {
    const Icon = node.icon;
    return <Icon className="h-5 w-5" />;
  };

  const getNodeColor = (node: PathNode) => {
    const colorMap = {
      primary: 'bg-gradient-hero text-primary-foreground',
      success: 'bg-gradient-success text-success-foreground',
      warning: 'bg-warning text-warning-foreground'
    };
    return colorMap[node.color as keyof typeof colorMap] || 'bg-gradient-hero text-primary-foreground';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-success/5 p-4">
      <div className="container mx-auto max-w-6xl">
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  Career Roadmap Explorer
                </CardTitle>
                <CardDescription>
                  Navigate through your educational and career journey step by step
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={savePath} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Path
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Breadcrumb */}
            {selectedPath.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 p-3 bg-accent/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Current Path:</span>
                {selectedPath.map((node, index) => (
                  <div key={node.id} className="flex items-center gap-2">
                    <Badge variant="secondary" className="gap-1">
                      {getNodeIcon(node)}
                      {node.title}
                    </Badge>
                    {index < selectedPath.length - 1 && (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                ))}
                {selectedPath.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={goBack}>
                    ← Back
                  </Button>
                )}
              </div>
            )}

            {/* Current Options */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {currentPath.map((node) => (
                <Card 
                  key={node.id} 
                  className="group cursor-pointer border-2 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => selectNode(node)}
                >
                  <CardHeader className="pb-2">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getNodeColor(node)} mb-2 group-hover:scale-110 transition-transform`}>
                      {getNodeIcon(node)}
                    </div>
                    <CardTitle className="text-lg">{node.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-3">
                      {node.description}
                    </CardDescription>
                    {node.children.length > 0 && (
                      <div className="flex items-center text-sm text-primary">
                        <span>Explore options</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Chat Helper */}
            <Card className="bg-gradient-card border-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero">
                    <MessageCircle className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      Need help deciding? Ask me about any career path, college requirements, or job prospects!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Saved Paths Preview */}
            {savedPaths.length > 0 && (
              <Card className="border-2 border-success/20">
                <CardHeader>
                  <CardTitle className="text-lg text-success">Saved Career Paths ({savedPaths.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {savedPaths.slice(-2).map((path, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-success/5 rounded">
                        <div className="flex items-center gap-1 text-sm">
                          {path.slice(-3).map((node, nodeIndex) => (
                            <div key={node.id} className="flex items-center gap-1">
                              <span>{node.title}</span>
                              {nodeIndex < path.slice(-3).length - 1 && (
                                <ChevronRight className="h-3 w-3" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground">
                      View all saved paths in your dashboard
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerRoadmap;