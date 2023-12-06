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
import Addresses from './src/userpage/Addresses'
import PaymentMethods from './src/userpage/PaymentMethods'
import Orders from './src/userpage/Orders'
import Reviews from './src/userpage/Reviews'
import useDialog from './src/hooks/useDialog'

function App() {
  const [currentUser, setCurrentUser] = useState()
  const logInDialog = useDialog()
  const signUpDialog = useDialog()

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
        <Navigation currentUser={currentUser} logInDialog={logInDialog} signUpDialog={signUpDialog}/>
        <Routes>closeSignUp
          <Route index element={<HomePage />} />
          <Route path='/results?' element={<ResultsPage />} />
          <Route path='/show/:id' element={<ItemPage />} />
          <Route path='/cart' element={<CartPage currentUser={currentUser} />} />
          <Route path='/checkout' element={<CheckOutPage currentUser={currentUser} />} />
          <Route path='/user' element={<UserPage currentUser={currentUser} />}>
            <Route path='/user/profile' element={<Profile currentUser={currentUser}/>} />
            <Route path='/user/addresses' element={<Addresses currentUser={currentUser}/>} />
            <Route path='/user/payment-methods' element={<PaymentMethods currentUser={currentUser}/>} />
            <Route path='/user/orders' element={<Orders currentUser={currentUser}/>} />
            <Route path='/user/reviews' element={<Reviews currentUser={currentUser}/>} />
            <Route path='/user' element={<Navigate to='/user/profile' replace />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App