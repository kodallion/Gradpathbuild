# GradPath Quick Start Guide

## First Time Using the Application

When you first load GradPath, you'll be automatically directed to the **Sign In** page at `/sign-in`.

### Complete User Journey

1. **Sign In or Create Account**
   - If new user: Click "Create an account"
   - Fill in your details
   - Click "Create Account"

2. **Onboarding Step 1: Application Goals**
   - Select your program type (Master's, PhD, etc.)
   - Click "Continue"

3. **Onboarding Step 2: Target Countries**
   - Select one or more countries you're targeting
   - Click "Continue"

4. **Onboarding Step 3: First Application**
   - Option A: Fill in application details and click "Add Application"
   - Option B: Click "Skip for now" to proceed without adding an application

5. **Dashboard**
   - You're now in the main application!
   - Access all features via the sidebar

---

## Testing & Development

### Reset Everything
```javascript
// In browser console:
localStorage.clear();
location.reload();
```

### Reset Only Onboarding (Keep Mock Data)
```javascript
// In browser console:
localStorage.removeItem("gradpath_onboarding_complete");
location.href = "/sign-in";
```

### Or Use the Dev Helper
- Look for the floating button in the bottom-right corner
- Click it to see options:
  - Reset Onboarding
  - Clear All Data
  - Hide (if it's in the way)

---

## Direct Navigation (After Onboarding)

Once you've completed onboarding, you can navigate directly to:

- `/dashboard` - Main dashboard
- `/applications` - View all applications
- `/applications/1` - View specific application (replace 1 with actual ID)
- `/tasks` - Task management
- `/documents` - Document vault
- `/ai-assistant` - AI assistance

---

## Understanding the Flow

```
FIRST VISIT
    ↓
Root (/) → RootRedirect checks localStorage
    ↓
NO onboarding_complete?
    ↓
/sign-in
    ↓
/create-account (optional)
    ↓
/onboarding/goals
    ↓
/onboarding/countries  
    ↓
/onboarding/first-application
    ↓
localStorage.setItem("gradpath_onboarding_complete", "true")
    ↓
/dashboard ✓
    ↓
SUBSEQUENT VISITS
    ↓
Root (/) → RootRedirect checks localStorage
    ↓
HAS onboarding_complete!
    ↓
/dashboard ✓
```

---

## Key Features of Each Screen

### Sign In
- Email validation
- Password field
- Link to create account
- Auto-routing based on onboarding status

### Create Account
- Full name
- Email validation
- Password matching
- Immediate redirect to onboarding

### Onboarding Goals
- 4 program type options
- Single selection
- Can't proceed without selection
- Progress: 1 of 3

### Onboarding Countries
- 6 country options
- Multi-select capability
- Selection counter
- Can't proceed without at least one selection
- Progress: 2 of 3

### Onboarding First Application
- 5 form fields (4 required, 1 optional)
- Two completion options:
  - Submit with data
  - Skip without data
- Both mark onboarding as complete
- Progress: 3 of 3

### Dashboard (Post-Onboarding)
- Full sidebar navigation
- Stats overview
- Application cards
- Upcoming deadlines
- Pending tasks
- AI assistant banner

---

## localStorage Keys Used

The application stores these values in localStorage:

```javascript
// Onboarding status
"gradpath_onboarding_complete" // "true" or not set

// User preferences (stored during onboarding)
"gradpath_program_type"        // "masters" | "phd" | "diploma" | "multiple"
"gradpath_target_countries"    // JSON array: ["uk", "us", "canada", ...]
"gradpath_first_application"   // JSON object: { universityName, programName, ... }
```

---

## Design Notes

All screens use:
- **Font**: Inter Tight
- **Primary Color**: #162660 (Royal Blue)
- **Secondary Color**: #D0E6FD (Powder Blue)
- **Accent Color**: #F1E4D1 (Warm Beige)
- **Border Radius**: 16px (rounded-xl)
- **Animation**: 500ms fade-in on load

Auth and onboarding screens do NOT show the sidebar.
Dashboard and main app screens DO show the sidebar.

---

## Common Issues & Solutions

### Problem: Stuck on Sign In
**Solution**: Complete the form and submit. If you've already completed onboarding, you'll go directly to dashboard.

### Problem: Want to See Onboarding Again
**Solution**: Use dev helper "Reset Onboarding" button, or run:
```javascript
localStorage.removeItem("gradpath_onboarding_complete");
location.href = "/sign-in";
```

### Problem: Dev Helper Disappeared
**Solution**: Reload the page. The helper is visible by default.

### Problem: Can't Click Continue
**Solution**: Make sure you've selected an option on the current onboarding step. The button is disabled until a selection is made.

---

## Next Steps for Production

To make this production-ready:

1. **Backend Authentication**
   - Replace localStorage auth with Supabase Auth
   - Add real session management
   - Implement password reset flow

2. **Database Integration**
   - Store onboarding data in database
   - Sync user preferences
   - Save application data to Supabase

3. **Protected Routes**
   - Add route guards
   - Verify authentication on protected pages
   - Handle session expiration

4. **Enhanced Features**
   - Email verification
   - Password strength requirements
   - Social login (Google, etc.)
   - Remember me functionality

5. **Remove Dev Helper**
   - Comment out or remove DevHelper component in production
   - Keep for staging/development environments

---

## Support & Feedback

The current implementation is a fully functional prototype with:
- ✅ Complete UI/UX flow
- ✅ Visual design system
- ✅ Responsive layouts
- ✅ State management (localStorage)
- ✅ Navigation and routing
- ✅ Form validation
- ✅ Progress indicators
- ✅ Development tools

Ready to connect to backend services for production use!
