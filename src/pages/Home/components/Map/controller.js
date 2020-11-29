import { MapController } from "react-map-gl";

export default class CustomMapController extends MapController {
  constructor(onPan) {
    super();
    this.handlePan = onPan;
  }

  _onPan(event) {
    this.handlePan();
    console.log(this.getMapState());
  }
}
