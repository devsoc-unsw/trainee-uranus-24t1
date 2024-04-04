export {};

/*
  Extends Express's Request interface so that
  our JWT middleware can identify the user
  by attaching the user's ID onto the Request.
*/

declare global {
  namespace Express {
    interface Request {
      _id: string;
    }
  }
}
