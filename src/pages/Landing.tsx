import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Target, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/5">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Logo/Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-hero shadow-primary">
            <GraduationCap className="h-10 w-10 text-primary-foreground" />
          </div>
          
          {/* Hero Title */}
          <h1 className="bg-gradient-to-r from-primary via-primary-light to-success bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
            Your One-Stop Personalized<br />
            Career & Education Advisor
          </h1>
          
          {/* Hero Subtitle */}
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Discover your strengths, explore career paths, and plan your future with AI-powered assessments 
            and personalized recommendations tailored just for you.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/assessment">
              <Button size="lg" variant="hero">
                <Target className="mr-2 h-5 w-5" />
                Take Assessment Test
              </Button>
            </Link>
            <Link to="/roadmap">
              <Button variant="outline" size="lg" className="border-2 hover:bg-accent transition-colors">
                <TrendingUp className="mr-2 h-5 w-5" />
                Explore Career Paths
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            How We Help Shape Your Future
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="group border-2 shadow-elegant hover:shadow-primary transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-hero shadow-primary group-hover:scale-110 transition-transform">
                  <Target className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-primary">Smart Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Take personalized quizzes to discover your strengths and interests across multiple subjects and domains.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group border-2 shadow-elegant hover:shadow-success transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-success shadow-success group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-success-foreground" />
                </div>
                <CardTitle className="text-success">Career Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Explore interactive career paths from Class X to your dream job with step-by-step guidance and college recommendations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group border-2 shadow-elegant hover:shadow-primary transition-all duration-300 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-hero shadow-primary group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-primary">Personalized Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Track your progress, access local college recommendations, and stay updated with scholarships and opportunities.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="bg-gradient-card py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-8 text-3xl font-bold text-foreground">
              Ready to Start Your Journey?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of students who have found their perfect career path with our guidance.
            </p>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;