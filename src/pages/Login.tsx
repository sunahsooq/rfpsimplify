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
    { task: "Parse 100-page RFP", manual: "6 hours", fast: "30 sec" },
    { task: "Find teaming partner", manual: "2 weeks", fast: "90 sec" },
    { task: "Build compliance matrix", manual: "6 hours", fast: "30 sec" },
  ];

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Marketing Panel */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-[#1e40af] to-[#3b82f6] p-[60px] flex-col relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-24 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#fbbf24] flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span className="text-[28px] font-bold text-white">rfpSimplify</span>
          </div>

          {/* Tagline */}
          <p className="text-white/60 text-sm">
            From RFP to Teaming in 10 Seconds
          </p>

          {/* Main Headline */}
          <h1 className="text-[44px] font-bold text-white leading-tight mt-10">
            Win More Federal Contracts
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg max-w-[500px] mt-4">
            AI-powered capture management for small GovCon businesses. Find opportunities, discover partners, and make smarter bid decisions.
          </p>

          {/* Comparison Box */}
          <div className="bg-black/20 rounded-2xl p-6 max-w-[520px] mt-10">
            <h3 className="text-white font-bold text-xl mb-1">
              2 Weeks → 4 Minutes
            </h3>
            <p className="text-white/60 text-sm mb-5">
              What used to take days now takes seconds
            </p>

            {/* Table Header */}
            <div className="grid grid-cols-[1fr_100px_120px] gap-2 text-sm text-white/50 mb-3 pb-2 border-b border-white/10">
              <span>Task</span>
              <span className="text-right">Manual</span>
              <span className="text-right">With rfpSimplify</span>
            </div>

            {/* Table Rows */}
            <div className="space-y-3">
              {comparisonData.map((item, index) => (
                <div key={index} className="grid grid-cols-[1fr_100px_120px] gap-2 text-sm">
                  <span className="text-white">{item.task}</span>
                  <span className="text-white/70 text-right">{item.manual}</span>
                  <span className="text-[#22c55e] text-right font-medium">{item.fast}</span>
                </div>
              ))}
            </div>
          </div>
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
