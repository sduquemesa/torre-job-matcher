import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
});

export default function SummaryCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6" color="textPrimary">
          Summary
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Most frequent phrases in job offers
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
