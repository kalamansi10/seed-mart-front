import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navigation from './components/global/Navigation'
import HomePage from './pages/HomePage'
import ResultsPage from './pages/ResultsPage'
import ItemPage from './pages/ItemPage'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/results?',
      element: <ResultsPage />
    },
    {
      path: '/show/:id',
      element: <ItemPage />
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