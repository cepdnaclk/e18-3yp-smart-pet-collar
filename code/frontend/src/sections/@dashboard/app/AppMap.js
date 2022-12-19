import PropTypes from "prop-types";
// @mui
import { styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";

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

export default function AppMap({ title, subheader }) {
  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <StyledChartWrapper dir="ltr">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.33062152744216!2d80.62453170856949!3d7.321292592022542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb8cb58ab38d29395!2zN8KwMTgnMjIuOSJOIDgwwrAzNyc0MC4xIkU!5e0!3m2!1sen!2slk!4v1671485898612!5m2!1sen!2slk"
          width="100%"
          height="350"
          title="Pet's Current Location"
          allowfullscreen=""
          frameBorder={0}
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </StyledChartWrapper>
    </Card>
  );
}
