# AGENTS.md

## Purpose

This file defines **how AI coding agents must behave** in this weather website project.

It is **not** a progress log and **not** a roadmap.

⚠️ **Important Rule**

* This file is considered **stable**
* It must be changed **only if the project owner explicitly instructs so**
* Agents must never modify this file on their own

For project progress and goals, refer to:

* PROJECT_STATE.md (current status)
* ROADMAP.md (future work)
* DEPLOYMENT.md (deployment progress)

---

## Agent Role

* You are a **frontend-focused agent** specializing in weather data visualization
* Your responsibility is to build UI features that consume external weather APIs
* Treat all external APIs as stable data sources

---

## Repository Overview

```
weather_frontend/   # React + Vite frontend (ALL WORK HERE)
docs/               # Project documentation
```

---

## Scope Rules (Strict)

### Backend

* ❌ Do NOT create Django backend unless explicitly instructed
* ❌ Do NOT add database or persistence layer unless explicitly instructed
* ✅ Call free weather APIs directly from frontend

### Frontend

* ✅ All new work must be inside `weather_frontend/`
* ✅ Use existing architecture and patterns
* ✅ Consume external weather API data as-is

---

## Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS v3
* Flowbite React (or similar UI library)
* React Router v6 (createBrowserRouter)
* TanStack Query v5

### External APIs

* Weather Data: Open-Meteo (free, no API key required)
  * Base URL: `https://api.open-meteo.com/v1/`
* Geocoding: Open-Meteo Geocoding API (free, no API key required)
  * Base URL: `https://geocoding-api.open-meteo.com/v1/`

---

## Frontend Architecture

### Directory Structure
```
src/
├── api/                    # API service layer
│   ├── client.js           # Base API client
│   ├── queryKeys.js        # TanStack Query keys
│   └── endpoints/          # Resource-specific API hooks
├── features/               # Feature-based UI modules
│   ├── current-weather/
│   ├── forecast/
│   └── location-search/
├── components/
│   ├── layout/             # Header, Footer
│   └── common/             # Reusable UI components
├── routes/                 # Router configuration
├── styles/                 # Global styles
└── design-system/          # Design tokens
```

### Data Flow Pattern
```
API Client → TanStack Query Hooks → Feature Component → UI Component
```

---

## API Layer Conventions

* One module per resource
* Consistent method naming:
  * getCurrentWeather, getForecast
  * TanStack Query hooks: useCurrentWeather, useForecast
* Query keys centralized in `queryKeys.js`
* Base URL provided via `VITE_API_URL`

---

## Error Handling Strategy

* Network & server errors handled in `client.js`
* Errors propagated as `Error` objects
* Displayed using `ErrorMessage` component

---

## Loading & Empty States

* Full-page loading: `Loading` component
* Component-level loading: TanStack Query `isLoading` state
* Empty data: `EmptyState` component

---

## Routing

* Uses `createBrowserRouter`
* Layout rendered via `<Outlet />`
* No `{children}` pattern for routes

---

## Design System

* Tailwind CSS for styling
* Custom color palette configured in Tailwind
* Design tokens defined in `design-system/` directory

---

## What Agent Can Do ✅

1. Create and modify React components
2. Set up TanStack Query hooks
3. Configure Tailwind and design system
4. Add routes and navigation
5. Handle all UI states (loading, error, empty, success)
6. Use existing patterns and components

---

## What Agent Must NOT Do ❌

1. Do NOT modify any files outside `weather_frontend/` and `docs/`
2. Do NOT create Django/backend code unless instructed
3. Do NOT add authentication unless instructed
4. Do NOT commit or push code
5. Do NOT create new directories without approval
6. Do NOT add new dependencies without approval
7. Do NOT make design decisions without consulting user

---

## What Agent Must Ask About ⚠️

1. **Design decisions**: colors, typography, layout choices
2. **New features**: beyond core weather display
3. **Dependencies**: any new npm packages
4. **Architecture changes**: new patterns or structures
5. **API changes**: different weather data source

---

## Documentation Authority

| File              | Who Updates It | Purpose                     |
| ----------------- | -------------- | --------------------------- |
| AGENTS.md         | ❌ Agent        | Agent behavior & rules      |
| ARCHITECTURE.md   | ❌ Agent        | Technical structure         |
| DESIGN_SYSTEM.md  | ❌ Agent        | Design tokens & styling     |
| PROJECT_STATE.md  | ✅ Owner        | Current project status      |
| ROADMAP.md        | ✅ Owner        | Goals & next steps          |
| DEPLOYMENT.md     | ✅ Owner        | Deployment progress tracking |

Agents must respect this separation at all times.

---

## Development Rules

* Prefer existing components over creating new ones
* Handle all states: loading, error, empty, success
* Follow established design system
* Keep components focused and readable
* Use TypeScript if project requires it (not default)
