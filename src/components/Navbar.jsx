import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./contextReducer";
import Modal from "../Modal";
import Cart from "./screens/cart";
import { BASE_URL } from "../services/helper";
import { toast } from "react-hot-toast";

export default function Navbar({ allowHim }) {
  let data = useCart();
  const [cartView, setcartView] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("sessionId");
    window.location.href = `${BASE_URL}/auth/logout`;
    navigate("/login");
    toast.success("Logged Out Successfully.");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid ">
          <Link
            className="navbar-brand fs-3 fst-italic"
            to="/"
            style={{ color: "white", fontWeight: "lighter" }}
          >
            Snack-Box
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNavDropdown">
            <ul className="navbar-nav me-auto " style={{ margin: "0.5rem" }}>
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                  style={{ color: "white", fontWeight: "lighter" }}
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ||
              localStorage.getItem("sessionId") ? (
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/myOrder"
                  style={{ color: "white", fontWeight: "lighter" }}
                >
                  MyOrders
                </Link>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") &&
            !localStorage.getItem("sessionId") ? (
              <div className="d-flex" style={{ margin: "0.5rem" }}>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createUser"
                >
                  Sign-Up
                </Link>

                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <div
                  className="btn bg-white text-success mx-1"
                  onClick={() => {
                    setcartView(true);
                  }}
                >
                  MyCart
                  <span
                    style={{
                      verticalAlign: "super",
                      margin: "5px",
                      padding: "4px",
                      backgroundColor: "#198754",
                      borderRadius: "9px",
                      color: "white",
                    }}
                  >
                    {data.length}
                  </span>
                </div>
                {cartView ? (
                  <Modal onClose={() => setcartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}

                <Link
                  className="btn bg-white text-danger mx-1"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
