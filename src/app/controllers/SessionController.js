import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  async store(req, resp) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return resp.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return resp
        .status(401)
        .json({ error: 'E-mail or Password does not match' });
    }

    const { id, name, createdAt, updatedAt } = user;

    return resp.json({
      user: { id, name, email, createdAt, updatedAt },
      token: jwt.sign({ id: user.id }, process.env.APP_SECRET, {
        expiresIn: process.env.EXPIRES_IN,
      }),
    });
  }
}

export default new SessionController();
