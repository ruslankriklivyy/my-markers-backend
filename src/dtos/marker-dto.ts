import { Location, PreviewData } from '../../index';

export interface IMarkerModel {
  title: string;
  description: string;
  location: Location;
  preview?: PreviewData;
}

export class MarkerDto {
  title;
  description;
  location;
  preview;

  constructor(model: IMarkerModel) {
    this.title = model.title;
    this.description = model.description;
    this.location = model.location;
    this.preview = model.preview;
  }
}
