import express, { Application } from 'express';
import { connectToDatabase } from './services/database.service';
import { authenticationRouter } from './routes/authentication.routes';
import { superRouter } from './routes/super.routes';
import { PORT } from './env';
import { usersRouter } from './routes/users.routes';

try {
  await connectToDatabase();
} catch (error: any) {
  console.error('Database connection failed', error);
  process.exit(1);
}

const app: Application = express();
const server = app.listen(PORT, async () => {
  console.log(`🗄️ Server Fire on http://localhost:${PORT}`);
});

app.use('/authentication', authenticationRouter);
app.use('/super', superRouter);
app.use('/users', usersRouter);

process.on('SIGINT', () => {
  server.close(() => {
    console.log('\nServer Closed.');
    process.exit(0);
  });
});
