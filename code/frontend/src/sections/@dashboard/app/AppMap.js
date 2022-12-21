import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

const MAP_HEIGHT = 372;

const StyledChartWrapper = styled("div")(({ theme }) => ({
  height: MAP_HEIGHT,
  marginTop: theme.spacing(5),
}));

// ----------------------------------------------------------------------

AppMap.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

export default function AppMap({ title, subheader, location }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location) setIsLoading(false);
  }, [location]);

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <StyledChartWrapper dir="ltr">
        {!isLoading && (
          <iframe
            src={`https://maps.google.com/maps?q=${location.longitude},${location.latitude}&hl=es&z=16&amp&output=embed`}
            width="100%"
            height="350"
            title="Pet's Current Location"
            allowfullscreen=""
            frameBorder={0}
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </StyledChartWrapper>
    </Card>
  );
}
