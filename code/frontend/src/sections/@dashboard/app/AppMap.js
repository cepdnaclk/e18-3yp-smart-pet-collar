import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, CardHeader, Skeleton } from '@mui/material';

// ----------------------------------------------------------------------

const MAP_HEIGHT = 372;

const StyledChartWrapper = styled('div')(({ theme }) => ({
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
      <Skeleton variant="rectangular" width="100%" height={350} />
      </StyledChartWrapper>
    </Card>
  );
}
