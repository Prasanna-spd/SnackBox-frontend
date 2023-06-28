import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../footer";
import Body from "../body";
import { BASE_URL } from "../../services/helper";
// require("dotenv").config();

// import Carousel from "../carousel";

export default function Home() {
  const allowhim = 1;
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");
  const [Oauser, setOaUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    let response = await fetch(`${BASE_URL}/api/foodData`, {
      method: "POST",
      handlers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();

    setFoodItem(response[0]);
    setFoodCat(response[1]);
    setLoading(true);
    // console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  // useEffect(() => {

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

    if (sessionData.status === 200) {
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

  // }, []);
  useEffect(() => {
    getUser();
  }, []);
  console.log("hello", Oauser, `${BASE_URL}/auth/login/success`, loading);

  return (
    <div>
      <div className="navbaaar">
        <Navbar allowHim={allowhim} />
      </div>
      <div>
        <div
          id="carouselExample"
          class="carousel slide mt-4 d-flex justify-content-center align-items-center"
          style={{ height: "500px" }}
        >
          <div
            class="carousel-inner "
            id="carousel-size"
            style={{
              height: "100%",
            }}
          >
            <div
              class="carousel-caption d-none d-md-block"
              style={{ zIndex: "10" }}
            >
              <div class="d-flex justify-content-center" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>
            <div class="carousel-item active">
              <img
                src="https://source.unsplash.com/random/1520x400/?burger"
                class="d-block  "
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://source.unsplash.com/random/1520x400/?pizza"
                class="d-block w-100 "
                alt="..."
              />
            </div>
            <div class="carousel-item">
              <img
                src="https://source.unsplash.com/random/1520x400/?biryani"
                class="d-block w-100 "
                alt="..."
              />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              class="carousel-control-prev-icon bg-dark rounded-circle"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next "
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              class="carousel-control-next-icon bg-dark rounded-circle"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container ">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3" style={{ width: "100%" }}>
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>

                <hr />
                {foodItem !== [] ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Body
                            foodItems={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div>No data available</div>
                )}
              </div>
            );
          })
        ) : (
          <div>"""""""""""</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
