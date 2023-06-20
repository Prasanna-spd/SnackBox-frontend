import React, { useState, useRef, useEffect } from "react";
import { useDispatchCart, useCart } from "./contextReducer";

export default function Body(props) {
  let dispatch = useDispatchCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  let data = useCart();
  let priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItems;

  const handleAddtocart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
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

    // console.log(data);
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem" }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "140px", objectFit: "inherit" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>

          <div className="container w-100">
            <select
              className="m-2 h-100  rounded "
              onChange={(e) => setQty(e.target.value)}
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
              onChange={(e) => setSize(e.target.value)}
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
            onClick={handleAddtocart}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}
