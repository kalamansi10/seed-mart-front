import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './src/navigation/Navigation'
import HomePage from './src/homepage/HomePage'
import ResultsPage from './src/resultspage/ResultsPage'
import ItemPage from './src/itempage/ItemPage'
import CartPage from './src/cartpage/CartPage'
import CheckOutPage from './src/checkoutpage/CheckOutPage'

function App() {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    fetch('/users/sign_in', {
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setCurrentUser(data))
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navigation currentUser={currentUser} />
        <Routes>
          < Route path='/' element={<HomePage />} />
          < Route path='/results?' element={<ResultsPage />} />
          < Route path='/show/:id' element={<ItemPage />} />
          < Route path='/cart' element={<CartPage />} currentUser={currentUser}/>
          < Route path='/checkout' element={<CartPage />} currentUser={currentUser}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App