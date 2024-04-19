import { useState, useRef, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useSessionsAPI from "../api/useSessionsAPI";
import useDialog from "../hooks/useDialog";
import LogInDialog from "../dialogs/LogInDialog";
import SignUpDialog from "../dialogs/SignUpDialog";
import profileIcon from "../../assets/profile-icon.svg";
import notificationIcon from "../../assets/notification-icon.svg";
import cartIcon from "../../assets/cart-icon.svg";
import "./navigation.css";

export default function Navigation({ currentUser }) {
  // Ref for options container
  const optionsContainer = useRef();
  // Hoor for query parameters
  const [searchParams] = useSearchParams();
  // Hook for programmatic navigation
  const navigate = useNavigate();
  // Hook for accessing the current location
  const location = useLocation();
  // State for the search keyword
  const [searchKeyword, setSearchKeyword] = useState(getKeywordOnParams());
  // Custom hooks for login and sign-up dialogs
  const logInDialog = useDialog();
  const signUpDialog = useDialog();
  const { deleteSession } = useSessionsAPI();

  // Clear the keyword when navigating away from the results page
  useEffect(() => {
    if (location.pathname !== "/results") {
      setSearchKeyword("");
    }
  }, [location]);

  // Returns keyword if available in query string
  function getKeywordOnParams() {
    let keyword = searchParams.get("keyword");
    if (keyword) {
      return keyword;
    } else {
      return "";
    }
  }

  // Handle pressing Enter key to trigger search
  function handleKeyPressEnter(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate("/results?keyword=" + searchKeyword);
    }
  }

  // Toggle visibility of account options
  function toggleOptionsVisibility(e) {
    optionsContainer.current.classList.toggle("hidden");
  }

  // Render account options based on user authentication status
  function renderAccountOptions() {
    if (currentUser) {
      return (
        <>
          <div className="nav-item" onClick={toggleOptionsVisibility}>
            <a>
              <img src={profileIcon} alt="profile-icon" />
            </a>
            <section
              className="options-wrapper flex-column box-shadow hidden"
              ref={optionsContainer}
              onMouseLeave={toggleOptionsVisibility}
            >
              <Link to="/user/profile">My Account</Link>
              <Link to="/user/orders">My Purchases</Link>
              <a onClick={deleteSession}>Logout</a>
            </section>
          </div>
          <div className="nav-item">
            <a>
              <img src={notificationIcon} alt="notification-icon" />
            </a>
          </div>
          <div className="nav-item cart">
            <Link to="/cart">
              <img src={cartIcon} alt="cart-icon" />
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="nav-item">
            <a onClick={logInDialog.show}>Log In</a>
            <LogInDialog
              logInDialog={logInDialog}
              signUpDialog={signUpDialog}
            />
          </div>
          <a>|</a>
          <div className="nav-item">
            <a onClick={signUpDialog.show}>Sign Up</a>
            <SignUpDialog
              logInDialog={logInDialog}
              signUpDialog={signUpDialog}
            />
          </div>
        </>
      );
    }
  }

  // Main navigation component
  return (
    <nav className="navigation flex-row justify-center align-center">
      <Link to="/">
        <h1 className="nav-icon">Seed Mart</h1>
      </Link>
      <div className="search-wrapper flex-row align-center">
        <input
          type="text"
          onKeyDown={handleKeyPressEnter}
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />
        <button onClick={() => navigate("/results?keyword=" + searchKeyword)}>
          Search
        </button>
      </div>
      <div className="nav-options flex-row">{renderAccountOptions()}</div>
    </nav>
  );
}
