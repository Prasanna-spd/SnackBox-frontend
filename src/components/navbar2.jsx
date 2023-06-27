import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./contextReducer";
import Modal from "../Modal";
import Cart from "./screens/cart";

export default function Navbar2({ allowHim }) {
  let data = useCart();
  const [cartView, setcartView] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  let content;
  if (
    !localStorage.getItem("authToken") &&
    !localStorage.getItem("sessionId")
  ) {
    content = (
      <div className="d-flex">
        <Link className="btn bg-white text-success mx-1" to="/createUser">
          Sign-Up
        </Link>
        <Link className="btn bg-white text-success mx-1" to="/login">
          Login
        </Link>
      </div>
    );
  } else {
    content = (
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
          to="/login"
          onClick={handleLogout}
        >
          Logout
        </Link>
      </div>
    );
  }
  console.log(content);

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg "
        style={{ backgroundColor: "#414345" }}
      >
        <div className="container-fluid ">
          <Link
            className="navbar-brand fs-3 fst-italic"
            style={{ color: "#198754" }}
            to="/"
          >
            Eat N Drink
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
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                  style={{ color: "#198754" }}
                >
                  Home
                </Link>
              </li>

              {localStorage.getItem("authToken") ? (
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/myOrder"
                  style={{ color: "#198754" }}
                >
                  MyOrders
                </Link>
              ) : null}
            </ul>
            {content}
          </div>
        </div>
      </nav>
    </div>
  );
}
