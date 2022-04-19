import { Request, Response, NextFunction } from 'express';
import UserService from '../service/user-service';
import userService from '../service/user-service';
import { validationResult } from 'express-validator';
import ApiError from '../exceptions/api-error';

class UserController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { fullName, email, password } = req.body;
      const user = await UserService.registration(fullName, email, password);
      const expiresDate = 30 * 24 * 60 * 60 * 1000;

      res.cookie('refreshToken', user.refreshToken, {
        maxAge: expiresDate,
        httpOnly: true,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation error', errors.array()));
      }

      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      const expiresDate = 30 * 24 * 60 * 60 * 1000;

      res.cookie('refreshToken', user.refreshToken, {
        maxAge: expiresDate,
        httpOnly: true,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      res.redirect(process.env.CLIENT_URL || '');
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const user = await userService.refresh(refreshToken);
      const expiresDate = 30 * 24 * 60 * 60 * 1000;

      res.cookie('refreshToken', user.refreshToken, {
        maxAge: expiresDate,
        httpOnly: true,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user;
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
