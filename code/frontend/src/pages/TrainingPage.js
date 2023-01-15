import { Helmet } from "react-helmet-async";
// @mui
import { Container, Grid, Typography } from "@mui/material";
import { AppTrafficBySite } from "src/sections/@dashboard/app";
import {
  Audiotrack,
  FoodBank,
  SourceRounded,
  Speaker,
} from "@mui/icons-material";
import { useOutletContext } from "react-router-dom";

// ----------------------------------------------------------------------

export default function TrainingPage() {
  const { user } = useOutletContext();

  return (
    <>
      <Helmet>
        <title> Training | PetSmart </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" marginBottom={5}>
          Sound based training
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="In built sounds"
              list={[
                {
                  name: "Sound 1",
                  icon: <FoodBank />,
                },
                {
                  name: "Sound 2",
                  icon: <SourceRounded />,
                },
                {
                  name: "Sound 3",
                  icon: <Speaker />,
                },
                {
                  name: "Sound 4",
                  icon: <Audiotrack />,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
