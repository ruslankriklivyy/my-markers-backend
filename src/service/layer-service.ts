import LayerModel from '../models/layer-model';
import { LayerType } from '../../index';
import { ILayerModel } from '../dtos/layer-dto';

class LayerService {
  async getAll() {
    const layers = await LayerModel.find();
    return layers;
  }

  async create(name: string, type: LayerType, userId: string) {
    const layer = await LayerModel.create({ name, type, user: userId });
    return layer;
  }

  async update(id: string, newLayer: ILayerModel) {
    const layer = await LayerModel.findByIdAndUpdate(id, newLayer);
    return layer;
  }

  async remove(id: string) {
    const layer = await LayerModel.findByIdAndRemove(id);
    return layer;
  }
}

export default new LayerService();
