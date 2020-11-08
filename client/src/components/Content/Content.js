import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import AdminRoute from '../AdminRoute';
import './Content.css';

import { HomePage, WomenPage, MenPage, SalePage, AboutPage, SigninPage, RegisterPage, ManageProductsPage, ManageOrdersPage, ProductPage, CartPage, ShippingAddressPage, PaymentMethodPage, PlaceOrderPage, OrderPage, OrderHistoryPage, ProfilePage } from '../../pages';

const categoriesList = [
    {name: "Women", path: "/women"},
    {name: "Men", path: "/men"},
    {name: "Sale", path: "/sale"},
    {name: "About Us", path: "/about"}
]

const Content = () => {

    const categories = categoriesList.map(category => (
        <div><NavLink to={category.path} key={category.name}>{category.name}</NavLink></div>
    ))

    return (
        <main>
            <div className="main-categories">
                {categories}
            </div>
            <div className="main-wrapper">
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route path="/women" component={WomenPage} />
                    <Route path="/men" component={MenPage} />
                    <Route path="/sale" component={SalePage} />
                    <Route path="/about" component={AboutPage} />
                    <Route path="/signin" component={SigninPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/product/:id" component={ProductPage} />
                    <Route path="/cart/:id?" component={CartPage} />
                    <Route path="/shipping" component={ShippingAddressPage} />
                    <Route path="/payment" component={PaymentMethodPage} />
                    <Route path="/placeorder" component={PlaceOrderPage} />
                    <Route path="/order/:id" component={OrderPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <AdminRoute path="/manage-product" component={ManageProductsPage} />
                    <AdminRoute path="/manage-order" component={ManageOrdersPage} />
                </Switch>
            </div> 
        </main>
    )
}

export default Content; 