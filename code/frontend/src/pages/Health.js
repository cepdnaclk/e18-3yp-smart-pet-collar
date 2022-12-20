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
                { id: "pulseRate", label: "Pulse Rate" },
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
                { id: "dateTime", label: "Started Time" },
                { id: "duration", label: "Duration" },
              ]}
              list={sleeps
                .map((sleep) => ({
                  id: sleep._id,
                  duration: `${sleep.duration} min`,
                  dateTime: sleep.dateTime,
                }))
                .sort((a, b) => b.dateTime - a.dateTime)}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
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
        </Grid>
      </Container>
    </>
  );
}
