import { LayerType } from '../../index';

export interface ILayerModel {
  name: string;
  type: LayerType;
}

export class LayerDto {
  name;
  type;

  constructor(model: ILayerModel) {
    this.name = model.name;
    this.type = model.type;
  }
}
