# GradPath User Flow Documentation

## Authentication & Onboarding Flow

The GradPath application now includes a complete authentication and onboarding experience before users reach the dashboard.

### Flow Overview

```
Sign In / Create Account
    ↓
Onboarding Step 1: Application Goals
    ↓
Onboarding Step 2: Target Countries
    ↓
Onboarding Step 3: First Application
    ↓
Dashboard (existing screen)
```

### Routes

#### Authentication Routes
- `/sign-in` - User login page
- `/create-account` - New user registration

#### Onboarding Routes  
- `/onboarding/goals` - Select program type (Master's, PhD, etc.)
- `/onboarding/countries` - Select target countries (multi-select)
- `/onboarding/first-application` - Add first application details (optional)

#### Main Application Routes (require onboarding completion)
- `/dashboard` - Main dashboard (redirects from `/`)
- `/applications` - Applications list
- `/applications/:id` - Application detail
- `/tasks` - Tasks management
- `/documents` - Document vault
- `/ai-assistant` - AI assistant

### Design System

All new screens follow the existing GradPath design system:

- **Typography**: Inter Tight font with negative letter spacing
- **Primary Color**: #162660 (Royal Blue)
- **Secondary Color**: #D0E6FD (Powder Blue)
- **Accent Color**: #F1E4D1 (Warm Beige)
- **Border Radius**: 16px (rounded-xl)
- **Card Layout**: White cards with border and shadow
- **Max Width**: Constrained layouts for better readability

### State Management

The application uses localStorage to track onboarding completion:

```javascript
// Check if user completed onboarding
localStorage.getItem("gradpath_onboarding_complete") // "true" or null

// User preferences stored during onboarding
localStorage.getItem("gradpath_program_type") // "masters", "phd", etc.
localStorage.getItem("gradpath_target_countries") // JSON array
localStorage.getItem("gradpath_first_application") // JSON object
```

### Development & Testing

A floating dev helper button is available in the bottom-right corner:

- **Reset Onboarding**: Clears onboarding state and returns to sign-in
- **Clear All Data**: Removes all localStorage data
- **Hide**: Dismiss the dev helper

Alternatively, use browser console:
```javascript
// Reset onboarding
localStorage.removeItem("gradpath_onboarding_complete");
window.location.href = "/sign-in";

// Clear all data
localStorage.clear();
window.location.reload();
```

### Features

#### Sign In Page
- Email and password fields
- Link to create account
- Automatic routing based on onboarding status

#### Create Account Page  
- Full name, email, password, and confirm password fields
- Password validation
- Link back to sign in
- Proceeds directly to onboarding

#### Onboarding Step 1: Application Goals
- Progress indicator (Step 1 of 3)
- Single-select program type
- Options: Master's Degree, PhD, Postgraduate Diploma, Multiple Programs
- Disabled continue button until selection made

#### Onboarding Step 2: Target Countries
- Progress indicator (Step 2 of 3)
- Multi-select country chips
- Options: UK, US, Canada, Europe, Australia, Other
- Shows selected count
- Disabled continue button until at least one country selected

#### Onboarding Step 3: First Application
- Progress indicator (Step 3 of 3)
- Form fields: University name, program name, country, deadline, portal link (optional)
- Two options:
  - Add Application (submits form)
  - Skip for now (bypass without data)
- Both options complete onboarding and navigate to dashboard

### Navigation

- Auth and onboarding screens appear **without** the sidebar
- Dashboard and main app screens include the full sidebar navigation
- Sidebar navigation updated to use `/dashboard` route
- Root path `/` automatically redirects based on onboarding status

### Next Steps for Implementation

If you want to connect this to a real backend:

1. Replace localStorage checks with actual authentication
2. Add Supabase auth integration for sign-in/create-account
3. Store onboarding data in database instead of localStorage
4. Add protected route middleware
5. Implement real session management

The current implementation provides a complete UX flow that can be easily connected to backend services.
