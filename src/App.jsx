import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useDialog from "./src/hooks/useDialog";
import useSessionsAPI from "./src/api/useSessionsAPI";
import Navigation from "./src/navigation/Navigation";
import HomePage from "./src/homepage/HomePage";
import ResultsPage from "./src/resultspage/ResultsPage";
import ItemPage from "./src/itempage/ItemPage";
import CartPage from "./src/cartpage/CartPage";
import CheckOutPage from "./src/checkoutpage/CheckOutPage";
import UserPage from "./src/userpage/UserPage";
import Footer from "./src/footer/Footer";
import Profile from "./src/userpage/Profile";
import Addresses from "./src/userpage/Addresses";
import PaymentMethods from "./src/userpage/PaymentMethods";
import Orders from "./src/userpage/Orders";
import LogInDialog from "./src/dialogs/LogInDialog";
import SignUpDialog from "./src/dialogs/SignUpDialog";

function App() {
  // State for the current user and search API
  const [currentUser, setCurrentUser] = useState(null);
  const { getUser } = useSessionsAPI();

  // State for pop-up notifications
  const [popUps, setPopUps] = useState([]);

  const logInDialog = useDialog();
  const signUpDialog = useDialog();
  const [errorMessage, setErrorMessageState] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();
      if (user) {
        setCurrentUser(user);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (logInDialog.status == "closed" && signUpDialog.status == "closed") {
      setErrorMessage(null);
    }
  }, [logInDialog.status, signUpDialog.status]);

  function createPopUp(message, isWarning = false) {
    const warningStyles = {
      border: "2px solid var(--accent)",
      color: "var(--accent)",
    };
    const newPopUp = (
      <div
        key={message}
        className="pop-up-notification"
        style={isWarning ? warningStyles : {}}
      >
        {message}
      </div>
    );
    setTimeout(() => {
      setPopUps((prevPopUps) => prevPopUps.slice(1)); // Remove the first item
    }, 3000);
    setPopUps((prevPopUps) => [...prevPopUps, newPopUp]);
  }

  function validateUser(component) {
    if (!currentUser) {
      return <Navigate to="/" />;
    } else {
      return component;
    }
  }

  function setErrorMessage(message, type = "error") {
    const color =
      type == "error" ? "rgba(255, 0, 25, 0.608)" : "rgba(0, 158, 66, 0.856)";
    setErrorMessageState(
      <div className="error-message" style={{ color: color }}>
        {message}
      </div>
    );
  }

  return (
    <>
      <div className="pop-up-container flex-column align-center">{popUps}</div>
      {/* Set up BrowserRouter for client-side navigation */}
      <BrowserRouter>
        {/* Navigation component with props */}
        <Navigation
          currentUser={currentUser}
          logInDialog={logInDialog}
          signUpDialog={signUpDialog}
        />

        {/* Define routes for different pages */}
        <Routes>
          {/* Home page */}
          <Route index element={<HomePage />} />

          {/* Results page with search functionality */}
          <Route path="/results?" element={<ResultsPage />} />

          {/* Item page for displaying details of a specific item */}
          <Route
            path="/show/:id"
            element={
              <ItemPage
                currentUser={currentUser}
                createPopUp={createPopUp}
                logInDialog={logInDialog}
                setErrorMessage={setErrorMessage}
              />
            }
          />

          {/* Cart page with current user data */}
          <Route
            path="/cart"
            element={validateUser(
              <CartPage
                currentUser={currentUser}
                createPopUp={createPopUp}
                logInDialog={logInDialog}
                signUpDialog={signUpDialog}
              />
            )}
          />
          {/* Checkout page with current user data */}
          <Route
            path="/checkout"
            element={validateUser(
              <CheckOutPage
                currentUser={currentUser}
                createPopUp={createPopUp}
              />
            )}
          />

          {/* User profile page with nested routes for different sections */}
          <Route
            path="/user"
            element={validateUser(<UserPage currentUser={currentUser} />)}
          >
            <Route
              path="/user/profile"
              element={
                <Profile currentUser={currentUser} createPopUp={createPopUp} />
              }
            />
            <Route
              path="/user/addresses"
              element={<Addresses currentUser={currentUser} />}
            />
            <Route
              path="/user/payment-methods"
              element={<PaymentMethods currentUser={currentUser} />}
            />
            <Route
              path="/user/orders"
              element={<Orders currentUser={currentUser} />}
            />
            {/* Redirect to the user profile by default */}
            <Route
              path="/user"
              element={<Navigate to="/user/profile" replace />}
            />
          </Route>

          {/* Redirect to the home page for any other route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Footer component */}
        <Footer />
      </BrowserRouter>
      {currentUser && (
        <>
          <LogInDialog
            logInDialog={logInDialog}
            signUpDialog={signUpDialog}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
          <SignUpDialog
            logInDialog={logInDialog}
            signUpDialog={signUpDialog}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </>
      )}
    </>
  );
}

export default App;
