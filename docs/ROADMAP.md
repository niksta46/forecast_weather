# Roadmap

## Purpose

This file defines **where the project is going next**.

⚠️ **Update Rule**

* This file **will be updated continuously** by the project owner
* Agents must follow this file as the authoritative plan

---

## Phase 1: Project Setup

### Goal

Initialize the React + Vite project with proper configuration.

### Tasks

- [x] Initialize Vite + React project
- [x] Install dependencies (Tailwind, TanStack Query, React Router)
- [x] Configure Tailwind CSS with design tokens
- [x] Set up project structure per ARCHITECTURE.md

---

## Phase 2: Design System Implementation

### Goal

Implement all design tokens and common components.

### Tasks

- [x] Configure Tailwind with color palette
- [x] Set up typography in Tailwind
- [x] Create CSS custom properties
- [x] Build common components:
  - [x] Button
  - [x] Card
  - [x] Input
  - [x] Loading
  - [x] ErrorMessage
  - [x] EmptyState

---

## Phase 3: API Layer

### Goal

Set up API client and TanStack Query integration.

### Tasks

- [x] Create API client (`src/api/client.js`)
- [x] Configure TanStack Query provider
- [x] Create query keys (`src/api/queryKeys.js`)
- [x] Implement geocoding API hook:
  - [x] useLocationSearch(query) - converts city name to lat/lon
- [x] Implement weather API hooks:
  - [x] useCurrentWeather(latitude, longitude)
  - [x] useForecast(latitude, longitude)

---

## Phase 4: Feature Implementation

### Goal

Build all weather display features.

### Tasks

#### Location Search
- [x] Search input component
- [x] Geocoding integration (Open-Meteo Geocoding API)
- [x] Location suggestions dropdown

#### Current Weather Display
- [x] Temperature display
- [x] Weather condition icon
- [x] Humidity, wind speed, feels-like
- [x] UV index (if available)

#### Forecast Display
- [x] Daily forecast (7-day)
- [x] Hourly forecast (24-hour)
- [x] Precipitation probability

---

## Phase 5: Routing & Navigation

### Goal

Set up routing and main navigation.

### Tasks

- [x] Configure React Router
- [x] Create routes:
  - [x] Home (weather display)
  - [x] Hourly details
  - [x] Weekly forecast
- [x] Add header/navigation

---

## Phase 6: Landing Page Enhancements

### Goal

Make the empty landing page more professional and user-friendly.

### Tasks

- [x] Option 1: Default City Display - Show weather for Tavullia, Italy on landing
- [x] Option 4: Use Current Location - Browser geolocation button
- [x] Option 5: Recent Searches - Store last searched cities in localStorage

---

## Phase 7: Weather Visualization

### Goal
Enhance weather display with charts and better icons.

### Tasks
- [x] Add hourly temperature chart (recharts library)
- [x] Replace Lucide icons with Wi (Weather Icons) library for filled icons
- [x] Make all weather icons blue (text-blue-500)
- [x] Add custom tooltip for chart (no duplicate values)
- [x] Update hourly details to show 5AM-3AM with 3-hour interval

---

## Phase 8: Layout Reorganization

### Goal
Reorganize landing page layout for better visual hierarchy and user experience.

### Tasks
- [x] Current weather on left, 7-day forecast on right (two-column layout)
- [x] Hourly forecast chart displayed below the two-column layout
- [x] Enhanced responsive design for all screen sizes

---

## Phase 9: Navigation Bar Optimization

### Goal
Optimize the navigation bar for better usability and visual consistency.

### Tasks
- [x] Logo, search bar, and nav links now in single horizontal line
- [x] Navbar width matches main content container width
- [x] Search bar expands through full available width
- [x] Eliminated extra right-side gaps in navbar layout

---

## Phase 10: Hourly Details Chart Implementation

### Goal
Implement comprehensive charting for hourly weather details.

### Tasks
- [x] Temperature chart (actual vs feels-like) ✅
- [x] Wind speed chart with fixed Y-axis ✅
- [x] Humidity + precipitation chart with dual axes ✅
- [x] Layout: One chart per row with responsive design ✅
- [x] Integration: Using existing design system colors and components ✅
---

## Definition of Done

* All features implemented and reachable
* Responsive on mobile, tablet, desktop
* Proper loading, error, and empty states
* No console errors

---

## Agent Instruction

Agents must:

* Start work from the **first unchecked step**
* Not skip roadmap steps
* Ask for clarification if roadmap and code conflict