import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Key, Mail, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/Logo";

export default function PasswordReset() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 flex justify-center">
          <Logo size="lg" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-[28px] shadow-2xl p-8">
          {!isSuccess ? (
            <>
              {/* Key Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1e40af] to-[#3b82f6] rounded-full flex items-center justify-center shadow-lg">
                  <Key className="h-10 w-10 text-white" />
                </div>
              </div>

              {/* Heading */}
              <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
                Reset your password
              </h1>
              <p className="text-center text-gray-500 mb-8">
                Enter your email and we'll send you a link to reset your password.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Work Email
                  </label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-[#1e40af] to-[#3b82f6] hover:from-[#1e3a8a] hover:to-[#2563eb] text-white rounded-xl font-semibold shadow-lg"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Mail className="h-5 w-5 mr-2" />
                      Send Reset Link
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#16a34a] to-[#22c55e] rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
                Check your email
              </h1>
              <p className="text-center text-gray-500 mb-2">
                We've sent a password reset link to:
              </p>
              <p className="text-center font-semibold text-gray-900 mb-8">
                {email}
              </p>

              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-700 text-center">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="font-semibold underline hover:text-blue-800"
                  >
                    try again
                  </button>
                </p>
              </div>
            </>
          )}

          {/* Back to Sign In */}
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 mt-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-white/70 text-sm mt-8">
          Need help?{" "}
          <a href="#" className="text-white hover:underline font-medium">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
}
