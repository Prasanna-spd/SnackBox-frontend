import React, { useEffect, useState } from "react";
import Footer from "../footer";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../services/helper";

export default function MyOrder() {
  const [orderData, setorderData] = useState("");

  const fetchMyOrder = async () => {
    // console.log(localStorage.getItem("userEmail"));
    await fetch(`${BASE_URL}/api/myorderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setorderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);
  return (
    <div>
      <div className="navbaaar navbar-additional">
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {orderData !== {}
            ? Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <div className="d-flex justify-content-center align-items-center flex-column">
                              {arrayData.Order_date && (
                                <>
                                  <div className="m-4">
                                    {/* <button></button> */}
                                    <Link to="/timeline">
                                      <button
                                        type="button"
                                        class="btn btn-success"
                                      >
                                        {arrayData.Order_date}
                                      </button>
                                    </Link>
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        });
                      })
                  : "";
              })
            : ""}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
