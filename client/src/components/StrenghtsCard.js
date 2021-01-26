import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { XYPlot, MarkSeries, LabelSeries } from "react-vis";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-evenly",
    // alignItems: "center",
  },
  textValue: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  container: {
    position: "relative",
    width: "300px",
    height: "300px",
    margin: "auto",
  },
  plot: {
    width: "300px",
    height: "300px",
    margin: "auto",
    // backgroundColor: "green",
  },
});

function randomFloat(min, max) {
  return min + (max - min) * Math.random();
}

function BubblePlot(props) {
  console.log(props.strengthStats, props.userStrengths);
  const data_in = props.strengthStats
    .filter((strength) => {
      return props.userStrengths.includes(strength.name);
    })
    .map((strength) => {
      return {
        x: randomFloat(1, 4),
        y: randomFloat(2, 20),
        label: strength.name,
        size: strength.frequency,
      };
    });

  const data_out = props.strengthStats
    .filter((strength) => {
      return !props.userStrengths.includes(strength.name);
    })
    .map((strength) => {
      return {
        x: randomFloat(1, 4),
        y: randomFloat(2, 20),
        label: strength.name,
        size: strength.frequency,
      };
    });

  const data_kwds = props.keywords.map((kwd) => {
    return {
      x: randomFloat(1, 4),
      y: randomFloat(2, 20),
      label: kwd,
      size: 1,
    };
  });

  return (
    <XYPlot
      yDomain={[0, 22]}
      xDomain={[0, 5]}
      width={props.size.width}
      height={props.size.height}
    >
      <MarkSeries
        className="bubble-chart"
        strokeWidth={2}
        sizeRange={[5, 30]}
        data={data_in}
        color="#CDDC39"
      />
      <LabelSeries
        animation
        allowOffsetToBeReversed
        data={data_in}
        labelAnchorX="middle"
        labelAnchorY="start"
      />
      <MarkSeries
        className="bubble-chart"
        strokeWidth={2}
        sizeRange={[5, 30]}
        data={data_out}
        color="#EF476F"
      />
      <LabelSeries
        animation
        allowOffsetToBeReversed
        data={data_out}
        labelAnchorX="middle"
        labelAnchorY="start"
      />
      <MarkSeries
        className="bubble-chart"
        strokeWidth={2}
        sizeRange={[5, 30]}
        data={data_kwds}
        color="#00ACC1"
      />
      <LabelSeries
        animation
        allowOffsetToBeReversed
        data={data_kwds}
        labelAnchorX="middle"
        labelAnchorY="start"
      />
    </XYPlot>
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
          Keywords & Strenghts
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          This are the most representative words in the job listings and the
          required strenghts.
        </Typography>
      </CardContent>
      {parentSize ? (
        <BubblePlot
          strengthStats={props.strengthStats}
          userStrengths={props.userStrengths}
          keywords={props.keywords}
          size={parentSize}
        />
      ) : null}
    </Card>
  );
}
