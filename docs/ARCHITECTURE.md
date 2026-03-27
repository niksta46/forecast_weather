# Architecture

## Purpose

This document describes the **technical structure and design decisions** of the weather website project.

⚠️ **Stability Rule**

* This file is considered **frozen**
* It must be changed **only when explicitly instructed by the project owner**

---

## High-Level Architecture

```
User Input (City Name)
        ↓
Geocoding API (Open-Meteo) → Returns lat/lon
        ↓
Weather API (Open-Meteo) → Returns weather data
        ↓
Frontend (React + Vite)
```

The frontend first converts user-entered city names to coordinates via the Geocoding API, then fetches weather data using those coordinates.

---

## Frontend Structure

```
src/
├── api/                    # API service layer
│   ├── client.js           # Base API client
│   ├── queryKeys.js        # TanStack Query keys
│   └── endpoints/         # Resource-specific API hooks
├── features/              # Feature-based UI modules
│   ├── current-weather/   # Current weather display
│   ├── forecast/          # Forecast display
│   └── location-search/  # Location search
├── components/
│   ├── layout/            # Header, Footer, Layout
│   └── common/            # Reusable UI components
├── routes/                # Router configuration
├── styles/                # Global styles
└── design-system/         # Design tokens
```

---

## Data Flow Pattern

```
External API → API Client → TanStack Query Hooks → Feature Component → UI Component
```

* All network logic lives in `api/`
* UI components never call fetch directly
* Automatic caching and invalidation handled by TanStack Query

---

## API Layer Conventions

* One module per resource
* Consistent method naming:
  * getCurrentWeather, getForecast
  * TanStack Query hooks: useCurrentWeather, useForecast
* Query keys centralized in `queryKeys.js`
* Base URL provided via `VITE_API_URL` (defaults to Open-Meteo)
* Automatic cache invalidation on mutations

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
* Background refetching handled automatically

---

## Routing

* Uses `createBrowserRouter`
* Layout rendered via `<Outlet />`
* No `{children}` pattern for routes
* Routes defined in `routes/index.js`

---

## Design System

* Tailwind CSS for styling
* Custom color palette configured in Tailwind
* Design tokens in `design-system/` directory

---

## External API Integration

* No assumptions about API response structure
* Use external API responses exactly as provided
* No client-side schema duplication

---

## State Management

* TanStack Query for server state
* React useState/useReducer for UI state only

This document exists to prevent architectural drift.
