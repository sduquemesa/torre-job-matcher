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
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-evenly",
    // alignItems: "center",
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
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://torre-job-matcher.rj.r.appspot.com/api/jobs/${props.jobId}`
      );
      setJobData(data);
      console.log(data);
    })();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={jobData.objective}
          height="140"
          image={jobData.cover_img}
          title={jobData.objective}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {jobData.objective}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Match: {Math.round(props.jobScore * 100)}%
          </Typography>
          {jobData?.strengths !== undefined ? (
            <ChipList strengths={jobData.strengths} />
          ) : null}
        </CardContent>
      </CardActionArea>
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
      {props.topJobs.slice(0, 4).map((job) => {
        return (
          <Grid item xs={12} md={6} xl={3}>
            <JobCard jobId={job.id} jobScore={job.score} />
          </Grid>
        );
      })}
    </>
    // </Grid>
  );
}
