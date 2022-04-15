import { Location } from '../../index';

export interface IMarkerModel {
  title: string;
  description: string;
  location: Location;
}

export class MarkerDto {
  title;
  description;
  location;

  constructor(model: IMarkerModel) {
    this.title = model.title;
    this.description = model.description;
    this.location = model.location;
  }
}
