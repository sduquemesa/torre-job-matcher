import React from "react";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import { XYPlot, MarkSeries, LabelSeries } from "react-vis";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
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
  breadcrumbs: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

function randomFloat(min, max) {
  return min + (max - min) * Math.random();
}

function BubblePlot(props) {
  const data_in = props.strengthStats
    .filter((strength) => {
      return props.userStrengths.includes(strength.name);
    })
    .map((strength) => {
      return {
        x: randomFloat(1, 4),
        y: randomFloat(1, 4),
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
        y: randomFloat(1, 4),
        label: strength.name,
        size: strength.frequency,
      };
    });

  const data_kwds = props.keywords.map((kwd) => {
    return {
      x: randomFloat(1, 4),
      y: randomFloat(1, 4),
      label: kwd,
      size: 1,
    };
  });

  return (
    <XYPlot
      xDomain={[0, 5]}
      yDomain={[0, 5]}
      width={props.size.width}
      height={props.size.height}
    >
      <MarkSeries
        className="bubble-chart"
        strokeWidth={1}
        stroke="#322214"
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
        strokeWidth={1}
        stroke="#322214"
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
        strokeWidth={1}
        stroke="#322214"
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

function ChipList(props) {
  const classes = useStyles();
  const chipData = props.strengthStats
    .filter((strength) => {
      return props.userStrengths.includes(strength.name);
    })
    .map((strength) => {
      return {
        label: strength.name,
        key: `${strength.name}-chip`,
      };
    });

  const data_out = props.strengthStats
    .filter((strength) => {
      return !props.userStrengths.includes(strength.name);
    })
    .map((strength) => {
      return {
        label: strength.name,
      };
    });

  const data_kwds = props.keywords;

  return (
    <Paper component="ul" className={classes.chiplist} elevation={0}>
      {chipData.map((data) => {
        return (
          <li key={data.key}>
            <Chip label={data.label} className={classes.chip} color="primary" />
          </li>
        );
      })}
      {data_out.map((data) => {
        return (
          <li key={data.key}>
            <Chip
              label={data.label}
              className={classes.chip}
              color="secondary"
            />
          </li>
        );
      })}
      {/* {data_kwds.map((data) => {
        return (
          <li key={data}>
            <Chip label={data} className={classes.chip} variant="outlined" />
          </li>
        );
      })} */}
    </Paper>
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
          Skills recruiters and companies are looking for
        </Typography>
      </CardContent>
      {/* {parentSize ? (
        <BubblePlot
          strengthStats={props.strengthStats}
          userStrengths={props.userStrengths}
          keywords={props.keywords}
          size={parentSize}
        />
      ) : null} */}
      <ChipList
        strengthStats={props.strengthStats}
        userStrengths={props.userStrengths}
        keywords={props.keywords}
      />
      <Breadcrumbs
        aria-label="breadcrumb"
        className={classes.breadcrumbs}
        separator="    "
      >
        <>
          <Chip
            label="  "
            className={classes.chip}
            color="primary"
            size="small"
          />
          <Typography color="textSecondary" gutterBottom>
            In Genome!
          </Typography>
        </>
        <>
          <Chip
            label=""
            className={classes.chip}
            color="secondary"
            size="small"
          />
          <Typography color="textSecondary" gutterBottom>
            Is Missing
          </Typography>
        </>
      </Breadcrumbs>
    </Card>
  );
}
