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

export interface PreviewData {
  _id: string;
  url: string;
}

export type LayerType = 'private' | 'public';
