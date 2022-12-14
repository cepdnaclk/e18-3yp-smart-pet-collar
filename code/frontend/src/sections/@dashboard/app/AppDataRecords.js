// @mui
import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
} from "@mui/material";
// utils
import { fDateTime } from "../../../utils/formatTime";
// components
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";

// ----------------------------------------------------------------------

AppDataRecords.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppDataRecords({
  title,
  subheader,
  headersList,
  list,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            divider={<Divider orientation="vertical" flexItem />}
          >
            {headersList.map((header) => (
              <Box sx={{ minWidth: 240 }} key={header.id}>
                <Typography variant="subtitle1" color="inherit" noWrap>
                  {header.label}
                </Typography>
              </Box>
            ))}
          </Stack>
          {list.map((item) => (
            <Stack
              key={item.id}
              direction="row"
              alignItems="center"
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
            >
              {headersList.map((header) => (
                <Box sx={{ minWidth: 240 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                    noWrap
                  >
                    {header.id === "dateTime"
                      ? fDateTime(item[header.id])
                      : item[header.id]}
                  </Typography>
                </Box>
              ))}
            </Stack>
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}
