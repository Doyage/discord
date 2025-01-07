import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    const userExists = await User.exists({
      mail: mail.toLowerCase(),
    });

    if (userExists) {
      return res.status(409).send('Email already in use');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      { expiresIn: '365d' },
    );

    res.status(201).json({
      userDetails: {
        mail: user.mail,
        username: user.username,
        token,
      },
    });
  } catch (error) {
    return res.status(500).send('postRegister Error', error);
  }
};
