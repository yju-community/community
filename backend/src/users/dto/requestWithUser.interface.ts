import { Request } from 'express';
import { Users } from 'src/entities/Users';

interface RequestWithUser extends Request {
  user: Users;
}

export default RequestWithUser;
