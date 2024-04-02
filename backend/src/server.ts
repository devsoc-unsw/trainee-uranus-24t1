import express, { Application, NextFunction, Request, Response, Router } from "express";
import cors from 'cors';
import { PORT, DB_URI, SECRET_KEY } from './env';
import jwt, { JwtPayload } from 'jsonwebtoken';
import userRouter from "./user/user.route";


const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, async () => {
  console.log(`🗄️ Server Fire on http://localhost:${PORT}`);
});

// Token middleware
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send('Please provide token');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = (decoded as JwtPayload)._id;

    next();
  } catch (error) {
    res.status(403).send('Bad Token');
  }
};

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to JWT Authentication');
});

app.get('/protected', verifyToken, (req: Request, res: Response) => {
  res.status(200).send(`Protected route accessed. Hello User ID ${req.userId}`);
});

app.use('', userRouter);

/*
  Interface sketch

  - user registration
    - Course code list
      - I am going to let the users be responsible 
        for checking if each course is available 
        in any given term.
    - Programming languages list
    - Other information
      - Languages
      - Gender
      - Age
      - WAM bracket
      - Academic Social Ratio
    - Hobbies list
    - Preferences (see other information)
  - user login

  - Preview self profile
  - Modify self profile (see registration)

  - Matching
    - Receive the next `n` recommended profiles
    - Send back to the server when matched

  - Messaging Socket.IO magic
*/

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server Closed.');
  });
});
