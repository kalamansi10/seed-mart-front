import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navigation from './src/navigation/Navigation'
import HomePage from './src/homepage/HomePage'
import ResultsPage from './src/resultspage/ResultsPage'
import ItemPage from './src/itempage/ItemPage'
import CartPage from './src/cartpage/CartPage'
import CheckOutPage from './src/checkoutpage/CheckOutPage'
import UserPage from './src/userpage/UserPage'
import Footer from './src/hooks/Footer'
import Profile from './src/userpage/Profile'
import Addresses from './src/userpage/Addresses'
import PaymentMethods from './src/userpage/PaymentMethods'
import Orders from './src/userpage/Orders'
import Reviews from './src/userpage/Reviews'
import useDialog from './src/hooks/useDialog'

function App() {
  // State for the current user and search API
  const [currentUser, setCurrentUser] = useState(null)

  // Custom hooks for login and sign-up dialogs
  const logInDialog = useDialog()
  const signUpDialog = useDialog()

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/users/sign_in', {
          credentials: 'include',
        });
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {/* Set up BrowserRouter for client-side navigation */}
      <BrowserRouter>
        {/* Navigation component with props */}
        <Navigation currentUser={currentUser} logInDialog={logInDialog} signUpDialog={signUpDialog} />

        {/* Define routes for different pages */}
        <Routes>
          {/* Home page */}
          <Route index element={<HomePage />} />

          {/* Results page with search functionality */}
          <Route path='/results?' element={<ResultsPage />} />

          {/* Item page for displaying details of a specific item */}
          <Route path='/show/:id' element={<ItemPage />} />

          {/* Cart page with current user data */}
          <Route path='/cart' element={<CartPage currentUser={currentUser} />} />

          {/* Checkout page with current user data */}
          <Route path='/checkout' element={<CheckOutPage currentUser={currentUser} />} />

          {/* User profile page with nested routes for different sections */}
          <Route path='/user' element={<UserPage currentUser={currentUser} />}>
            <Route path='/user/profile' element={<Profile currentUser={currentUser} />} />
            <Route path='/user/addresses' element={<Addresses currentUser={currentUser} />} />
            <Route path='/user/payment-methods' element={<PaymentMethods currentUser={currentUser} />} />
            <Route path='/user/orders' element={<Orders currentUser={currentUser} />} />
            <Route path='/user/reviews' element={<Reviews currentUser={currentUser} />} />

            {/* Redirect to the user profile by default */}
            <Route path='/user' element={<Navigate to='/user/profile' replace />} />
          </Route>

          {/* Redirect to the home page for any other route */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>

        {/* Footer component */}
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
