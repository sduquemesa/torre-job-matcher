import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import MatchCircleCard from "./MatchCircleCard.js";
import SummaryCard from "./SummaryCard.js";
import StrengthsCard from "./StrenghtsCard.js";
import TopJobsCard from "./TopJobsCard.js";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "90%",
    height: "100%",
    backgroundColor: "transparent",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  infogrid: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    textAlign: "right",
    marginTop: "20px",
  },
}));

export default function MatchInfograph(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.title}>
        {/* <Typography
          variant="h5"
          color="textSecondary"
          component="p"
          style={{ whiteSpace: "pre-line", marginBottom: "10px" }}
        >
          your career pathway
        </Typography> */}
        <Typography
          variant="h2"
          color="textPrimary"
          component="p"
          style={{ whiteSpace: "pre-line" }}
        >
          {props.opportunity}
        </Typography>
      </div>
      <div className={classes.infogrid}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <MatchCircleCard matchScore={props.matchData.global_match_score} />
          </Grid>
          <Grid item xs={12} md={6}>
            <StrengthsCard
              strengthStats={props.matchData.strenght_stats}
              userStrengths={props.userData.strengths}
              keywords={props.matchData.keywords}
              className={classes.paper}
            />
          </Grid>
          <Grid item xs={12}>
            <SummaryCard phrases={props.matchData.summary} />
          </Grid>
          {/* <Divider /> */}
          <TopJobsCard topJobs={props.matchData.job_score} />
        </Grid>
      </div>
    </Paper>
  );
}
