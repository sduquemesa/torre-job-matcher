import axios from 'axios';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

InputForm.propTypes = {
  search_type: PropTypes.string,
  label: PropTypes.string,
  parentCallback: PropTypes.func,
};

export default function InputForm(props) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    (async () => {
      let suggestions = [];
      if (props.search_type === 'opportunity') {
        console.log(inputValue);
        const response = await axios.get(
          `https://torre.co/api/strengths?limit=5&q=${inputValue}&context=add-opportunity&locale=en`,
        );
        suggestions = response.data.map((val) => {
          return { name: val.term };
        });
      } else if (props.search_type === 'people') {
        const response = await axios.get(
          `https://torre-job-matcher.rj.r.appspot.com/api/users/?text=${inputValue}&size=5&offset=0`,
        );
        console.log(response.data);
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
        // console.log(option, value);
        if (value.name !== undefined) {
          return option.name === value.name;
        } else {
          return false;
        }
      }}
      getOptionLabel={(option) => (option?.name ? option.name : '')}
      options={options}
      loading={loading}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        props.parentCallback(newValue?.name);
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
