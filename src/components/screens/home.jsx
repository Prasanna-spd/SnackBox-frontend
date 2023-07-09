import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../footer";
import Body from "../body";
import { BASE_URL } from "../../services/helper";

export default function Home() {
  const allowhim = 1;

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("sessionId");
  const userEmail = urlParams.get("userEmail");

  if (sessionId && userEmail) {
    localStorage.setItem("sessionId", sessionId);
    localStorage.setItem("userEmail", userEmail);
  }

  console.log("hello", `${BASE_URL}/auth/login/success`);

  return (
    <div>
      <div className="main-image" style={{ position: "relative" }}>
        <div className="navbaaar" style={{ position: "absolute" }}>
          <Navbar allowHim={allowhim} />
        </div>
        <img
          src="https://b.zmtcdn.com/web_assets/81f3ff974d82520780078ba1cfbd453a1583259680.png"
          alt=""
        />
        <div className="text-overlay">
          <h1 className="slanted-text">Snack-Box</h1>
          <p className="spread-text">Fill your box as well as cravings</p>
        </div>
        <div
          class="d-flex justify-content-center searchbar-overlay"
          role="search"
          style={{ position: "absolute" }}
        >
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

      {loading ? (
        <div className="container">
          <h1>LOADING..........</h1>
        </div>
      ) : (
        <div className="container">
          {foodCat.length !== 0 ? (
            foodCat.map((data) => {
              return (
                <div className="row mb-3" style={{ width: "100%" }}>
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem.length !== 0 ? (
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
            <div>No categories available</div>
          )}
        </div>
      )}

      <div>
        <Footer />
      </div>
    </div>
  );
}
