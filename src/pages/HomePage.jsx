import MapPickerComponent from '../components/MapPickerComponent'
import LocationFormComponent from '../components/LocationFormComponent';
import LocationMarkerComponent from '../components/LocationMarkerComponent';
import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

function HomePage() {
  const [pickedLatLng, setPickedLatLng] = useState(null);

  return (
    <div>
      {/* Only one MapContainer */}
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Pick location and add markers */}
        <MapPickerComponent onLocationPick={setPickedLatLng} />
        <LocationMarkerComponent />
      </MapContainer>

      {/* Form outside of the map */}
      <LocationFormComponent pickedLatLng={pickedLatLng} />
    </div>
  );
}

export default HomePage;
