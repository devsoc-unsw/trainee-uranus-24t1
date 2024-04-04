import jwt from 'jsonwebtoken';

export async function sign() {

  // // Signing snippet
  // const token = jwt.sign(
  //   { _id: foundUser._id, email: foundUser.email },
  //   SECRET_KEY,
  //   { expiresIn: '2 hours' }
  // );

  // Verifying snippet
  // const token = req.header('Authorization')?.replace('Bearer ', '');
  // if (!token) {
  //   return res.status(401).send('Please provide token');
  // }

  // try {
  //   const decoded = jwt.verify(token, SECRET_KEY);
  //   req._id = (decoded as JwtPayload)._id;

  //   next();
  // } catch (error) {
  //   res.status(403).send('Bad Token');
  // }
}