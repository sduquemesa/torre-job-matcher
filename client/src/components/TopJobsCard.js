import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  chiplist: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

function ChipList(props) {
  const classes = useStyles();
  const chipData = props.strengths;

  return (
    <Paper component="ul" className={classes.chiplist} elevation={0}>
      {chipData.map((data) => {
        return (
          <li key={data}>
            <Chip
              label={data}
              size="small"
              variant="outlined"
              className={classes.chip}
              color="primary"
            />
          </li>
        );
      })}
    </Paper>
  );
}

function JobCard(props) {
  const [jobData, setJobData] = React.useState({});
  const classes = useStyles();

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://torre-job-matcher.rj.r.appspot.com/api/jobs/${props.jobId}`
      );
      setJobData(data);
      console.log(data);
    })();
  }, []);

  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt={jobData.objective}
        height="140"
        image={jobData.cover_img}
        title={jobData.objective}
      />
      <CardContent className={classes.root}>
        <div>
          <Typography gutterBottom variant="subtitle2" component="h2">
            {jobData.objective}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Match: {Math.round(props.jobScore * 100)}%
          </Typography>
        </div>
        {jobData?.strengths !== undefined ? (
          <ChipList strengths={jobData.strengths} />
        ) : null}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          <a
            href={`https://torre.co/jobs/${jobData.job_id}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            Learn More
          </a>
        </Button>
      </CardActions>
    </Card>
  );
}

export default function TopJobsCard(props) {
  return (
    // <Grid container spacing={3}>
    <>
      {props.topJobs.slice(0, 6).map((job) => {
        return (
          <Grid item xs={12} md={4} xl={3}>
            <JobCard jobId={job.id} jobScore={job.score} />
          </Grid>
        );
      })}
    </>
    // </Grid>
  );
}
