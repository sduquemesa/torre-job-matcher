import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CountUp from "react-countup";

import { XYPlot, ArcSeries } from "react-vis";
const PI = Math.PI;

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  textValue: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    margin: "auto",
  },
  plot: {
    position: "relative",
    width: "100%",
    height: "100%",
    margin: "auto",
    // backgroundColor: "green",
  },
});

function ArcPlot(props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography
        variant="h1"
        color="textSecondary"
        className={classes.textValue}
      >
        <CountUp
          start={Math.round(props.valueToRender * 100) - 20}
          end={Math.round(props.valueToRender * 100)}
          suffix="%"
          useEasing
        />
      </Typography>
      <div className={classes.plot}>
        <XYPlot
          xDomain={[-3, 3]}
          yDomain={[-3, 3]}
          getAngle={(d) => d.value}
          getAngle0={(d) => 0}
          width={props.size.width}
          height={props.size.width}
          margin={0}
        >
          <ArcSeries
            animation={{
              damping: 10,
              stiffness: 100,
            }}
            radiusDomain={[0, 2]}
            color="#322214"
            data={[
              {
                value: 2 * PI,
                radius0: 1.8,
                radius: 1.78,
              },
            ]}
          />
          <ArcSeries
            animation={{
              damping: 8,
              stiffness: 5,
            }}
            radiusDomain={[0, 2]}
            color={props.valueToRender >= 0 ? "#CDDC39" : "#EF476F"}
            data={[
              {
                value: props.valueToRender * 2 * PI,
                radius0: 1.75,
                radius: 1.7,
              },
            ]}
          />
        </XYPlot>
      </div>
    </div>
  );
}

export default function MatchCircleCard(props) {
  const classes = useStyles();

  const [parentSize, setParentSize] = React.useState({});
  const parentRef = React.useRef(null);

  React.useEffect(() => {
    if (parentRef.current) {
      let parentHeight = parentRef.current.offsetHeight;
      let parentWidth = parentRef.current.offsetWidth;
      setParentSize({
        width: parentWidth,
        height: parentHeight,
      });
    }
  }, [parentRef]);

  return (
    <Card className={classes.root} ref={parentRef}>
      <CardContent>
        <Typography variant="h6" color="textPrimary">
          Match Score
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          How well you match the job listings.
        </Typography>
        <Typography
          variant="h1"
          color="textSecondary"
          // className={classes.textValue}
        >
          <CountUp
            start={Math.round(props.matchScore * 100) - 20}
            end={Math.round(props.matchScore * 100)}
            suffix="%"
            useEasing
          />
        </Typography>
      </CardContent>
      {/* {parentSize ? (
        // <ArcPlot valueToRender={props.matchScore} size={parentSize} />
      ) : null} */}
    </Card>
  );
}
