import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  formControlSelect: {
    minWidth: 100,
    marginRight: 10,
  },
}));

const PeriodSelect = (props) => {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  let blackList = useSelector((state) => state.blackList);
  let blocks = useSelector((state) => state.blocks);
  let { sessions, timeFrame, setTimeFrame } = props;

  if (auth) {
    sessions = sessions.filter((session) => session.userId === auth.id);
    blackList = blackList.filter((entry) => entry.userId === auth.id);
    blocks = blocks.filter((block) => block.userId === auth.id);
  }
  let goals = sessions.map((session) => {
    return session.goal;
  });

  const goalOptions = [];
  for (let i = 0; i < goals.length; i++) {
    if (!goalOptions.includes(goals[i])) {
      goalOptions.push(goals[i]);
    }
  }

  const [goal, setGoal] = useState("");

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  if (timeFrame === "Year") {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 365;
    });
    sessions = filtered;
  }
  if (timeFrame === "Quarter") {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 90;
    });
    sessions = filtered;
  } else if (timeFrame === "Month") {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 30;
    });
    sessions = filtered;
  } else if (timeFrame === "Week") {
    const filtered = sessions.filter((session) => {
      const startTime = Date.parse(session.startTime);
      return startTime > Date.now() - 86400000 * 7;
    });
    sessions = filtered;
  }
  if (goal !== "All" && goal) {
    sessions = sessions.filter((session) => {
      return session.goal === goal;
    });
  }
  let capitalized = "";

  for (let i = 0; i < auth.username.length; i++) {
    const char = auth.username[i];
    if (i === 0) {
      capitalized += char.toUpperCase();
    } else capitalized += char;
  }

  return (
    <Grid>
      <FormControl className={classes.formControlSelect}>
        <InputLabel id="time-frame-label" color="primary">
          Period
        </InputLabel>
        <Select
          color="primary"
          labelId="time-frame-label"
          value={timeFrame}
          onChange={handleTimeFrameChange}
        >
          <MenuItem value={"All"}>All</MenuItem>
          <MenuItem value={"Week"}>Week</MenuItem>
          <MenuItem value={"Month"}>Month</MenuItem>
          <MenuItem value={"Quarter"}>Quarter</MenuItem>
          <MenuItem value={"Year"}>Year</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
};

export default PeriodSelect;
