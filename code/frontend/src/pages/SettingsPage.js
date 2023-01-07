import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  Grid,
  TextField,
  CardHeader,
} from "@mui/material";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// ----------------------------------------------------------------------

export default function SettingsPage() {
  const user = useOutletContext();

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [pet, setPet] = useState(null);

  useEffect(() => {
    getPet();
    // eslint-disable-next-line
  }, []);

  const getPet = () => {
    axios
      .get("http://43.205.113.198:3001/me/pet", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setPet(response.data);
        setDateOfBirth(response.data.dateOfBirth);
        document.getElementById("name").value = response.data.name;
        document.getElementById("breed").type = response.data.breed;
        document.getElementById("weight").value = response.data.weight;
        document.getElementById("color").value = response.data.color;
        document.getElementById("specialChar").value =
          response.data.specialCharacteristics;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
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
      .put("http://43.205.113.198:3001/me/pet", pet, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        console.log("Successfully updated");
        getPet();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title> Settings | PetSmart </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" marginBottom={5}>
          Settings
        </Typography>
        {pet && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={9}>
              <Card id="add_form">
                <CardHeader
                  title="Pet Information"
                  subheader="Add the basic information of your pet here."
                />
                <Stack spacing={3} padding={3}>
                  <TextField
                    name="name"
                    id="name"
                    label="Name"
                    defaultValue={pet.name}
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
                  <TextField
                    name="breed"
                    id="breed"
                    label="Breed"
                    defaultValue={pet.breed}
                  />
                  <TextField
                    name="color"
                    id="color"
                    label="Color"
                    defaultValue={pet.color}
                  />
                  <TextField
                    name="weight"
                    type="number"
                    id="weight"
                    label="Weight in Kg"
                    defaultValue={pet.weight}
                  />

                  <TextField
                    name="specialChar"
                    id="specialChar"
                    label="Special Characteristics"
                    defaultValue={pet.specialCharacteristics}
                  />

                  <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Submit
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
