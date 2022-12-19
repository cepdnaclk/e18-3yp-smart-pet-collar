// @mui
import PropTypes from "prop-types";
import { Card, Typography } from "@mui/material";

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.object,
  title: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({
  title,
  value,
  icon,
  color = "primary",
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "center",
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      {icon}

      <Typography variant="h3">{value}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}
