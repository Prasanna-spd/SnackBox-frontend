import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./contextReducer";
import { useNavigate } from "react-router-dom";

export default function Body(props) {
  const dispatch = useDispatchCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const data = useCart();
  let navigate = useNavigate();
  const priceRef = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.foodItems;

  const handleClick = () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  };

  const handleQty = (e) => {
    setQty(e.target.value);
  };

  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleAddToCart = async () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    } else {
      let food = [];
      for (const item of data) {
        if (item.id === foodItem._id && item.size === size) {
          food = item;

          break;
        }
      }

      if (food !== []) {
        if (food.size === size) {
          await dispatch({
            type: "UPDATE",
            id: foodItem._id,
            size: size,
            price: finalPrice,
            qty: qty,
          });
          console.log(food);
          return;
        } else if (food.size !== size) {
          await dispatch({
            type: "ADD",
            id: foodItem._id,
            name: foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
          });

          return;
        }
        return;
      }

      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };

  const finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "100%" }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "190px", objectFit: "inherit" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>

          <div className="container w-100">
            <select
              className="m-2 h-100  rounded "
              onClick={handleClick}
              onChange={handleQty}
              style={{ backgroundColor: "#0d6efd" }}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  rounded "
              onClick={handleClick}
              onChange={handleOptions}
              ref={priceRef}
              style={{ backgroundColor: "#0d6efd" }}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">Rs{finalPrice}/-</div>
          </div>
          <hr />
          <div
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}
