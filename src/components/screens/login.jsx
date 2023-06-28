import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { BASE_URL } from "../../services/helper";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [Oauser, setOaUser] = useState(null);
  let navigate = useNavigate();
  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${BASE_URL}/api/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const data = await response.json();

    console.log(data);
    if (!data.success) {
      alert("Enter Valid Credentials");
    } else if (data.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", data.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const getUser = async () => {
    const sessionResponse = await fetch(`${BASE_URL}/auth/login/success`, {
      method: "GET",
      // credentials: "include",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const sessionData = await sessionResponse.json();

    if (sessionData.success) {
      localStorage.setItem("sessionId", sessionData.sessionId);
      localStorage.setItem("userEmail", sessionData.email);
      setOaUser(sessionData.user);
    }
    // .then(async (response) => {
    //   if (response.status === 200) {
    //     return response.json().then((milla) => {
    //       localStorage.setItem("sessionId", milla.sessionId);
    //       localStorage.setItem("userEmail", milla.email);
    //       console.log(response);
    //       return milla;
    //     });
    //   }
    //   throw new Error("authentication has been failed!");
    // })

    // .then((resObject) => {
    //   setOaUser(resObject.user);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    console.log("hello", `${BASE_URL}/auth/login/success`);
  };

  console.log("hello", Oauser, `${BASE_URL}/auth/login/success`);
  getUser();

  return (
    <div>
      <div className="navbaaar">
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
              <button type="submit" className="m-3 btn btn-primary">
                Submit
              </button>
              <Link to="/createUser" className="m-3 btn btn-danger">
                I am a new user
              </Link>
            </form>
            <div className="col-sm-4 col-md-6">
              <div className="card">
                <div className="card-body d-flex align-items-center">
                  <i className="fab fa-google m-2"></i>
                  <Link
                    className="btn btn-block"
                    to={`${BASE_URL}/auth/google`}
                    role="button"
                  >
                    Sign In with Google
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
