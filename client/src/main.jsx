import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './bootstrap/dist/css/bootstrap.min.css';

import { QueryClient, QueryClientProvider } from 'react-query';

// Create a new QueryClient instance
const queryClient = new QueryClient();


import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
   <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>
)
