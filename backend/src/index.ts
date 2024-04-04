import express, { Application } from 'express';
import { connectToDatabase } from './services/database.service';
import { usersRouter } from './routes/users.routes';
import { superRouter } from './routes/super.routes';
import { PORT } from './env';

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

app.use('/users', usersRouter);
app.use('/super', superRouter);

process.on('SIGINT', () => {
  server.close(() => {
    console.log('\nServer Closed.');
    process.exit(0);
  });
});
