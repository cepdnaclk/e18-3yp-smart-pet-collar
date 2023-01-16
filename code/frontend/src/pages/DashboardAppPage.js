import { Helmet } from "react-helmet-async";
// @mui
import {
  Grid,
  Container,
  Typography,
  Stack,
  Button,
  CardHeader,
  TextField,
  Card,
} from "@mui/material";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const { user, updateUserDetails } = useOutletContext();
  const [vitals, setVitals] = useState([]);
  const [overview, setOverview] = useState(null);

  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  useEffect(() => {
    if (user.pet) {
      getVitals();
      getOverview();
    }
    // eslint-disable-next-line
  }, [user]);

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

  const getOverview = () => {
    axios
      .get("http://43.205.113.198:3001/pet/overview", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setOverview(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSync = () => {
    axios
      .post(
        "http://43.205.113.198:3001/pet/sync",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((response) => {
        getVitals();
        getOverview();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitPet = async () => {
    const pet = {
      name: document.getElementById("name").value,
      sex: "Male",
      breed: document.getElementById("breed").value,
      dateOfBirth: dateOfBirth,
      weight: document.getElementById("weight").value,
      color: document.getElementById("color").value,
      species: "Dog",
      specialCharacteristics: document.getElementById("specialChar").value,
    };

    axios
      .post("http://43.205.113.198:3001/me/pet", pet, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("Successfully updated");
        updateUserDetails(response.data);
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
          {user.pet && (
            <Button
              variant="contained"
              startIcon={<Sync />}
              onClick={handleSync}
            >
              Sync now
            </Button>
          )}
        </Stack>

        {user.pet ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Temperature"
                value={overview ? overview.vital.temperature + " ℃" : "0 ℃"}
                icon={<Thermostat />}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Heart Rate"
                value={overview ? overview.vital.heartRate + " bpm" : "0 bpm"}
                color="info"
                icon={<MonitorHeart />}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Sleep Status"
                value={overview ? overview.sleep.duration + " min" : "0 min"}
                color="warning"
                icon={<Bedtime />}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <AppWidgetSummary
                title="Distance from Home"
                value={overview ? overview.location.distance + " m" : "0 m"}
                color="error"
                icon={<Straighten />}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
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
                    data: [
                      300, 250, 360, 300, 450, 350, 640, 520, 590, 360, 390,
                    ],
                  },
                ]}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <AppMap
                title={"Your pet's last known location"}
                subheader={"Last updated 2 hours ago"}
                location={overview?.location}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AppDataRecords
                title="Recent Vitals"
                headersList={[
                  { id: "temperature", label: "Temperature" },
                  { id: "heartRate", label: "Heart Rate" },
                  { id: "dateTime", label: "Date & Time" },
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
          </Grid>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Card id="pet_form">
                <CardHeader
                  title="Pet Information"
                  subheader="Before proceeding, please let us know about your pet"
                />
                <Stack spacing={3} padding={3}>
                  <TextField
                    name="name"
                    id="name"
                    label="Pet's Name"
                    required
                  />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of Birth"
                      value={dateOfBirth}
                      onChange={(newValue) => {
                        setDateOfBirth(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <TextField name="breed" id="breed" label="Breed" required />
                  <TextField name="color" id="color" label="Color" required />
                  <TextField
                    name="weight"
                    type="number"
                    id="weight"
                    label="Weight in Kg"
                    required
                  />

                  <TextField
                    name="specialChar"
                    id="specialChar"
                    label="Special Characteristics"
                  />

                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmitPet}
                  >
                    Save
                  </Button>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
