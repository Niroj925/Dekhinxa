import {Router} from 'express';
import  UserController from '../controller/userController.js'
import passport from 'passport';
import '../auth.js';

const router =Router();


const userController=new UserController();

router.get('/auth/google',

passport.authenticate("google",{scope:['profile','email']}),
);

router.get('/auth/google/callback',

passport.authenticate("google",{
    // successRedirect:`http://localhost:3000`,
    // failureRedirect:'/login/failed',
}),
userController.googleauth);



export default router;