import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navigation from './src/navbar/Navigation'
import HomePage from './src/homepage/HomePage'
import ResultsPage from './src/resultspage/ResultsPage'
import ItemPage from './src/itempage/ItemPage'

function App() {
  const [currentUser, setCurrentUser] = useState()
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

  useEffect(() => {
    fetch('http://localhost:3000/users/sign_in', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setCurrentUser(data))
  }, [])

  return (
    <>
      <Navigation currentUser={currentUser} />
      <RouterProvider router={router} />
    </>
  )
}

export default App