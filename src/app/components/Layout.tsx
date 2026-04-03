import { Outlet, NavLink } from "react-router";
import {
  LayoutDashboard,
  GraduationCap,
  CheckSquare,
  FileText,
  Sparkles,
  Settings
} from "lucide-react";

export function Layout() {
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/applications", label: "Applications", icon: GraduationCap },
    { path: "/tasks", label: "Tasks", icon: CheckSquare },
    { path: "/documents", label: "Documents", icon: FileText },
    { path: "/ai-assistant", label: "AI Assistant", icon: Sparkles },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar - hidden on mobile */}
      <aside className="hidden md:flex w-64 bg-sidebar border-r border-sidebar-border flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#162660] to-[#2563eb] flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">GradPath</h1>
              <p className="text-xs text-muted-foreground">Navigate your journey</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-sidebar-border">
          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        {/* Mobile Header - shown only on mobile */}
        <div className="md:hidden sticky top-0 z-10 bg-sidebar border-b border-sidebar-border px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#162660] to-[#2563eb] flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">GradPath</h1>
            </div>
            <div className="ml-auto">
              <NavLink
                to="/settings"
                className="p-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <Settings className="w-5 h-5" />
              </NavLink>
            </div>
          </div>
        </div>

        <Outlet />
      </main>

      {/* Mobile Bottom Navigation - shown only on mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-sidebar border-t border-sidebar-border">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 px-3 py-3 transition-colors min-w-0 flex-1 ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs font-medium truncate w-full text-center">{item.label.split(' ')[0]}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}