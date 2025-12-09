# DPS Frontend Coding Challenge: German Address Validator

### By Aleksandra Topalova

A small **React + Vite** application that validates German postal codes (PLZ) and localities using the **Open PLZ API**.
The application supports two lookup modes, dynamic field behavior, validation and a minimal UI using `TailwindCSS +
shadcn/ui`.

## 🚀 Project Overview

This project implements a two-way validation system for German addresses:

* Users can enter either a locality (city/town) or a postal code (PLZ)
* The application validates one field using the other by calling the Open PLZ API
* The UX dynamically adjusts:
    * Auto-filling the matching field
    * Showing errors
    * Switching the PLZ field to a dropdown if multiple results exist

This includes debouncing, error handling and lookup mode switching.

## 🧠 How the App Works

### 1. Two Lookup Modes

The user can select:

* **Lookup by Locality** → validate + fetch postal codes
* **Lookup by PLZ** → validate + fetch localities

A custom `LookupModeButton` switches between the two for a better user experience.

---

### 2. Locality → Postal Code Logic

When the user types a locality:

* After 1 second debounce, a request is sent to the API
* Possible outcomes:
  * **Exactly one postal code found** → auto-fill PLZ
  * **Multiple postal codes found** → show a dropdown
  * **No match** → display an error

---

### 3. Postal Code → Locality Logic

When the user enters a 5-digit postal code:

* Request is triggered immediately after the postal code is complete
* Possible outcomes:
  * **Valid PLZ** → locality auto-fills
  * **Invalid PLZ** → show error message

Invalid codes are detected both through the API response and the query error state.

## 🛠 Technical Decisions

### React Query
* Makes stable network requests
* Automatically caches city/PLZ lookups
* Error handling
* Avoids duplicate fetches

### TailwindCSS + shadcn/ui
* Provide uniformly styled form inputs, fieldsets, labels and dropdowns
* Auto-generated the components in folder `components/ui` (which were later manually adapted)

### Toaster

* Displays form feedback and validation messages

### Debouncing

* Implemented manually via `setTimeout` + cleanup inside `useEffect`

## 📁 Project Setup

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

The app runs at:
http://localhost:3000

## 🤖 AI Assistance Transparency

Per the project requirements, below is a description of the AI assistance usage.

### Manually Implemented Parts

* All business logic:
  * Field state management
  * Lookup mode logic
  * Debouncing
* React Query integration
* UI layout and component composition
* Error handling

### Tools Used
* ChatGPT (model: GPT-5.1)
* Claude 4.5 Sonnet

### AI-Assisted Tasks
* Tailwind theme and colors + shadcn/ui and Tailwind/UI guidance
* Crafting better text labels (“Select the attribute...” etc.)
* Improving README structure and phrasing
* Debugging layout overflow + flexbox issues

→ AI suggestions were selectively applied and adjusted where necessary
