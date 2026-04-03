# GradPath Screen Reference

## Screen Flow Overview

### Phase 1: Authentication (No Sidebar)

#### Screen 1: Sign In (`/sign-in`)
```
┌─────────────────────────────────────┐
│         [GradPath Logo]             │
│     Welcome back! Sign in           │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   Sign In                     │ │
│  │                               │ │
│  │   Email: [____________]       │ │
│  │   Password: [____________]    │ │
│  │                               │ │
│  │   [Sign In Button]            │ │
│  │                               │ │
│  │   Create an account →         │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### Screen 2: Create Account (`/create-account`)
```
┌─────────────────────────────────────┐
│         [GradPath Logo]             │
│  Start your graduate school journey │
│                                     │
│  ┌───────────────────────────────┐ │
│  │   Create Account              │ │
│  │                               │ │
│  │   Full Name: [____________]   │ │
│  │   Email: [____________]       │ │
│  │   Password: [____________]    │ │
│  │   Confirm: [____________]     │ │
│  │                               │ │
│  │   [Create Account Button]     │ │
│  │                               │ │
│  │   Already have account? →     │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

### Phase 2: Onboarding (No Sidebar)

#### Screen 3: Goals - Step 1 of 3 (`/onboarding/goals`)
```
┌─────────────────────────────────────┐
│         [GradPath Logo]             │
│      [●]━━[○]━━[○]                  │
│     Goals  Countries  Application   │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  What are you applying for?   │ │
│  │                               │ │
│  │  [Master's Degree    ] [ ✓ ]  │ │
│  │  [PhD                ] [   ]  │ │
│  │  [Postgrad Diploma   ] [   ]  │ │
│  │  [Multiple Programs  ] [   ]  │ │
│  │                               │ │
│  │       [Continue Button]       │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### Screen 4: Countries - Step 2 of 3 (`/onboarding/countries`)
```
┌─────────────────────────────────────┐
│         [GradPath Logo]             │
│      [●]━━[●]━━[○]                  │
│     Goals  Countries  Application   │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Where are you planning to     │ │
│  │ study?                        │ │
│  │                               │ │
│  │  [United Kingdom ✗] [United   │ │
│  │   States] [Canada ✗] [Europe] │ │
│  │  [Australia] [Other]          │ │
│  │                               │ │
│  │  ℹ 2 countries selected       │ │
│  │                               │ │
│  │       [Continue Button]       │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### Screen 5: First Application - Step 3 of 3 (`/onboarding/first-application`)
```
┌─────────────────────────────────────┐
│         [GradPath Logo]             │
│      [●]━━[●]━━[●]                  │
│     Goals  Countries  Application   │
│                                     │
│  ┌───────────────────────────────┐ │
│  │  Add your first application   │ │
│  │                               │ │
│  │  University: [____________]   │ │
│  │  Program: [____________]      │ │
│  │  Country: [____________]      │ │
│  │  Deadline: [YYYY-MM-DD]       │ │
│  │  Portal Link: [optional___]   │ │
│  │                               │ │
│  │   [Add Application Button]    │ │
│  │   [Skip for now]              │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

---

### Phase 3: Main Application (With Sidebar)

#### Screen 6+: Dashboard & All Other Screens (`/dashboard`)
```
┌─────────┬───────────────────────────────┐
│         │                               │
│ GradPath│  Welcome back!                │
│         │  Overview of your journey     │
│         │                               │
│ [●] Dash│  ┌───┐ ┌───┐ ┌───┐ ┌───┐     │
│ [ ] Apps│  │ 8 │ │ 3 │ │ 2 │ │ 5 │     │
│ [ ] Task│  └───┘ └───┘ └───┘ └───┘     │
│ [ ] Docs│                               │
│ [ ] AI  │  Recent Applications...       │
│         │                               │
│         │  [Application Cards...]       │
│         │                               │
│ ─────── │                               │
│ Settings│                               │
└─────────┴───────────────────────────────┘
     SIDEBAR APPEARS AFTER ONBOARDING
```

---

## Visual Design Elements

### Color Usage

**Royal Blue (#162660)**
- Primary buttons
- Logo icon background
- Selected states
- Active navigation items
- Progress indicators (active step)

**Powder Blue (#D0E6FD)**
- Selected option backgrounds
- Secondary highlights
- Info boxes
- Selected country counter

**Warm Beige (#F1E4D1)**
- Accent elements
- Upcoming deadline highlights

**White (#FFFFFF)**
- Card backgrounds
- Input fields
- Page backgrounds (slight off-white #FAFBFC)

### Typography Hierarchy

- **Page Titles**: 3xl, bold, Royal Blue
- **Section Headers**: 2xl, semibold
- **Body Text**: base, regular, with letter-spacing
- **Labels**: medium weight
- **Buttons**: medium weight

### Common Patterns

**Cards**
- White background
- Rounded-2xl (16px radius)
- Border: light gray (#E5E7EB)
- Subtle shadow

**Buttons**
- Primary: Royal Blue background, white text
- Secondary: Transparent with border
- Height: 48px (h-12)
- Rounded-xl
- Hover: opacity-90

**Form Inputs**
- Height: 48px (h-12)
- Rounded-xl
- Border: light gray
- White background
- Focus: Royal Blue ring

**Progress Indicators**
- Active step: filled circle, Royal Blue
- Completed step: filled circle, light Royal Blue
- Upcoming step: outlined circle, gray
- Connected by lines

---

## Responsive Behavior

All screens are responsive:
- **Desktop**: Full layout with optimal spacing
- **Tablet**: Adjusted grid layouts (cards stack)
- **Mobile**: Single column, full-width elements

Max width: 2xl (672px) for auth/onboarding
Max width: 7xl (1280px) for dashboard

---

## Animation & Transitions

- Page loads: fade-in (500ms duration)
- Button hovers: opacity change
- Card hovers: shadow increase
- Selection states: instant visual feedback
- Navigation: smooth transitions

---

## Accessibility Features

- Semantic HTML structure
- Proper label associations
- Keyboard navigation support
- Focus states on interactive elements
- Required field indicators
- Clear error messages (password mismatch)

---

## Component Reuse

**From Existing GradPath:**
- Input component
- Label component
- Card styling patterns
- Button styles
- Navigation structure (Layout)
- Icon system (lucide-react)

**New Components:**
- Progress indicator (inline in onboarding)
- Multi-select chips (countries)
- Single-select cards (goals)
- DevHelper (floating tool)

---

## State Indicators

**Disabled States:**
- Grayed out buttons
- Cursor: not-allowed
- Reduced opacity

**Active States:**
- Highlighted borders
- Background color change
- Check marks or X icons

**Loading States:**
- Button text changes
- Disabled during action
- (Future: spinner animations)

---

This design system ensures visual consistency across all new screens while maintaining compatibility with the existing GradPath application.
