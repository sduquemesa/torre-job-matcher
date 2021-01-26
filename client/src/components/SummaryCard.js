import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function SummaryCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" color="textPrimary">
          Summary of job listings
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          The most representative phrases in the job texts
        </Typography>
        <Typography style={{ whiteSpace: "pre-line" }} variant="body2">
          <ul>
            {props.phrases.split("\n").map((line, index) => {
              return <li id={index}>{line}</li>;
            })}
          </ul>
        </Typography>
      </CardContent>
    </Card>
  );
}
