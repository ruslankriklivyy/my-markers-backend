import MarkerModel from '../models/marker-model';
import { IMarkerModel } from '../dtos/marker-dto';

class MarkerService {
  async getAll() {
    const markers = await MarkerModel.find();
    return markers;
  }

  async create(markerData: IMarkerModel) {
    const newMarker = { ...markerData };

    if (!newMarker.preview) delete newMarker.preview;

    const marker = await MarkerModel.create(newMarker);
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
