import { Bell, Search, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AppTopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-nav">
      <div className="mx-auto flex h-[70px] w-full max-w-[1600px] items-center gap-4 px-8">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-logo shadow-glow">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-[24px] font-bold text-foreground">rfpSimplify</span>
        </div>

        {/* Center */}
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
          <button
            type="button"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-card text-foreground transition-transform hover:scale-[1.02]"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-xs font-semibold text-destructive-foreground">
              3
            </span>
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full gradient-gold text-sm font-bold text-background shadow-glow transition-transform hover:scale-[1.02]"
                aria-label="User menu"
              >
                SW
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 border-border bg-popover text-popover-foreground shadow-card"
            >
              <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
