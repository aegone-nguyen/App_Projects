import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart(props) {
  const { proData, productInCart, setProductInCart } = props;
  const [cartDatas, setCardDatas] = useState([]);

  let totalAll = 0;

  const changeAmount = (productId, changeNumber) => {
    setProductInCart(
        productInCart.map((cdata) =>
          cdata.id === productId
            ? {
                ...cdata,
                amount: cdata.amount + changeNumber,
              }
            : cdata
        )
      );
  };

  useEffect(() => {
    let cartData = [];
    proData.map((data) => {
      productInCart.map((pro) => {
        let totalPrice = data.text * pro.amount;
        if (data.id === pro.id) {
          cartData.push({ ...data, amount: pro.amount, total: totalPrice });
        }
      });
    });
    setCardDatas(cartData);
  }, [productInCart]);
  useEffect(()=>{
    cartDatas.map((cds)=>{
        totalAll = totalAll + cds.total
    })
  },[cartDatas])
  return (
    //Navbar
    <div>
      <nav
        className="navbar navbar-expand-sm bg-dark navbar-dark"
        style={{ fontSize: "20px" }}
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/">
              <h4 className="nav-link">Home</h4>
            </Link>
          </li>
          <li className="nav-item" style={{ marginLeft: "1300px" }}>
            <Link to="/cart">
              <h4 className="nav-link" style={{ color: "white" }}>
                Cart
              </h4>
            </Link>
          </li>
        </ul>
      </nav>
      <h1>Your Cart: </h1>
      <table className="table" style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cartDatas.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.title}</td>
                <td>
                  <img
                    style={{ width: "100px" }}
                    src={data.src}
                  />
                </td>
                <td>{data.text}$</td>
                <td>
                  <button
                    onClick={() => data.amount > 0 ? changeAmount(data.id, -1): null}
                  >
                    -{" "}
                  </button>{" "}
                  {data.amount}{" "}
                  <button
                    onClick={() => {
                      changeAmount(data.id, 1);
                    }}
                  >
                    +{" "}
                  </button>
                </td>
                <td>{data.total}$</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
        {/* <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
                {totalAll}
            </th>
          </tr> */}
        </tfoot>
      </table>
    </div>
  );
}

export default Cart;
