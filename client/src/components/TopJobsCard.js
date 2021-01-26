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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-evenly",
    // alignItems: "center",
  },
}));

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
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleExpandClick}>
          {expanded ? "Less" : "Learn More"}
        </Button>
        <Button size="small" color="primary">
          <a
            href={`https://torre.co/jobs/${jobData.job_id}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            visit
          </a>
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography
          variant="body2"
          color="textSecondary"
          component="ul"
          style={{ whiteSpace: "pre-line", marginBottom: "20px" }}
        >
          {jobData.details}
        </Typography>
      </Collapse>
    </Card>
  );
}

export default function TopJobsCard(props) {
  return (
    // <Grid container spacing={3}>
    <>
      {props.topJobs.slice(0, 4).map((job) => {
        return (
          <Grid item xs={12} sm={6} lg={3}>
            <JobCard jobId={job.id} jobScore={job.score} />
          </Grid>
        );
      })}
    </>
    // </Grid>
  );
}
