import { Helmet } from "react-helmet-async";
// @mui
import { Stack, Container, Grid, Typography } from "@mui/material";
import { AppBarChart, AppWidgetSummary } from "src/sections/@dashboard/app";
import { Favorite, Thermostat } from "@mui/icons-material";
import AppDataRecords from "src/sections/@dashboard/app/AppDataRecords";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// ----------------------------------------------------------------------

export default function HealthPage() {
  const user = useOutletContext();
  const [vitals, setVitals] = useState([]);
  const [sleeps, setSleeps] = useState([]);

  useEffect(() => {
    getVitals();
    getSleeps();
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

  const getSleeps = () => {
    axios
      .get("http://43.205.113.198:3001/pet/sleeps", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setSleeps(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title> Health | PetSmart </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" marginBottom={5}>
          Health & Sleep
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <AppDataRecords
              title="Vitals"
              headersList={[
                { id: "dateTime", label: "Recorded At" },
                { id: "temperature", label: "Body Temperature" },
                { id: "heartRate", label: "Heart Rate" },
              ]}
              list={vitals
                .map((vital) => ({
                  id: vital._id,
                  temperature: `${vital.temperature} °C`,
                  heartRate: `${vital.heartRate} bpm`,
                  dateTime: vital.dateTime,
                }))
                .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="column" spacing={3}>
              <AppWidgetSummary
                title="Body Temperature"
                value="Normal"
                icon={<Thermostat />}
              />
              <AppWidgetSummary
                title="Pulse Rate"
                value="Normal"
                icon={<Favorite />}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <AppDataRecords
              title="Sleep"
              headersList={[
                { id: "startTime", label: "Started Time" },
                { id: "duration", label: "Duration" },
              ]}
              list={sleeps
                .map((sleep) => ({
                  id: sleep._id,
                  duration: `${sleep.duration} min`,
                  startTime: sleep.startTime,
                }))
                .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AppBarChart
              title="Sleeping Time"
              subheader="Monitor your pet's sleeping time"
              chartLabels={[
                "12/11/2022",
                "12/12/2022",
                "12/13/2022",
                "12/14/2022",
                "12/15/2022",
                "12/16/2022",
                "12/17/2022",
                "12/18/2022",
                "12/19/2022",
                "12/20/2022",
                "12/21/2022",
              ]}
              chartData={[
                {
                  name: "Sleep Time",
                  type: "column",
                  fill: "solid",
                  data: [300, 250, 360, 300, 450, 350, 640, 520, 590, 360, 390],
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
