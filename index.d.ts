import { UserDto } from './src/dtos/user-dto';

declare global {
  namespace Express {
    interface Request {
      user: UserDto;
    }
  }
}
