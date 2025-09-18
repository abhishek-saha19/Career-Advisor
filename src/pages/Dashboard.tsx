import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  GraduationCap, 
  Trophy, 
  MapPin, 
  Calendar,
  BookOpen,
  Target,
  Award,
  Briefcase,
  ChevronRight,
  Building
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [assessmentResults, setAssessmentResults] = useState<any[]>([]);
  const [savedPaths, setSavedPaths] = useState<any[]>([]);
  const [streakDays, setStreakDays] = useState(7);
  const [badges, setBadges] = useState<string[]>(['Assessment Completed', 'Path Explorer']);

  useEffect(() => {
    // Load data from localStorage
    const results = localStorage.getItem('assessmentResults');
    if (results) {
      setAssessmentResults(JSON.parse(results));
    }

    const paths = localStorage.getItem('savedCareerPaths');
    if (paths) {
      setSavedPaths(JSON.parse(paths));
    }
  }, []);

  // Dummy data for local colleges
  const localColleges = [
    {
      name: "National Institute of Technology, Srinagar",
      type: "Government",
      courses: ["B.Tech", "M.Tech", "PhD"],
      rating: 4.5,
      location: "Hazratbal, Srinagar"
    },
    {
      name: "University of Kashmir",
      type: "Government",
      courses: ["B.A", "B.Sc", "B.Com", "MBA", "PhD"],
      rating: 4.2,
      location: "Hazratbal, Srinagar"
    },
    {
      name: "IIIT Srinagar",
      type: "Government",
      courses: ["B.Tech CSE", "M.Tech", "PhD"],
      rating: 4.7,
      location: "Chrar-i-Sharief, Budgam"
    },
    {
      name: "Government Medical College, Srinagar",
      type: "Government",
      courses: ["MBBS", "MD", "MS"],
      rating: 4.3,
      location: "Karan Nagar, Srinagar"
    }
  ];

  // Dummy scholarship data
  const scholarships = [
    {
      name: "Merit-cum-Means Scholarship",
      eligibility: "Class XII passed with 60% marks",
      amount: "₹12,000/year",
      deadline: "2024-12-31",
      type: "Government"
    },
    {
      name: "J&K State Scholarship",
      eligibility: "Domicile of J&K",
      amount: "₹20,000/year",
      deadline: "2024-11-15",
      type: "State"
    },
    {
      name: "Prime Minister's Scholarship",
      eligibility: "Children of Armed Forces personnel",
      amount: "₹25,000/year",
      deadline: "2024-10-30",
      type: "Central"
    }
  ];

  // Dummy trending jobs
  const trendingJobs = [
    { title: "Software Developer", growth: "+25%", avgSalary: "₹8-15 LPA" },
    { title: "Data Scientist", growth: "+35%", avgSalary: "₹10-20 LPA" },
    { title: "Digital Marketing", growth: "+20%", avgSalary: "₹5-12 LPA" },
    { title: "Cybersecurity Analyst", growth: "+30%", avgSalary: "₹12-25 LPA" },
  ];

  const getProgressData = () => {
    return savedPaths.map(path => ({
      name: path[path.length - 1]?.title || "Unknown",
      progress: Math.floor(Math.random() * 80) + 20
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-success/5 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary-light to-success bg-clip-text text-transparent">
            Your Career Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Track your progress and explore opportunities</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Quick Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="shadow-elegant">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero shadow-primary">
                      <Trophy className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{streakDays}</p>
                      <p className="text-sm text-muted-foreground">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-success shadow-success">
                      <Award className="h-6 w-6 text-success-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{badges.length}</p>
                      <p className="text-sm text-muted-foreground">Badges Earned</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-elegant">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero shadow-primary">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{savedPaths.length}</p>
                      <p className="text-sm text-muted-foreground">Career Paths</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Assessment Results */}
            {assessmentResults.length > 0 && (
              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Your Assessment Results
                  </CardTitle>
                  <CardDescription>Subject-wise performance analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={assessmentResults}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="percentage"
                            label={({ subject, percentage }) => `${subject}: ${percentage}%`}
                          >
                            {assessmentResults.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2">
                      {assessmentResults.map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/50">
                          <span className="text-sm font-medium">{result.subject}</span>
                          <Badge variant={result.percentage >= 80 ? "default" : "secondary"}>
                            {result.percentage}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Saved Career Paths */}
            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      Your Career Paths
                    </CardTitle>
                    <CardDescription>Saved exploration paths and progress</CardDescription>
                  </div>
                  <Link to="/roadmap">
                    <Button variant="outline" size="sm">
                      Explore More
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {savedPaths.length > 0 ? (
                  <div className="space-y-4">
                    {savedPaths.slice(0, 3).map((path, index) => (
                      <Card key={index} className="border bg-gradient-card/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{path[path.length - 1]?.title || "Career Path"}</h4>
                            <Badge variant="outline">{path.length} steps</Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            {path.slice(-3).map((node: any, nodeIndex: number) => (
                              <div key={node.id} className="flex items-center gap-1">
                                <span>{node.title}</span>
                                {nodeIndex < path.slice(-3).length - 1 && (
                                  <ChevronRight className="h-3 w-3" />
                                )}
                              </div>
                            ))}
                          </div>
                          <Progress value={Math.floor(Math.random() * 60) + 20} className="h-2" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No career paths saved yet</p>
                    <Link to="/roadmap">
                      <Button variant="hero">
                        Start Exploring
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Badges */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-success" />
                  Your Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded bg-success/10">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-success">
                        <Trophy className="h-4 w-4 text-success-foreground" />
                      </div>
                      <span className="text-sm font-medium text-success">{badge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Local Colleges */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  J&K Colleges
                </CardTitle>
                <CardDescription>Top colleges in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {localColleges.map((college, index) => (
                    <Card key={index} className="border bg-gradient-card/30">
                      <CardContent className="pt-3">
                        <h4 className="font-medium text-sm mb-1">{college.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {college.location}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {college.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            ★ {college.rating}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Scholarships */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-success" />
                  Scholarship Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scholarships.slice(0, 2).map((scholarship, index) => (
                    <Card key={index} className="border bg-success/5">
                      <CardContent className="pt-3">
                        <h4 className="font-medium text-sm mb-1">{scholarship.name}</h4>
                        <p className="text-xs text-success mb-2">{scholarship.amount}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Deadline: {scholarship.deadline}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Jobs */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-warning" />
                  Trending Jobs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingJobs.map((job, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/50">
                      <div>
                        <p className="text-sm font-medium">{job.title}</p>
                        <p className="text-xs text-muted-foreground">{job.avgSalary}</p>
                      </div>
                      <Badge variant="outline" className="text-success">
                        {job.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;