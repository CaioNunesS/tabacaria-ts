declare namespace Express {
  interface Request {
    payload: any;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }
}
