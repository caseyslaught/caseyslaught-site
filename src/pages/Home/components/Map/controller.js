import { MapController } from "react-map-gl";

export default class MyMapController extends MapController {
  constructor(handlePanEnd) {
    super();
    this.handlePanEnd = handlePanEnd;
  }

  _onPanEnd(event) {
    MapController.prototype._onPanEnd.call(this);
    this.handlePanEnd();
  }
}
