interface IUserModel {
  fullName: string;
  email: string;
  _id: string;
  isActivated: boolean;
}

export class UserDto {
  fullName;
  email;
  id;
  isActivated;

  constructor(model: IUserModel) {
    this.fullName = model.fullName;
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}
