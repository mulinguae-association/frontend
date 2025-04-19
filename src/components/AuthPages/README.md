# Authentication Components

This directory contains all authentication-related components for the application.

## Directory Structure

```
AuthPages/
├── components/           # Reusable auth components
│   ├── PasswordRequirements.js
│   └── PasswordStrengthMeter.js
├── pages/                # Main auth pages
│   ├── Login.js
│   ├── Register.js
│   ├── ForgotPassword.js
│   ├── ResetPassword.js
│   └── UserSettings.js
├── styles/               # Styling for auth components
│   ├── AuthStyle.scss
│   ├── PasswordRequirements.scss
│   └── PasswordStrengthMeter.scss
└── index.js              # Exports all components
```

## Usage

Import components from the index file:

```javascript
import {
  Login,
  Register,
  PasswordStrengthMeter,
} from "../components/AuthPages";
```

## Components

### Pages

- **Login**: User login page
- **Register**: User registration page
- **ForgotPassword**: Password recovery request page
- **ResetPassword**: Password reset page
- **UserSettings**: User profile and settings page

### Reusable Components

- **PasswordStrengthMeter**: Visual indicator of password strength
- **PasswordRequirements**: List of password requirements with validation

## Styling

All styles are in the `styles` directory and are imported by their respective components.
