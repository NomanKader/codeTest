import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { updateLocation } from '../redux/locationSlice';
import { Button, TextField, Typography, Box, Paper, Stack, IconButton, Avatar } from '@mui/material';
import { PhotoCamera, Cancel } from '@mui/icons-material';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function EditLocationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const locations = useSelector(state => state.locations);
  const location = locations.find(loc => loc.id === parseInt(id));

  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: location?.name,
      description: location?.description,
    }
  });

  const [selectedImage, setSelectedImage] = useState(location?.image || null);
  const [position, setPosition] = useState(location ? { lat: location.latitude, lng: location.longitude } : null);

  const onSubmit = (data) => {
    const updatedData = {
      name: data.name,
      description: data.description,
      latitude: position.lat,
      longitude: position.lng,
    };

    if (data.image && data.image[0]) {
      updatedData.image = URL.createObjectURL(data.image[0]);
    } else {
      updatedData.image = selectedImage; // keep existing if no new upload
    }

    dispatch(updateLocation({ id: location.id, updatedData }));
    alert("Location updated!");
    navigate('/list');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      }
    });
    return null;
  };

  if (!location) {
    return <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>Location not found.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ padding: 4, marginTop: 4, borderRadius: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Edit Location
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          {/* Image Upload Area */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {selectedImage ? (
              <Box sx={{ position: 'relative', width: 150, height: 150 }}>
                <Avatar
                  src={selectedImage}
                  variant="rounded"
                  sx={{ width: '100%', height: '100%' }}
                />
                <IconButton
                  onClick={handleRemoveImage}
                  sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'white' }}
                  size="small"
                >
                  <Cancel color="error" />
                </IconButton>
              </Box>
            ) : (
              <>
                <input
                  accept="image/*"
                  id="upload-image"
                  type="file"
                  style={{ display: 'none' }}
                  {...register('image')}
                  onChange={handleImageChange}
                />
                <label htmlFor="upload-image">
                  <Button variant="outlined" startIcon={<PhotoCamera />} component="span">
                    Upload New Image
                  </Button>
                </label>
              </>
            )}
          </Box>

          {/* Location Name */}
          <TextField
            label="Location Name"
            {...register('name', { required: true })}
            fullWidth
          />

          {/* Description */}
          <TextField
            label="Description"
            {...register('description')}
            fullWidth
            multiline
            rows={3}
          />

          {/* Small Map for Picking New Lat/Lng */}
          <Box sx={{ height: '300px', mt: 2 }}>
            <MapContainer
              center={position || [20.5937, 78.9629]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapClickHandler />
              {position && <Marker position={position} />}
            </MapContainer>
          </Box>

          {/* Latitude + Longitude as LABELS */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', m: 2 }}>
            <Typography variant="body1"><strong>Latitude:</strong> {position?.lat ? position.lat.toFixed(6) : '-'}</Typography>
            <Typography variant="body1" sx={{ ml: 3 }}><strong>Longitude:</strong> {position?.lng ? position.lng.toFixed(6) : '-'}</Typography>
          </Box>

          {/* Save Changes Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ marginTop: 2 }}
          >
            Save Changes
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default EditLocationPage;
