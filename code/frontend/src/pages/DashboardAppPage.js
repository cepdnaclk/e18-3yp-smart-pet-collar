import { Helmet } from "react-helmet-async";
// @mui
import { Grid, Container, Typography, Stack, Button } from "@mui/material";
// sections
import {
  AppBarChart,
  AppDataRecords,
  AppWidgetSummary,
} from "../sections/@dashboard/app";
import {
  Bedtime,
  MonitorHeart,
  Straighten,
  Sync,
  Thermostat,
} from "@mui/icons-material";
import AppMap from "src/sections/@dashboard/app/AppMap";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const user = useOutletContext();
  const [vitals, setVitals] = useState([]);

  useEffect(() => {
    getVitals();
    // eslint-disable-next-line
  }, []);

  const getVitals = () => {
    axios
      .get("http://43.205.113.198:3001/pet/vitals", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setVitals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | PetSmart </title>
      </Helmet>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="column">
            <Typography variant="h4">Hello, {user.firstName}</Typography>
            <Typography
              variant="subtitle1"
              sx={{ mb: 5, color: "text.secondary" }}
            >
              Welcome to PetSmart Dashboard!
            </Typography>
          </Stack>
          <Button variant="contained" startIcon={<Sync />}>
            Sync now
          </Button>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Temperature"
              value="30 C"
              icon={<Thermostat />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Pulse Rate"
              value="70 bpm"
              color="info"
              icon={<MonitorHeart />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Sleep Status"
              value="3 Hours"
              color="warning"
              icon={<Bedtime />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Distance from Home"
              value="50 m"
              color="error"
              icon={<Straighten />}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppBarChart
              title="Sleeping Time"
              subheader="Monitor your pet's sleeping time"
              chartLabels={[
                "11/29/2022",
                "11/30/2022",
                "12/01/2022",
                "12/02/2022",
                "12/03/2022",
                "12/04/2022",
                "12/05/2022",
                "12/06/2022",
                "12/07/2022",
                "12/08/2022",
                "12/09/2022",
              ]}
              chartData={[
                {
                  name: "Sleep hours",
                  type: "column",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
                {
                  name: "Trendline",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppMap
              title={"Your pet's last known location"}
              subheader={"Last updated 2 hours ago"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppDataRecords
              title="Recent Vitals"
              headersList={[
                { id: "temperature", label: "Temperature" },
                { id: "pulseRate", label: "Pulse Rate" },
                { id: "dateTime", label: "Date & Time" },
              ]}
              list={vitals
                .map((vital) => ({
                  id: vital._id,
                  temperature: `${vital.temperature} °C`,
                  pulseRate: `${vital.pulseRate} bpm`,
                  dateTime: vital.dateTime,
                }))
                .sort((a, b) => b.dateTime - a.dateTime)}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
