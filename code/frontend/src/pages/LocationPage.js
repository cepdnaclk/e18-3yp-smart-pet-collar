import { Helmet } from "react-helmet-async";
// @mui
import { Stack, Container, Grid, Typography } from "@mui/material";
import { AppDataRecords, AppWidgetSummary } from "src/sections/@dashboard/app";
import { faker } from "@faker-js/faker";
import { Thermostat } from "@mui/icons-material";
import AppMap from "src/sections/@dashboard/app/AppMap";
import { Link } from "react-router-dom";

// ----------------------------------------------------------------------

export default function LocationPage() {
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
              list={[...Array(10)]
                .map((_, index) => ({
                  id: faker.datatype.uuid(),
                  location: faker.datatype.number({
                    min: -90,
                    max: 90,
                    precision: 0.00000001,
                  }),
                  dateTime: faker.date.recent(),
                  link: <Link to={faker.internet.url.name}>View on Map</Link>,
                }))
                .sort((a, b) => b.dateTime - a.dateTime)}
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
