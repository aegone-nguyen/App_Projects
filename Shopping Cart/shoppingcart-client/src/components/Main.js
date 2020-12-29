import React from 'react';
import { Link } from 'react-router-dom';

function Main(props) {
    const {proData,productInCart, setProductInCart} = props;

    const addToCart = (productId, productName, productAmount) => {
        let cartValue = {id: productId, amount: productAmount};
        let cart = [...productInCart];
        // if (cart.length == 0) {
        //     cart.push(cartValue);
        // }
        let exitsProduct = cart.some(ele => ele.id === cartValue.id);
        if (!exitsProduct) {
            cart.push(cartValue);
        }else{
            cart.map((c)=>{
                if (c.id === cartValue.id) {
                    return c.amount++;
                }
            })
        }
        setProductInCart(cart);
        alert(`${productName} has been add to Cart`)
    }


    return (
<div>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark" style={{fontSize:'20px'}}>
        <ul className="navbar-nav">
            <li className="nav-item">
                <Link to="/">
                    <h4 className="nav-link" style={{color:"white"}}>Home</h4>
                </Link>
            </li>
            <li className="nav-item" style={{marginLeft:"1300px"}}>
                <Link to="/cart">
                    <h4 className="nav-link">Cart</h4>
                </Link>
            </li>
        </ul>
    </nav>
    <h2>Choose Your Product:</h2>
    <div className="row" style={{marginLeft:"40px", marginTop:"50px"}}>
        {
            proData.map((data)=>{
                return(
                <div key={data.id} className="card" style={{width:"300px", marginLeft:"50px", marginTop:"30px"}}>
                    <img className="card-img-top" style={{height:"250px"}} src={data.src}/>
                    <div className="card-body" style={{textAlign:"center"}}>
                        <h4 className="card-title">{data.title}</h4>
                        <h6 className="card-text">Price: {data.text}$</h6>
                    </div>
                    <div className="card-footer"  style={{textAlign:"center"}}>
                        <button onClick={() => addToCart(data.id, data.title, data.amount)} className="btn btn-success">Add To Cart</button>
                    </div>
                </div>
                )
            })
        }
        
    </div> 
</div>
    );
}

export default Main;