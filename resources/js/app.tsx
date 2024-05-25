import './bootstrap'
import '../css/app.css'

import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { FileContextProvider } from './Context/FileContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'
const queryClient = new QueryClient()

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el)

    root.render(
      <FileContextProvider>
        <QueryClientProvider client={queryClient}>
          <App {...props} />
        </QueryClientProvider>
      </FileContextProvider>,
    )
  },
  progress: {
    color: '#4B5563',
  },
})
