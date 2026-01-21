import { useState } from "react";
import { Eye, EyeOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  const comparisonData = [
    { task: "Parse 100-page RFP", before: "6 hours", after: "30 sec" },
    { task: "Find teaming partner", before: "2 weeks", after: "90 sec" },
    { task: "Build compliance matrix", before: "6 hours", after: "30 sec" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Marketing */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-[#1e40af] to-[#3b82f6] p-12 flex-col justify-between relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-24 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold text-white">rfpSimplify</span>
          </div>

          {/* Tagline */}
          <p className="text-white/80 text-lg mb-16">
            From RFP to Teaming in 10 Seconds
          </p>

          {/* Headline */}
          <h1 className="text-[42px] font-bold text-white leading-tight mb-6">
            Win More Federal Contracts
          </h1>

          {/* Subtext */}
          <p className="text-white/80 text-lg max-w-md mb-12">
            AI-powered capture management for small GovCon businesses. Find opportunities, discover partners, and make smarter bid decisions.
          </p>

          {/* Comparison Box */}
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 max-w-md border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-white/60 text-lg">2 Weeks</span>
              <span className="text-white text-lg">→</span>
              <span className="text-white font-semibold text-lg">4 Minutes</span>
            </div>

            <div className="space-y-3">
              {comparisonData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-white/90 flex-1">{item.task}</span>
                  <span className="text-white/50 w-20 text-right line-through">{item.before}</span>
                  <span className="text-emerald-400 w-20 text-right font-medium">{item.after}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer decoration */}
        <div className="relative z-10">
          <p className="text-white/40 text-sm">
            Trusted by 500+ GovCon professionals
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-[45%] bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold text-gradient">rfpSimplify</span>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground/80">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-card border-border focus:border-primary focus:ring-primary/20"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground/80">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-10 bg-card border-border focus:border-primary focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] hover:from-[#2563eb] hover:to-[#3b82f6] transition-all"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground">or</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-primary font-medium hover:text-primary/80 transition-colors"
            >
              Register with your UEI
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
