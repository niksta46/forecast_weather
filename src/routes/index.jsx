import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '../components/layout'
import { HomePage } from '../features/home'
import { HourlyDetailsPage } from '../features/hourly-details'
import { WeeklyForecastPage } from '../features/weekly-forecast'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'hourly',
        element: <HourlyDetailsPage />,
      },
      {
        path: 'weekly',
        element: <WeeklyForecastPage />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])