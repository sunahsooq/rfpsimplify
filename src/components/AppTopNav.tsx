import { useState } from "react";
import { Bell, Search, Zap, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function AppTopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();
  const [partnersOpen, setPartnersOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Opportunities", path: "/opportunities" },
    { label: "Pipeline", path: "/pipeline" },
    { label: "Marketplace", path: "/marketplace" },
    { label: "CRM", path: "/crm" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isPartnersActive = location.pathname.startsWith("/partners") || location.pathname.startsWith("/partner-requests");

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-nav">
      <div className="mx-auto flex h-[70px] w-full max-w-[1600px] items-center gap-4 px-8">
        {/* Left - Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-logo shadow-glow">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-[24px] font-bold text-foreground">rfpSimplify</span>
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 ml-8">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Partners Dropdown */}
          <DropdownMenu open={partnersOpen} onOpenChange={setPartnersOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  isPartnersActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                Partners
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44 border-border bg-popover text-popover-foreground shadow-card">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/partners/discover")}
              >
                Discovery
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/partner-search")}
              >
                🏛️ SBA Search
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/partner-requests")}
              >
                Requests
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/partners")}
              >
                My Partners
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Company Link */}
          <button
            onClick={() => navigate("/company")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive("/company")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            Company
          </button>
        </nav>

        {/* Center - Search */}
        <div className="flex flex-1 justify-center px-4">
          <div className="relative w-full max-w-[500px]">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search opportunities, agencies, partners…"
              className="h-11 rounded-full border-border bg-card pl-11 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button
            type="button"
            onClick={() => navigate("/notifications")}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground transition-transform hover:scale-[1.02]"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-xs font-semibold text-destructive-foreground">
              3
            </span>
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => navigate("/settings")}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive("/settings")
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            Settings
          </button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full gradient-gold text-sm font-bold text-background shadow-glow transition-transform hover:scale-[1.02]"
                aria-label="User menu"
              >
                SC
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 border-border bg-popover text-popover-foreground shadow-card"
            >
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/settings")}>
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/company")}>
                Company Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/admin/qa-queue")}>
                Admin Panel
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={handleLogout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
