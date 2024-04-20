import { Link, Outlet } from "react-router-dom";
import "./user-page.css";

export default function UserPage({ currentUser }) {
  return (
    <>
      <div className="full-height flex-column">
        <div className="user-page flex-row justify-center">
          <section className="user-options">
            <Link to="/user/profile">
              <p>Profile</p>
            </Link>
            <Link to="/user/addresses">
              <p>Addresses</p>
            </Link>
            <Link to="/user/payment-methods">
              <p>Payment Methods</p>
            </Link>
            <Link to="/user/orders">
              <p>Orders</p>
            </Link>
          </section>
          <section className="options-section box-shadow">
            <Outlet />
          </section>
        </div>
      </div>
    </>
  );
}
