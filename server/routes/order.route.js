import e from 'express';
import express from 'express';
import Order from '../models/order.model.js';
import { isAuth, isAdmin } from '../util.js';

const router = express.Router();

router.post('/', isAuth, async (req,res) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
            createdAt: Date.now(),
        });
        const createdOrder = await order.save();
        res.status(201).send({ message: 'New order created', order: createdOrder });
    }
})

router.get('/:id', isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Order not found' });
    }
})

router.put('/:id/pay', isAuth, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = { status: req.body.status };
        const updatedOrder = await order.save();
        res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order not found' });
    }
})

router.get('/', isAuth, isAdmin, async(req, res) => {
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders);
});

router.delete('/:id', isAuth, isAdmin, async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        const deleteOrder = await order.remove();
        res.send({ message: 'Order deleted', order: deleteOrder });
    } else {
        res.status(404).send({ message: 'Order not found!' });
    }
})

router.put('/:id/deliver', isAuth, isAdmin, async(req, res) => {
    const order = await Order.findById(req.params.id);
    if(order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();
        res.send({ message: 'Order delivered', order: updatedOrder });
    } else {
        res.status(404).send({ message: 'Order not found!' });
    }
})

export default router;