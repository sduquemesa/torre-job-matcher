import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import MatchCircleCard from "./MatchCircleCard.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    width: "90%",
    height: "80%",
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
}));

export default function MatchInfograph(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <div>
        <Typography
          variant="h4"
          color="textSecondary"
          component="p"
          style={{ whiteSpace: "pre-line", marginBottom: "10px" }}
        >
          your career pathway
        </Typography>
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
          <Grid item xs={5}>
            <div>
              <MatchCircleCard
                matchScore={props.matchData.global_match_score}
              />
            </div>
          </Grid>
          <Grid item xs={7} sm={7}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>xs=12 sm=6</Paper>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}
