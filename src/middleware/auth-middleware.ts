import ApiError from '../exceptions/api-error';
import { NextFunction, Request, Response } from 'express';

import tokenService from '../service/token-service';
import { UserDto } from '../dtos/user-dto';

export const authMiddleware = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[0];

    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken) as UserDto;

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    console.log('current user', userData);
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};
