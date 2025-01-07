import { Router } from 'express';
import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

// Controllers
import * as authControllers from '../controllers/authControllers.js';
import { verifyToken } from '../middlewares/auth.js';

const validator = createValidator();
export const router = Router();

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});

router.post(
  '/register',
  validator.body(registerSchema),
  authControllers.postRegister,
);

router.post('/login', validator.body(loginSchema), authControllers.postLogin);

// test verify
router.get('/test', verifyToken, (req, res) => {
  console.log('request passed');
});
