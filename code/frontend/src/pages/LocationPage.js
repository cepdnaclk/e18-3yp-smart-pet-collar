import { Helmet } from "react-helmet-async";
// @mui
import { Stack, Container, Grid, Typography } from "@mui/material";
import { AppDataRecords, AppWidgetSummary } from "src/sections/@dashboard/app";
import { Thermostat } from "@mui/icons-material";
import AppMap from "src/sections/@dashboard/app/AppMap";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// ----------------------------------------------------------------------

export default function LocationPage() {
  const user = useOutletContext();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations();
    // eslint-disable-next-line
  }, []);

  const getLocations = () => {
    axios
      .get("http://localhost:3001/pet/locations", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title> Location | PetSmart </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" marginBottom={5}>
          {" "}
          Location Tracking{" "}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <AppMap
              title={"Your pet's last known location"}
              subheader={"Last updated 2 hours ago"}
            />
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <AppDataRecords
              title="Locations"
              headersList={[
                { id: "dateTime", label: "Recorded At" },
                { id: "location", label: "Longitude, Latitude" },
                { id: "link", label: "" },
              ]}
              list={locations
                .map((location) => ({
                  id: location._id,
                  location: `${location.longitude}, ${location.latitude}`,
                  dateTime: location.dateTime,
                  link: (
                    <a
                      href={`https://maps.google.com/?q=${location.longitude},${location.latitude}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on Map
                    </a>
                  ),
                }))
                .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Stack direction="column" spacing={3}>
              <AppWidgetSummary
                title="Distance"
                value="40 m"
                icon={<Thermostat />}
              />
              <AppMap
                title={"Recent Locations"}
                subheader={"Last updated 2 hours ago"}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
