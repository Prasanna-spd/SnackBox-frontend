import React from "react";
import { Link } from "react-router-dom";

export default function footer() {
  return (
    <div>
      <footer
        className="d-flex  justify-content-between align-items-center py-2 text-light border-top m-3"
        // style={{ "backgroundColor": "#414345" }}
      >
        <div className="col-md-4 d-flex justify-content-between align-items-center ">
          <Link
            to="/"
            className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1 fs-3"
          >
            EAT-N-DRINK
          </Link>
        </div>
        <div className="mb-3 mb-md-0 text-light">© 2022 Eat N Drink. Inc</div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex me=2">
          <li className="ms-3">
            <Link className="text-muted" to="#">
              <i
                class="fa fa-twitter"
                style={{ fontSize: "48px", color: "black" }}
              ></i>
            </Link>
          </li>
          <li className="ms-3">
            <Link className="text-muted" to="#">
              <i
                class="fa fa-facebook-square"
                style={{ fontSize: "48px", color: "blue" }}
              ></i>
            </Link>
          </li>
          <li className="ms-3">
            <Link className="text-muted" to="#">
              <i
                class="fa fa-instagram"
                style={{ fontSize: "48px", color: "red" }}
              ></i>
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
