import { FileText } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const Logo = ({ size = "md" }: LogoProps) => {
  const sizes = {
    sm: { icon: 24, text: "text-lg" },
    md: { icon: 32, text: "text-2xl" },
    lg: { icon: 40, text: "text-3xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div className="gradient-logo p-2 rounded-xl shadow-glow">
        <FileText size={icon} className="text-primary-foreground" />
      </div>
      <span className={`${text} font-bold text-gradient`}>rfpSimplify</span>
    </div>
  );
};

export default Logo;
