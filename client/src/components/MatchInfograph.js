import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";

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
  large: {
    width: "40%",
    height: "40%",
  },
}));

export default function MatchInfograph(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <Typography
        variant="h6"
        color="textSecondary"
        component="p"
        style={{ whiteSpace: "pre-line" }}
      >
        What do you want to become?
      </Typography>
      <Typography
        variant="h5"
        color="textPrimary"
        component="p"
        style={{ whiteSpace: "pre-line" }}
      >
        {props.opportunity}
      </Typography>
    </Paper>
  );
}
