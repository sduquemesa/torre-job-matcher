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

  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      let suggestions = [];
      const query = value?.name ? value.name : '';
      if (props.search_type === 'opportunity') {
        const response = await axios.get(
          `https://torre.co/api/strengths?limit=5&q=${query}&context=add-opportunity&locale=en`,
        );
        suggestions = response.data.map((val) => {
          return { name: val.term };
        });
      } else if (props.search_type === 'people') {
        const response = await axios({
          method: 'POST',
          url: `https://search.torre.co/people/_search/?size=5&lang=en&aggregate=false&offset=0`,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
          },
          data: { name: { term: query } },
        });
        suggestions = response.data.results.map((val) => {
          return {
            name: val.name,
            username: val.username,
          };
        });
      }

      if (active) {
        setOptions(suggestions);
      }
    })();

    return () => {
      active = false;
    };
  }, [props.search_type, loading, value]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
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
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={(option) => (option.name ? option.name : '')}
      options={options}
      loading={loading}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        props.parentCallback(newValue.name);
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
