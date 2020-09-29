import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Product.css';
import { detailsProduct } from '../../actions/product.action';

const ProductPage = (props) => {
    const [qty, setQty] = useState();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, product, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {

        };
    }, []);

    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + "?qty" + qty)
    }

    return <div className="Product">
        <Link to="/"><div className="button back-button">Back to result</div></Link>
        {loading ? <div>Loading...</div> : 
        error ? <div>{error}</div> : 
        <div className="product-details">
            <div className="details-image">
                <img src={product.image} alt="product-image"/>
            </div>
            <div className="details-info">
                <div className="details-name">{product.name}</div>
                <div className="details-brand">{product.brand}</div>
                <div className="details-rating">{product.rating} ({product.numberReviews} Reviews)</div>
                <div className="details-price">{product.price} $</div>
                <div className="details-quantity">{product.quantityStock > 0 ? "Product available" : "Product unavailable"} ({product.quantityStock} Pieces)</div>
                <div className="details-action">  
                    <div className="details-qty">
                        <button className="details-button" disabled={true}>-</button>
                        <input className="details-input" type="number" name="qty" value={qty} onChange={(e) => { setQty(e.target.value) }} />
                        <button className="details-button" disabled={product.quantityStock < 0 ? true : false}>+</button>
                    </div>
                    <button className="button wide" onClick={handleAddToCart}>Add to Cart</button>
                    
                </div>
            </div>
        </div>
        }
    </div>
}

export default ProductPage;