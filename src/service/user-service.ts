import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

import UserModel from '../models/user-model';
import MailService from './mail-service';
import tokenService from './token-service';
import { UserDto } from '../dtos/user-dto';
import ApiError from '../exceptions/api-error';

class UserService {
  async registration(fullName: string, email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (user) {
      throw ApiError.BadRequest(
        `There is already a user with this email ${email}`,
      );
    }

    const activationLink = v4();
    const hashPassword = await bcrypt.hash(password, 3);

    const newUser = await UserModel.create({
      fullName,
      email,
      password: hashPassword,
      activationLink,
    });
    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`,
    );

    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({ activationLink });

    if (!user) {
      throw ApiError.BadRequest('Incorrect activation link');
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest('User not found');
    }

    const isPasswordEquals = bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      throw ApiError.BadRequest('Invalid password or email');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const decodedData = (await tokenService.validateRefreshToken(
      refreshToken,
    )) as UserDto;
    const token = await tokenService.findRefreshToken(refreshToken);

    if (!decodedData || !token) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findById(decodedData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

export default new UserService();
