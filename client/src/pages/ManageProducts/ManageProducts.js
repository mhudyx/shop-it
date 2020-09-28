import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ManageProducts.css';
import { listProducts, saveProduct, deleteProduct } from '../../actions/product.action';

const ManageProductsPage = () => {

    const [modal, setModal] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [quantityStock, setQuantityStock] = useState('');
    const productsList = useSelector(state => state.productsList);
    const { loading, products, error } = productsList;
    
    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if(successSave) {
            setModal(false);
        }
        dispatch(listProducts());
        return () => {
            
        };
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setModal(true);
        setId(product._id);
        setName(product.name);
        setType(product.type);
        setCategory(product.category);
        setImage(product.image);
        setPrice(product.price);
        setBrand(product.brand);
        setQuantityStock(product.quantityStock);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({ _id: id, name, type, category, image, price, brand, quantityStock }));
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    }

    return <div className="manage-product">
        <div className="product-header">
            <h3>Products</h3>
            <button className="button" onClick={() => openModal({})}>Create Product</button>
        </div>
    {modal &&
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>{id ? 'Update Product' : 'Create Product'}</h2>
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="type">
                            Type
                        </label>
                        <input type="text" name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="category">
                            Category
                        </label>
                        <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="image">
                            Image
                        </label>
                        <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="brand">
                            Brand
                        </label>
                        <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="quantityStock">
                            Quantity in stock
                        </label>
                        <input type="text" name="quantityStock" id="quantityStock" value={quantityStock} onChange={(e) => setQuantityStock(e.target.value)}/>
                    </li>
                    <li>
                        <button type="submit" className="button wide">{id ? 'Update' : 'Create'}</button>
                    </li>
                    <li>
                        <button type="button" className="button wide empty" onClick={() => setModal(false)}>Back</button>
                    </li>
                </ul>
            </form>
        </div>
    }
        

        <div className="products-list">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.type}</td>
                        <td>{product.category}</td>
                        <td className="wide-td">
                            <button className="button small" onClick={() => openModal(product)}>Edit</button>
                            <button className="button small" onClick={() => deleteHandler(product)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
        </div>
    </div>
}

export default ManageProductsPage;