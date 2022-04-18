import jwt from 'jsonwebtoken';
import TokenModel from '../models/token-model';
import { UserDto } from '../dtos/user-dto';

class TokenService {
  generateTokens(user: UserDto) {
    const payload = { ...user, id: user.id.toString() };

    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '', {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || '',
      {
        expiresIn: '30d',
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ user: userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    return await TokenModel.create({
      user: userId,
      refresh_token: refreshToken,
    });
  }

  async removeToken(refreshToken: string) {
    const tokenData = await TokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findRefreshToken(refreshToken: string) {
    const tokenData = await TokenModel.findOne({ refreshToken });
    return tokenData;
  }

  async findAccessToken(accessToken: string) {
    const tokenData = await TokenModel.findOne({ accessToken });
    return tokenData;
  }

  validateAccessToken(token: string) {
    try {
      const decodedData = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET || '',
      );
      return decodedData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      const decodedData = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET || '',
      );
      return decodedData;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
