import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export default async (req, resp, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return resp.status(400).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return resp.status(401).json({ error: 'Invalid token' });
  }
};
