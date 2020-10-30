import express from 'express';
import Order from '../models/order.model.js';
import { isAuth } from '../util.js';

const router = express.Router();

router.post('/', isAuth, async (req,res) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send({ msg: 'Cart is empty' });
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res.status(201).send({ msg: 'New order created', order: createdOrder });
    }
})

export default router;