import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { BASE_URL } from "../../services/helper";

export default function Signup() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/api/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const data = await response.json();

    // console.log(data);
    if (!data.success) {
      alert("Enter Valid Credentials");
    } else {
      navigate("/login");
    }
  };
  // console.log(credentials);

  return (
    <>
      <div className="navbaaar navbar-additional">
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg"
              className="img-fluid"
              alt="Food"
              style={{ height: "100vh", width: "100%" }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlfor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={credentials.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="geolocation"
                  value={credentials.geolocation}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className=" m-3 btn btn-primary"
                style={{ background: "#0d6efd" }}
              >
                Submit
              </button>
              <Link to="/login" className="m-3 btn btn-danger">
                Already a user
              </Link>
            </form>
            <div className="col-sm-4 col-md-6">
              <div className="card social-block">
                <div className="card-body d-flex align-items-center">
                  <i className="fab fa-google m-2"></i>
                  <Link
                    className="btn btn-block"
                    to={`${BASE_URL}/api/auth/google`}
                    role="button"
                  >
                    Sign Up with Google
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
