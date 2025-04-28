import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

function LocationListComponent() {
  const locations = useSelector((state) => state.locations);

  if (locations.length === 0) {
    return (
      <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
        No locations added yet.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {locations.map((loc) => (
        <Grid item xs={12} sm={6} md={4} key={loc.id}>
          <Card>
            {loc.image && (
              <CardMedia
                component="img"
                height="200"
                image={loc.image}
                alt={loc.name}
              />
            )}
            <CardContent>
              <Typography variant="h6">{loc.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {loc.description}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                sx={{ marginTop: 1 }}
              >
                📍 Lat: {loc.latitude.toFixed(5)}, Lng:{" "}
                {loc.longitude.toFixed(5)}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{ marginTop: 2 }}
                component={Link}
                to={`/edit/${loc.id}`}
              >
                Edit
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default LocationListComponent;
