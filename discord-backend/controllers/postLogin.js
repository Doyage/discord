import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await User.findOne({
      mail: mail.toLowerCase(),
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          userId: user._id,
          mail,
        },
        process.env.TOKEN_KEY,
        { expiresIn: '365d' },
      );

      return res.status(200).json({
        userDetails: {
          mail: user.mail,
          token,
          username: user.username,
        },
      });
    }

    return res.status(400).send('Invalide credentials');
  } catch (error) {
    return res.status(500).send('postLogin Error', error);
  }
};
