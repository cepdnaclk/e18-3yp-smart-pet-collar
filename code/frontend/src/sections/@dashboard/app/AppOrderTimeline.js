// @mui
import PropTypes from "prop-types";
import { Card, Typography, CardHeader, CardContent } from "@mui/material";
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from "@mui/lab";
// utils
import { fDateTime } from "../../../utils/formatTime";

// ----------------------------------------------------------------------

AppOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function AppOrderTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          "& .MuiTimelineItem-missingOppositeContent:before": {
            display: "none",
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <OrderItem
              key={item.id}
              item={item}
              index={index}
              isLast={index === list.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  index: PropTypes.number,
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    scheduledDate: PropTypes.instanceOf(Date),
    name: PropTypes.string,
  }),
};

function OrderItem({ item, isLast, index }) {
  const { name, scheduledDate } = item;
  let colors = ["primary", "success", "info", "warning", "error", "primary"];
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={colors[index]} />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{name}</Typography>

        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {fDateTime(scheduledDate)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
