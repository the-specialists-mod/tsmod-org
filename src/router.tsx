import { createBrowserRouter } from 'react-router'
import { Layout } from '@/components/layout'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    // Shown while a lazily loaded page resolves on first load.
    HydrateFallback: () => null,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'play', lazy: async () => ({ Component: (await import('@/pages/play')).PlayPage }) },
      { path: 'maps', lazy: async () => ({ Component: (await import('@/pages/maps')).MapsPage }) },
      { path: 'models', lazy: async () => ({ Component: (await import('@/pages/models')).ModelsPage }) },
      { path: 'servers', lazy: async () => ({ Component: (await import('@/pages/servers')).ServersPage }) },
      { path: 'manual', lazy: async () => ({ Component: (await import('@/pages/manual')).ManualPage }) },
      { path: 'history', lazy: async () => ({ Component: (await import('@/pages/history')).HistoryPage }) },
      { path: 'resources', lazy: async () => ({ Component: (await import('@/pages/resources')).ResourcesPage }) },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
