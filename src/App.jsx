import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navigation from './components/global/Navigation'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/results?',
      element: <ResultsPage />
    }
  ])
  
  return (
    <>
      <Navigation isSignedIn={true} />
      <RouterProvider router={router} />
    </>
  )
}

export default App