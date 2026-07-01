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

## Phase 11: Day-Specific Hourly Forecast

### Goal
Enable clicking on days in the 7-day forecast to view detailed hourly weather data.

### Tasks
- [x] Add day selection to homepage: Click day card to show corresponding hourly data
- [ ] Highlight selected day in daily forecast list
- [ ] Update hourly chart to display data only for selected day
- [ ] Test on mobile and desktop views

### Implementation Guide
**Objective**
Implement day-specific hourly forecast functionality by enabling users to click on days in the 7-day forecast to view detailed hourly weather data.

**Core Tasks (Completed in Order)**

**Task 1: Day Selection Implementation**
*Goal*: Click on day cards in weekly forecast to display hourly data for that specific day

*Implementation Steps*:
1. Modify `src/features/weekly-forecast/WeeklyForecastPage.jsx`
2. Add state to track selected day index or date
3. Make day cards clickable with visual feedback
4. Pass selected day information to HourlyDetailsPage

**Task 2: Visual Selection Highlighting**
*Goal*: Highlight the currently selected day in the weekly forecast

*Implementation Steps*:
1. Add CSS classes for selected day styling
2. Apply conditional styling based on selected day state
3. Ensure visual distinction from unselected days

**Task 3: Hourly Data Filtering**
*Goal*: Update charts to display data only for the selected day

*Implementation Steps*:
1. Modify data filtering in HourlyDetailsPage
2. Filter existing forecast data to show only relevant hours for selected day
3. Update chart components to respond to day selection

**Task 4: Mobile/Desktop Testing**
*Goal*: Verify functionality works on all device sizes

*Implementation Steps*:
1. Test responsive behavior of day cards and charts
2. Verify selection works on mobile touch screens
3. Ensure all UI elements display properly across viewports

### Implementation Notes
* Leverage existing forecast data structure that already includes multi-day information
* Reuse existing charting components (HourlyCharts.jsx) for consistency
* Follow existing design system patterns for styling
* Maintain URL state for location persistence
* Ensure smooth transitions between day selections

### Expected Completion State
Upon completion of all tasks, users will be able to:
1. Click any day in the 7-day forecast
2. View the hourly weather data for that specific day
3. See the selected day visually highlighted
4. Navigate between days seamlessly
5. Use the feature on mobile and desktop devices

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