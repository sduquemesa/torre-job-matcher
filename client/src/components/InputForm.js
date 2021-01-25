import axios from 'axios';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function InputForm(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");

  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      let suggestions = [];
      if (props.search_type === "opportunity") {
        const response = await axios.get(
          `https://torre.co/api/strengths?limit=5&q=${text}&context=add-opportunity&locale=en`
        );
        // console.log(response.data);
        suggestions = response.data.map((val) => {
          return { name: val.term };
        });
        // console.log(suggestions);
      } else if (props.search_type === "people") {
        const response = await axios({
          method: "post",
          url: `https://search.torre.co/people/_search/?size=5&lang=en&aggregate=false&offset=0`,
          headers: {},
          data: { name: { term: text } },
        });
        // console.log(response.data.results);
        suggestions = response.data.results.map((val) => {
          return { name: val.name, username: val.username };
        });
      }

      if (active) {
        setOptions(suggestions);
      }
    })();

    return () => {
      active = false;
    };
  }, [props.search_type, loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => option.name}
      options={options}
      loading={loading}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
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
    />
  );
}
