import React, { Component } from "react";
import "./wwwtimeline.css";
import Navbar from "../Navbar";
import Footer from "../footer";
import { BASE_URL } from "../../services/helper";

export class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: "",
    };
  }

  componentDidMount() {
    this.fetchMyOrder();
  }

  fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch(`${BASE_URL}/api/myorderData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        this.setState({ orderData: response });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { orderData } = this.state;
    let isRow2 = false;

    return (
      <>
        <div>
          <Navbar />
        </div>
        <div className="wrapper">
          <div className="center-line">
            <a href="." className="scroll-icon bg-dark">
              <i className="fas fa-caret-up "></i>
            </a>
          </div>
          {orderData !== {}
            ? Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          isRow2 = !isRow2;
                          return (
                            !arrayData.Order_date && (
                              <>
                                <div
                                  className={`row ${
                                    isRow2 ? "row-2" : "row-1"
                                  }`}
                                  key={arrayData.id}
                                >
                                  <section>
                                    <i className="icon fas fa-home bg-dark"></i>
                                    <div>
                                      <img
                                        src="https://media.istockphoto.com/photos/spicy-paneer-or-chilli-paneer-or-paneer-tikka-or-cottage-cheese-in-picture-id697316634?b=1&k=20&m=697316634&s=170667a&w=0&h=bctfHdYTz9q2dJUnuxGRDUUwC9UBWjL_oQo5ECVVDAs="
                                        className="card-img-top"
                                        alt="..."
                                        style={{
                                          height: "120px",
                                          objectFit: "fill",
                                        }}
                                      />
                                    </div>
                                    <div className="details">
                                      <span className="title">
                                        {arrayData.name}
                                      </span>
                                      {/* <span>1st Jan 2021</span> */}
                                    </div>
                                    <p>
                                      <span className="m-1">
                                        QTY:{arrayData.qty}
                                      </span>
                                      <span className="m-1">
                                        Size:{arrayData.size}
                                      </span>
                                    </p>
                                    {/* <span className="m-1">{data}</span> */}
                                    <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                      ₹ {arrayData.price}/-
                                    </div>
                                  </section>
                                </div>
                              </>
                            )
                          );
                        });
                      })
                  : "";
              })
            : ""}
        </div>
        <div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Timeline;
