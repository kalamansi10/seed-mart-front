import { useState, useRef, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useSessionsAPI from "../api/useSessionsAPI";
import seedmartLogo from "../../assets/seedmart-logo.png";
import profileIcon from "../../assets/profile-icon.png";
import notificationIcon from "../../assets/notification-icon.png";
import cartIcon from "../../assets/cart-icon.png";
import "./navigation.css";

export default function Navigation({ currentUser, logInDialog, signUpDialog }) {
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
      closeMobileNav();
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
          <li className="nav-item" onClick={toggleOptionsVisibility}>
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
          </li>
          <li className="nav-item">
            <a>
              <img src={notificationIcon} alt="notification-icon" />
            </a>
          </li>
          <li className="nav-item cart">
            <Link to="/cart">
              <img src={cartIcon} alt="cart-icon" />
            </Link>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <a onClick={logInDialog.show}>Log In</a>
          </li>
          <li className="nav-item">
            <a onClick={signUpDialog.show}>Sign Up</a>
          </li>
        </>
      );
    }
  }

  function renderMobileOptions() {
    const searchWrapper = (
      <div className="search-wrapper-mobile">
        <input
          type="text"
          onKeyDown={handleKeyPressEnter}
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />
        <button
          onClick={() => {
            navigate("/results?keyword=" + searchKeyword);
            closeMobileNav();
          }}
        >
          Search
        </button>
      </div>
    );
    if (currentUser) {
      return (
        <ul className="nav-item-mobile">
          {searchWrapper}
          <li onClick={closeMobileNav}>
            <Link to="/user/profile">Profile</Link>
          </li>
          <li onClick={closeMobileNav}>
            <Link to="/user/orders">Purchases</Link>
          </li>
          <li onClick={closeMobileNav}>
            <Link to="#">Notifications</Link>
          </li>
          <li onClick={closeMobileNav}>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <a onClick={deleteSession}>Logout</a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="nav-item-mobile">
          {searchWrapper}
          <li onClick={closeMobileNav}>
            <a onClick={logInDialog.show}>Log In</a>
          </li>
          <li onClick={closeMobileNav}>
            <a onClick={signUpDialog.show}>Sign Up</a>
          </li>
        </ul>
      );
    }
  }

  function closeMobileNav() {
    document.getElementById("nav-toggle").checked = false;
  }

  // Main navigation component
  return (
    <nav className="navigation">
      <Link to="/">
        <img className="nav-logo" src={seedmartLogo} alt="seedmartLogo" />
      </Link>
      <div className="search-wrapper">
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
      <ul className="nav-options">{renderAccountOptions()}</ul>
      <input type="checkbox" id="nav-toggle" />
      <div className="burger-wrapper">
        <label htmlFor="nav-toggle">
          <div className="burger">
            <i>Menu</i>
          </div>
        </label>
      </div>
      {renderMobileOptions()}
    </nav>
  );
}
