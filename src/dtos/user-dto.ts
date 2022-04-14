interface IUserModel {
  email: string;
  _id: string;
  isActivated: boolean;
}

export class UserDto {
  email;
  id;
  isActivated;

  constructor(model: IUserModel) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
