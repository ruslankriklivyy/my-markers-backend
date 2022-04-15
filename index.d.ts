import { UserDto } from './src/dtos/user-dto';

declare global {
  namespace Express {
    interface Request {
      user: UserDto;
    }
  }
}

export interface Location {
  lat: number;
  lng: number;
}

export type LayerType = 'private' | 'public';
