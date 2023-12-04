import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './src/navigation/Navigation'
import HomePage from './src/homepage/HomePage'
import ResultsPage from './src/resultspage/ResultsPage'
import ItemPage from './src/itempage/ItemPage'
import CartPage from './src/cartpage/CartPage'
import CheckOutPage from './src/checkoutpage/CheckOutPage'
import UserPage from './src/userpage/UserPage'
import Profile from './src/userpage/Profile'

function App() {
  const [currentUser, setCurrentUser] = useState()
  console.log(currentUser)

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
          <Route index element={<HomePage />} />
          <Route path='/results?' element={<ResultsPage />} />
          <Route path='/show/:id' element={<ItemPage />} />
          <Route path='/cart' element={<CartPage currentUser={currentUser} />} />
          <Route path='/checkout' element={<CheckOutPage currentUser={currentUser} />} />
          <Route path='/user' element={<UserPage currentUser={currentUser} />}>
            <Route path='/user/profile' element={<Profile currentUser={currentUser}/>} />
            <Route path='/user/addresses' element={<div>2</div>} />
            <Route path='/user/payment-methods' element={<div>3</div>} />
            <Route path='/user/orders' element={<div>4</div>} />
            <Route path='/user/reviews' element={<div>5</div>} />
            <Route path='/user' element={<Navigate to='/user/profile' replace />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App