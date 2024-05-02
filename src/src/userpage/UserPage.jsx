import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./user-page.css";
import profilePicPlaceholder from "../../assets/placeholder-profile-pic.png";

export default function UserPage({ currentUser }) {
  const userOptions = useRef();
  const optionsOutlet = useRef();
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth <= 800) {
      openOption();
    }
  });

  function openOption() {
    userOptions.current.style.display = "none";
    optionsOutlet.current.style.display = "block";
  }

  function closeOption() {
    optionsOutlet.current.style.display = "none";
    userOptions.current.style.display = "block";
  }

  function renderLocation() {
    const currentLocation = location.pathname.split("/")[2];
    return (
      <p>
        {currentLocation.charAt(0).toUpperCase() + currentLocation.slice(1)}
      </p>
    );
  }

  return (
    <>
      <div className="full-height flex-column">
        <div className="user-page flex-row justify-center">
          <section className="user-options" ref={userOptions}>
            <div className="profile-banner flex-row align-center">
              <img src={profilePicPlaceholder} alt="placeholder-profile-pic" />
              <div>
                <p>{currentUser.name}</p>
                <i>{currentUser.email}</i>
              </div>
            </div>
            <Link to="/user/profile">
              <p>Profile</p>
            </Link>
            <Link to="/user/addresses">
              <p>Addresses</p>
            </Link>
            <Link to="#">
              <p>Payment Methods</p>
            </Link>
            <Link to="/user/orders">
              <p>Orders</p>
            </Link>
          </section>
          <section className="options-outlet" ref={optionsOutlet}>
            <div className="user-settings-location">
              <button onClick={closeOption}>↩</button>
              {renderLocation()}
            </div>
            <Outlet />
          </section>
        </div>
      </div>
    </>
  );
}
