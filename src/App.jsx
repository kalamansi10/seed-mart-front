import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navigation from './src/navbar/Navigation'
import HomePage from './src/homepage/HomePage'
import ResultsPage from './src/resultspage/ResultsPage'
import ItemPage from './src/itempage/ItemPage'

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
      <Navigation />
      <RouterProvider router={router} />
    </>
  )
}

export default App