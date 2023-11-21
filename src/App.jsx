import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import HomePage from './components/homepage/HomePage'
import ResultsPage from './components/resultspage/ResultsPage'
import ItemPage from './components/itempage/ItemPage'

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
      <NavBar />
      <RouterProvider router={router} />
    </>
  )
}

export default App