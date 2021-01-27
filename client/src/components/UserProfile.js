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
    width: "90%",
    height: "80%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: "40%",
    height: "40%",
  },
}));

export default function UserProfile(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <div>
        <CardHeader
          avatar={
            <Avatar
              alt={props.userData.name}
              src={props.userData.picture}
              className={classes.large}
            />
          }
        />
        <Typography
          variant="h5"
          color="textPrimary"
          component="p"
          style={{ whiteSpace: "pre-line" }}
        >
          {props.userData.name}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          component="p"
          style={{ whiteSpace: "pre-line" }}
        >
          {props.userData.professionalHeadline}
        </Typography>
      </div>
      <Typography
        variant="body2"
        color="textPrimary"
        component="p"
        style={{ whiteSpace: "pre-line" }}
      >
        {props.userData.summaryOfBio}
      </Typography>
    </Paper>
  );
}
