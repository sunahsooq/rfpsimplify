import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
    navigate("/dashboard");
  };

  const comparisonData = [
    { task: "Parse 100-page RFP", manual: "6 hours", fast: "30 sec" },
    { task: "Find teaming partner", manual: "2 weeks", fast: "90 sec" },
    { task: "Build compliance matrix", manual: "6 hours", fast: "30 sec" },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* COLUMN 1 - LEFT - MARKETING (55%) */}
      <div 
        style={{ 
          width: '55%', 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          padding: '60px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden'
        }}
        className="hidden lg:flex"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-24 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="flex items-center justify-center"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #3b82f6, #fbbf24)'
              }}
            >
              <Zap className="w-5 h-5 text-white" fill="white" />
            </div>
            <span style={{ fontSize: '28px', fontWeight: 700, color: 'white' }}>rfpSimplify</span>
          </div>

          {/* Tagline */}
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
            From RFP to Teaming in 10 Seconds
          </p>

          {/* Main Headline */}
          <h1 style={{ 
            fontSize: '44px', 
            fontWeight: 700, 
            color: 'white', 
            lineHeight: 1.2,
            marginTop: '40px'
          }}>
            Win More Federal Contracts
          </h1>

          {/* Description */}
          <p style={{ 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: '18px', 
            maxWidth: '500px',
            marginTop: '16px',
            lineHeight: 1.6
          }}>
            AI-powered capture management for small GovCon businesses. Find opportunities, discover partners, and make smarter bid decisions.
          </p>

          {/* Comparison Box */}
          <div style={{ 
            background: 'rgba(0,0,0,0.2)', 
            borderRadius: '16px', 
            padding: '24px',
            maxWidth: '520px',
            marginTop: '40px'
          }}>
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: '20px', marginBottom: '4px' }}>
              2 Weeks → 4 Minutes
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '20px' }}>
              What used to take days now takes seconds
            </p>

            {/* Table Header */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 100px 120px', 
              gap: '8px',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '12px',
              paddingBottom: '8px',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <span>Task</span>
              <span style={{ textAlign: 'right' }}>Manual</span>
              <span style={{ textAlign: 'right' }}>With rfpSimplify</span>
            </div>

            {/* Table Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {comparisonData.map((item, index) => (
                <div key={index} style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 100px 120px', 
                  gap: '8px',
                  fontSize: '14px'
                }}>
                  <span style={{ color: 'white' }}>{item.task}</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'right' }}>{item.manual}</span>
                  <span style={{ color: '#22c55e', textAlign: 'right', fontWeight: 500 }}>{item.fast}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* COLUMN 2 - RIGHT - LOGIN FORM (45%) */}
      <div 
        style={{ 
          width: '45%',
          minHeight: '100vh',
          backgroundColor: '#0c1222',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px'
        }}
        className="w-full lg:w-[45%]"
      >
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
              <span className="bg-[#0c1222] px-4 text-sm text-muted-foreground">or</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:text-primary/80 transition-colors"
            >
              Register with your UEI
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
