import MarkerModel from '../models/marker-model';
import { Location } from '../../index';
import ApiError from '../exceptions/api-error';
import { IMarkerModel } from '../dtos/marker-dto';

class MarkerService {
  async getAll() {
    const markers = await MarkerModel.find();
    return markers;
  }

  async create(title: string, description: string, location: Location) {
    const marker = await MarkerModel.create({ title, description, location });
    return marker;
  }

  async update(id: string, newMarker: IMarkerModel) {
    const marker = await MarkerModel.findByIdAndUpdate(id, newMarker);
    return marker;
  }

  async remove(id: string) {
    const marker = await MarkerModel.findByIdAndRemove(id);
    return marker;
  }
}

export default new MarkerService();
