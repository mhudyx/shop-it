import express from 'express';
import Product from '../models/product.model';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.post('/', isAuth, isAdmin, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        type: req.body.type,
        category: req.body.category,
        image: req.body.image,
        price: req.body.price,
        brand: req.body.brand,
        quantityStock: req.body.quantityStock,
        rating: req.body.rating,
        numberReviews: req.body.numberReviews
    });
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({ msg:'New product has been created.', data: newProduct });
    }
    return res.status(500).send({ msg: 'Error in creating product!' });
})

router.put('/:id', isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product) {
        product.name = req.body.name;
        product.type = req.body.type;
        product.category = req.body.category;
        product.image = req.body.image;
        product.price = req.body.price;
        product.brand = req.body.brand;
        product.quantityStock = req.body.quantityStock;
        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(200).send({ msg:'Product has been updated.', data: updatedProduct });
        }
    }
    return res.status(500).send({ msg: 'Error in updating product!' });
    
})

router.delete('/:id', isAuth, isAdmin, async(req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({ msg: 'Product deleted' });
    } else
    res.send('Error in deletion!');
})

export default router;