import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addLocation } from "../redux/locationSlice";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Stack,
  IconButton,
  Avatar,
} from "@mui/material";
import { PhotoCamera, Cancel } from "@mui/icons-material";
import { useState } from "react";

function LocationFormComponent({ pickedLatLng }) {
  const { register, handleSubmit, reset, watch } = useForm();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const watchName = watch("name");
  const watchDescription = watch("description");

  const onSubmit = (data) => {
    if (!pickedLatLng) {
      alert("Please pick a location on the map first.");
      return;
    }

    const newLocation = {
      id: Date.now(),
      name: data.name,
      description: data.description,
      latitude: pickedLatLng.lat,
      longitude: pickedLatLng.lng,
      image:
        selectedImage ||
        (data.image[0] ? URL.createObjectURL(data.image[0]) : null),
    };

    dispatch(addLocation(newLocation));
    reset();
    setSelectedImage(null);
    alert("Location saved!");
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, marginTop: 4, borderRadius: 2 }}>
      <Typography variant="h5" align="left" gutterBottom>
        Submit Location
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          {/* Image Upload Area */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {selectedImage ? (
              <Box sx={{ position: "relative", width: 150, height: 150 }}>
                <Avatar
                  src={selectedImage}
                  variant="rounded"
                  sx={{ width: "100%", height: "100%" }}
                />
                <IconButton
                  onClick={handleRemoveImage}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bgcolor: "white",
                  }}
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
                  style={{ display: "none" }}
                  {...register("image")}
                  onChange={handleImageChange}
                />
                <label htmlFor="upload-image">
                  <Button
                    variant="outlined"
                    startIcon={<PhotoCamera />}
                    component="span"
                  >
                    Upload Image
                  </Button>
                </label>
              </>
            )}
          </Box>

          {/* Location Name */}
          <TextField
            label="Location Name"
            {...register("name", { required: true })}
            fullWidth
          />

          {/* Description */}
          <TextField
            label="Description"
            {...register("description")}
            fullWidth
            multiline
            rows={3}
          />

          {/* Latitude + Longitude as LABELS */}
          <Box sx={{ display: "flex", justifyContent: "flex-start", m: 2 }}>
            <Typography variant="body1">
              <strong>Latitude:</strong>{" "}
              {pickedLatLng?.lat ? pickedLatLng.lat.toFixed(6) : "-"}
            </Typography>
            <Typography variant="body1" sx={{ ml: 3 }}>
              <strong>Longitude:</strong>{" "}
              {pickedLatLng?.lng ? pickedLatLng.lng.toFixed(6) : "-"}
            </Typography>
          </Box>

          {/* Submit Button */}
          <Button
            disabled={
              !selectedImage ||
              !pickedLatLng?.lat ||
              !pickedLatLng?.lng ||
              !watchName ||
              !watchDescription
            }
            type="submit"
            variant="contained"
            size="large"
            sx={{ marginTop: 2 }}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default LocationFormComponent;
