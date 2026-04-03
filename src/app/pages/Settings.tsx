import { useState } from "react";
import { User, Bell, Lock, Palette, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useTheme } from "../contexts/ThemeContext";

export function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const handleSignOut = () => {
    // Clear localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    // Navigate to sign in
    navigate("/sign-in");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and application settings
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-card rounded-2xl border border-border p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="w-full mt-4 flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-card rounded-2xl border border-border p-8">
            {activeTab === "profile" && <ProfileSettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "appearance" && <AppearanceSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  const userEmail = localStorage.getItem("userEmail") || "user@example.com";
  const userName = localStorage.getItem("userName") || "Student Name";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Update your personal information and profile details
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            defaultValue={userName}
            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            defaultValue={userEmail}
            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            rows={4}
            placeholder="Tell us about yourself..."
            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
        <button className="px-6 py-2 rounded-xl border border-border font-medium hover:bg-accent transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Choose how you want to receive notifications
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div>
            <div className="font-medium">Email Notifications</div>
            <div className="text-sm text-muted-foreground">
              Receive notifications via email
            </div>
          </div>
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={`w-12 h-6 rounded-full transition-colors ${
              emailNotifications ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                emailNotifications ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-border">
          <div>
            <div className="font-medium">Push Notifications</div>
            <div className="text-sm text-muted-foreground">
              Receive browser push notifications
            </div>
          </div>
          <button
            onClick={() => setPushNotifications(!pushNotifications)}
            className={`w-12 h-6 rounded-full transition-colors ${
              pushNotifications ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                pushNotifications ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-border">
          <div>
            <div className="font-medium">Deadline Reminders</div>
            <div className="text-sm text-muted-foreground">
              Get reminders for upcoming application deadlines
            </div>
          </div>
          <button
            onClick={() => setDeadlineReminders(!deadlineReminders)}
            className={`w-12 h-6 rounded-full transition-colors ${
              deadlineReminders ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                deadlineReminders ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <div className="font-medium">Task Reminders</div>
            <div className="text-sm text-muted-foreground">
              Get reminders for incomplete tasks
            </div>
          </div>
          <button
            onClick={() => setTaskReminders(!taskReminders)}
            className={`w-12 h-6 rounded-full transition-colors ${
              taskReminders ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                taskReminders ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Manage your password and security preferences
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Current Password</label>
          <input
            type="password"
            placeholder="Enter current password"
            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
          Update Password
        </button>
        <button className="px-6 py-2 rounded-xl border border-border font-medium hover:bg-accent transition-colors">
          Cancel
        </button>
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="font-semibold mb-2">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add an extra layer of security to your account
        </p>
        <button className="px-6 py-2 rounded-xl border border-border font-medium hover:bg-accent transition-colors">
          Enable 2FA
        </button>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Appearance Settings</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Customize how GradPath looks and feels
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-4">Theme</label>
        <div className="grid grid-cols-3 gap-4">
          {(["light", "dark", "auto"] as const).map((themeOption) => (
            <button
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === themeOption
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="font-medium capitalize">{themeOption}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {themeOption === "light" && "Light mode"}
                {themeOption === "dark" && "Dark mode"}
                {themeOption === "auto" && "System preference"}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-4">Display Density</label>
        <div className="space-y-2">
          {["comfortable", "compact"].map((density) => (
            <label
              key={density}
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-accent cursor-pointer"
            >
              <input
                type="radio"
                name="density"
                value={density}
                className="w-4 h-4"
              />
              <div>
                <div className="font-medium capitalize">{density}</div>
                <div className="text-xs text-muted-foreground">
                  {density === "comfortable" && "More spacing between elements"}
                  {density === "compact" && "Less spacing, more content visible"}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}