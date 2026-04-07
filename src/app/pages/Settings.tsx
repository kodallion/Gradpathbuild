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
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Manage your account preferences and application settings
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Sidebar Tabs - Hidden on mobile, shown as buttons above content */}
        <div className="hidden md:block md:w-64 flex-shrink-0">
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

        {/* Mobile Tabs */}
        <div className="md:hidden bg-card rounded-xl border border-border p-2 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap text-sm ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-card rounded-xl md:rounded-2xl border border-border p-5 md:p-8">
            {activeTab === "profile" && <ProfileSettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "appearance" && <AppearanceSettings />}
          </div>

          {/* Mobile Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="md:hidden w-full mt-4 flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all border border-destructive/20"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  const [name, setName] = useState(localStorage.getItem("userName") || "Student Name");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "user@example.com");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  const handleSave = () => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setName(localStorage.getItem("userName") || "Student Name");
    setEmail(localStorage.getItem("userEmail") || "user@example.com");
    setPhone("");
    setBio("");
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Profile Information</h2>
        <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
          Update your personal information and profile details
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div>
          <label className="block text-xs md:text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg md:rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium mb-2">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg md:rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg md:rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xs md:text-sm font-medium mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell us about yourself..."
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base rounded-lg md:rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-3 md:pt-4">
        <button
          onClick={handleSave}
          className="px-4 md:px-6 py-2 text-sm md:text-base rounded-lg md:rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Save Changes
        </button>
        <button
          onClick={handleCancel}
          className="px-4 md:px-6 py-2 text-sm md:text-base rounded-lg md:rounded-xl border border-border font-medium hover:bg-accent transition-colors"
        >
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
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Notification Preferences</h2>
        <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
          Choose how you want to receive notifications
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div className="flex items-center justify-between py-2 md:py-3 border-b border-border">
          <div className="flex-1 pr-3">
            <div className="font-medium text-sm md:text-base">Email Notifications</div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Receive notifications via email
            </div>
          </div>
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={`w-11 h-6 md:w-12 md:h-6 rounded-full transition-colors flex-shrink-0 ${
              emailNotifications ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-4.5 h-4.5 md:w-5 md:h-5 bg-white rounded-full transition-transform ${
                emailNotifications ? "translate-x-5.5 md:translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2 md:py-3 border-b border-border">
          <div className="flex-1 pr-3">
            <div className="font-medium text-sm md:text-base">Push Notifications</div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Receive browser push notifications
            </div>
          </div>
          <button
            onClick={() => setPushNotifications(!pushNotifications)}
            className={`w-11 h-6 md:w-12 md:h-6 rounded-full transition-colors flex-shrink-0 ${
              pushNotifications ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-4.5 h-4.5 md:w-5 md:h-5 bg-white rounded-full transition-transform ${
                pushNotifications ? "translate-x-5.5 md:translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2 md:py-3 border-b border-border">
          <div className="flex-1 pr-3">
            <div className="font-medium text-sm md:text-base">Deadline Reminders</div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Get reminders for upcoming application deadlines
            </div>
          </div>
          <button
            onClick={() => setDeadlineReminders(!deadlineReminders)}
            className={`w-11 h-6 md:w-12 md:h-6 rounded-full transition-colors flex-shrink-0 ${
              deadlineReminders ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-4.5 h-4.5 md:w-5 md:h-5 bg-white rounded-full transition-transform ${
                deadlineReminders ? "translate-x-5.5 md:translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2 md:py-3">
          <div className="flex-1 pr-3">
            <div className="font-medium text-sm md:text-base">Task Reminders</div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Get reminders for incomplete tasks
            </div>
          </div>
          <button
            onClick={() => setTaskReminders(!taskReminders)}
            className={`w-11 h-6 md:w-12 md:h-6 rounded-full transition-colors flex-shrink-0 ${
              taskReminders ? "bg-primary" : "bg-muted"
            }`}
          >
            <div
              className={`w-4.5 h-4.5 md:w-5 md:h-5 bg-white rounded-full transition-transform ${
                taskReminders ? "translate-x-5.5 md:translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex gap-2 md:gap-3 pt-3 md:pt-4">
        <button
          onClick={() => alert("Notification preferences saved!")}
          className="px-4 md:px-6 py-2 text-sm md:text-base rounded-lg md:rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}

function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    alert("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleEnable2FA = () => {
    alert("2FA setup would be implemented here. This would typically involve scanning a QR code and entering a verification code.");
  };

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
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            className="w-full px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={handleUpdatePassword}
          className="px-6 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Update Password
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-2 rounded-xl border border-border font-medium hover:bg-accent transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="font-semibold mb-2">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add an extra layer of security to your account
        </p>
        <button
          onClick={handleEnable2FA}
          className="px-6 py-2 rounded-xl border border-border font-medium hover:bg-accent transition-colors"
        >
          Enable 2FA
        </button>
      </div>
    </div>
  );
}

function AppearanceSettings() {
  const { theme, setTheme } = useTheme();
  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");

  const themeOptions = ["light", "dark", "auto"] as const;
  const densityOptions = ["comfortable", "compact"] as const;

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Appearance Settings</h2>
        <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">
          Customize how GradPath looks and feels
        </p>
      </div>

      <div>
        <label className="block text-xs md:text-sm font-medium mb-3 md:mb-4">Theme</label>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {themeOptions.map((themeOption) => (
            <button
              key={themeOption}
              onClick={() => setTheme(themeOption)}
              className={`p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all ${
                theme === themeOption
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="font-medium capitalize text-sm md:text-base">{themeOption}</div>
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
        <label className="block text-xs md:text-sm font-medium mb-3 md:mb-4">Display Density</label>
        <div className="space-y-2">
          {densityOptions.map((densityOption) => (
            <label
              key={densityOption}
              className="flex items-center gap-3 p-2.5 md:p-3 rounded-lg md:rounded-xl border border-border hover:bg-accent cursor-pointer"
            >
              <input
                type="radio"
                name="density"
                value={densityOption}
                checked={density === densityOption}
                onChange={(e) => setDensity(e.target.value as "comfortable" | "compact")}
                className="w-3.5 h-3.5 md:w-4 md:h-4"
              />
              <div>
                <div className="font-medium capitalize text-sm md:text-base">{densityOption}</div>
                <div className="text-xs text-muted-foreground">
                  {densityOption === "comfortable" && "More spacing between elements"}
                  {densityOption === "compact" && "Less spacing, more content visible"}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}