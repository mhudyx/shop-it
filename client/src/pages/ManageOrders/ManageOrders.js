import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listOrderst } from '../../actions/order.action';
import './ManageOrders.css';

const ManageOrdersPage = (props) => {

    const orderList = useSelector((state) => state.orderList);
    const { loading, orders, error } = orderList;

    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(listOrders());
    }, [dispatch]);

    const deleteHandler = (order) => {
      // TODO: delete handler
    };

    return (
      <div className="manage-orders">
        <h1>Orders</h1>
        {loading ? <div>Loading...</div> : (
          <div className="orders-list">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                        <td className="wide-td">
                            <button className="button small" onClick={() => { props.history.push('/order/' + order._id) } }>Details</button>
                            <button className="button small" onClick={() => deleteHandler(order)}>Delete</button>
                        </td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
          </div>
        )}
      
        
      </div>
    )

}

export default ManageOrdersPage;