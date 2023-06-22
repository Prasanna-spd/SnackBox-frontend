import React, { Component } from "react";
import "./wwwtimeline.css";

// import Header from "../header";
// import Content from "../content";

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
    await fetch("http://localhost:5000/api/myorderData", {
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
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { orderData } = this.state;
    // console.log(orderData);

    return (
      <>
        <div className="wrapper">
          <div className="center-line">
            <a href="." className="scroll-icon">
              <i className="fas fa-caret-up"></i>
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
                          return (
                            <>
                              <div className="row row-1">
                                <section>
                                  <i className="icon fas fa-home"></i>
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
                                    <span>1st Jan 2021</span>
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
                              <div className="row row-2">
                                <section>
                                  <i className="icon fas fa-star"></i>
                                  <div className="details">
                                    <span className="title">
                                      Title of Section 2
                                    </span>
                                    <span>2nd Jan 2021</span>
                                  </div>
                                  <p>
                                    Lorem ipsum dolor sit ameters consectetur
                                    adipisicing elit. Sed qui veroes praesentium
                                    maiores, sint eos vero sapiente voluptas
                                    debitis dicta dolore.
                                  </p>
                                  <div className="bottom">
                                    <a href=".">Read more</a>
                                    <i>- Someone famous</i>
                                  </div>
                                </section>
                              </div>
                            </>
                          );
                        });
                      })
                  : "";
              })
            : ""}
        </div>
      </>
    );
  }
}

export default Timeline;
