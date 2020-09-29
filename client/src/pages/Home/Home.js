import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Home.css';
import { listProducts } from '../../actions/product.action';

const HomePage = () => {

    const productsList = useSelector(state => state.productsList);
    const { loading, products, error } = productsList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());

        return () => {
            
          };

    }, [])

    return loading ? <div>Loading...</div> : 
    error ? <div>{error}</div> : 
        <div className="Home">
                <h1 className="title">Top rated products</h1>
                    <ul className="products-container">
                        {
                            products.map(product => 
                                <li key={product._id}>
                                    <Link to={'/product/' + product._id}>
                                        <div className="product">
                                            <div className="product-image"><img src={product.image} alt="product" /></div>
                                            <div className="product-info">
                                                <div className="product-name">{product.name}</div>
                                                <div className="product-brand">{product.brand}</div>
                                                <div className="product-price">{product.price} $</div>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                                )
                        }
                    </ul>
        </div>
        
    
}

export default HomePage; 