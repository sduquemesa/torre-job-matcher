import axios from "axios";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

InputForm.propTypes = {
  search_type: PropTypes.string,
  label: PropTypes.string,
  parentCallback: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function InputForm(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const loading = open && options.length === 0;

  const classes = useStyles();

  React.useEffect(() => {
    let active = true;

    (async () => {
      let suggestions = [];
      if (props.search_type === "opportunity") {
        const response = await axios.get(
          `https://torre.co/api/strengths?limit=5&q=${inputValue}&context=add-opportunity&locale=en`
        );
        suggestions = response.data.map((val) => {
          return { name: val.term };
        });
      } else if (props.search_type === "people") {
        const response = await axios.get(
          `https://torre-job-matcher.rj.r.appspot.com/api/users/?text=${inputValue}&size=5&offset=0`
        );
        suggestions = response.data;
      }

      if (active) {
        setOptions(suggestions);
      }
    })();

    return () => {
      active = false;
    };
  }, [props.search_type, loading, value, inputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id={`input-${props.search_type}`}
      autoComplete={true}
      autoHighlight={true}
      autoSelect={true}
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => {
        if (value.name !== undefined) {
          return option.name === value.name;
        } else {
          return false;
        }
      }}
      getOptionLabel={(option) => (option?.name ? option.name : "")}
      options={options}
      loading={loading}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        props.parentCallback(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={props.label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(option) => (
        // <React.Fragment>
        //   {option.name}
        //   <Typography variant="body2" color="textSecondary">
        //     {option?.username ? <span>{option.username}</span> : null}
        //   </Typography>
        // </React.Fragment>
        <Grid container alignItems="center" className={classes.root}>
          {option?.username ? (
            <Grid item>
              <Avatar alt={option.name} src={`${option.picture}`} />
            </Grid>
          ) : null}
          <Grid item xs>
            <span key={`text-${option.name}`} style={{ fontWeight: 400 }}>
              {option.name}
            </span>

            <Typography variant="body2" color="textSecondary">
              {option?.username ? <span>{option.username}</span> : null}
            </Typography>
          </Grid>
        </Grid>
      )}
    />
  );
}
