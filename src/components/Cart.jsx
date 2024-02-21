import React, { useContext } from "react";
import { myContext } from "../App";

const Cart = () => {
  const [productList, setProductList] = useContext(myContext);
  const handleAdd = (id, quantity) => {
    setProductList((preData) => {
      return preData.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 || quantity + 1 };
        }
        return item;
      });
    });
  };
  const handleReduce = (id, quantity) => {
    setProductList((preData) => {
      return preData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: Math.max(0, item.quantity - 1 || quantity - 1),
          };
        }
        return item;
      });
    });
  };
  const handleRemove = (id) => {
    setProductList((preData) => preData.filter((item) => item.id !== id));
  };
  const totalPrice = productList.reduce(
    (total, productList) =>
      total + productList.price * (productList.quantity || 1),
    0
  );
  const totalQty = productList.reduce(
    (total, productList) => total + (productList.quantity || 1),
    0
  );
  const price = productList.reduce(
    (acc, productList) => productList.price * (productList.quantity || 1)
  );
  return (
    <>
      <div className="container-fluid h-10 sticky-top">
        <ul>
          <li>
            <h2 className="">Cart</h2>
          </li>
          <li className="qty">
            <b>Total Qty:</b> {totalQty}
          </li>
          <li className="price">
            <b>Total Price:</b> ${totalPrice}
          </li>
          <li>
            <button className="btn btn-primary">
              <span className="d-none d-lg-block">Make Payment</span>
            </button>
          </li>
        </ul>
      </div>
      <div className="container mt-5">
        {productList.map((item) => (
          <div className="card p-5 mb-5 " key={item.id}>
            <div className="row">
              <div className="col-md-4 col-sm-12">
                <img
                  src={item.thumbnail}
                  className="card-img-top h-50 mt-5"
                  alt="..."
                />
              </div>
              <div className="card-body col-md-8 col-sm-12">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <h4 className="card-title">{item.title}</h4>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">
                      <b>Brand:</b> {item.brand}
                    </p>
                    <p className="card-text">
                      <span className="stock"> In Stock: {item.stock}</span>
                    </p>
                    <p className="card-text">
                      {" "}
                      <b>Rating: {item.rating}</b>
                    </p>

                    <div className="stars" id="stars">
                      <span className="star1" data-value="1">
                        &#9733;
                      </span>
                      <span className="star2" data-value="2">
                        &#9733;
                      </span>
                      <span className="star3" data-value="3">
                        &#9733;
                      </span>
                      <span className="star4" data-value="4">
                        &#9733;
                      </span>
                      <span className="star5" data-value="5">
                        &#9733;
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 text-end mb-5 ">
                    <h5>${item.price}</h5>
                    <button
                      className="btn btn-outline-danger"
                      style={{ marginRight: "8px" }}
                      onClick={() => handleReduce(item.id, item.quantity || 1)}
                    >
                      -
                    </button>
                    {item.quantity || 1}
                    <button
                      className="btn btn-outline-success"
                      style={{ marginLeft: "8px" }}
                      onClick={() => handleAdd(item.id, item.quantity || 1)}
                    >
                      +
                    </button>
                    <div className="d-flex justify-content-end mt-5">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <hr />
                <div className="d-flex justify-content-between">
                  <h6>Discount: </h6>
                  <h6>{item.discountPercentage} %</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="d-block d-sm-none">Total :</h6>
                  <h6 className="d-block d-sm-none">
                    {" "}
                    ${item.price * (item.quantity || 1)}.00
                  </h6>
                  <h3 className="d-none d-sm-block">Total :</h3>
                  <h3 className="d-none d-sm-block">
                    {" "}
                    ${item.price * (item.quantity || 1)}.00
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
