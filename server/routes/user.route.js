import express from 'express';
import User from '../models/user.model';
import { getToken, isAuth } from '../util';

const router = express.Router();

router.post('/signin', async (req, res) => {

    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({ message: 'Invalid email or password!' });
    }
})

router.post('/register', async (req, res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const newUser = await user.save();
    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    }
    else {
        res.status(401).send({ message: 'Invalid user data!' });
    }
})

router.get('/createadmin', async (req, res) => {

    try {
        const user = new User({
            name:'mhudyx',
            email:'mhudyx@gmail.com',
            password: '1234',
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(newUser);

    } catch (error) {
        res.send({ message: error.message });
    }
    
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'User not found '});
    }
})

router.put('/profile', isAuth, async(req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({ 
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        })
    }
});

export default router;