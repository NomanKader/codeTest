import { Marker, Popup } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { updateLocation } from '../redux/locationSlice';
import { useState } from 'react';

function LocationMarkerComponent() {
  const locations = useSelector(state => state.locations);
  const dispatch = useDispatch();
  const [draggingId, setDraggingId] = useState(null);

  const handleDragEnd = (event, id) => {
    const { lat, lng } = event.target.getLatLng();
    dispatch(updateLocation({
      id,
      updatedData: { latitude: lat, longitude: lng }
    }));
    setDraggingId(null);
  };

  return (
    <>
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.latitude, loc.longitude]}
          draggable={true}
          eventHandlers={{
            dragstart: () => setDraggingId(loc.id),
            dragend: (event) => handleDragEnd(event, loc.id),
          }}
        >
          <Popup minWidth={250}>
            <div style={{ textAlign: "center" }}>
              {/* Show uploaded image */}
              {loc.image && (
                <img
                  src={loc.image}
                  alt="Uploaded Location"
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                />
              )}

              <h3>{loc.name}</h3>
              <p>{loc.description}</p>
              <small>Lat: {loc.latitude.toFixed(5)}, Lng: {loc.longitude.toFixed(5)}</small>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default LocationMarkerComponent;
