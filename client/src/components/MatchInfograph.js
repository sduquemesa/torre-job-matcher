import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
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
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icon: {
    fontSize: "2rem",
    marginRight: "10px",
  },
}));

export default function MatchInfograph(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <div className={classes.title}>
        <SearchIcon className={classes.icon} />
        <Typography
          variant="h4"
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
          <Grid item xs={12}>
            <Divider style={{ marginBottom: "20px" }} />
            <Typography
              variant="h3"
              color="textPrimary"
              component="p"
              style={{ whiteSpace: "pre-line" }}
            >
              Top matches
            </Typography>
            <Typography
              variant="h4"
              color="textSecondary"
              component="p"
              style={{ whiteSpace: "pre-line" }}
            >
              Opportunities fitting your genome
            </Typography>
          </Grid>
          <TopJobsCard topJobs={props.matchData.job_score} />
        </Grid>
      </div>
    </Paper>
  );
}
