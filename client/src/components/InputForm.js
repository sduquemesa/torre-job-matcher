import axios from 'axios';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function InputForm(props) {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [text, setText] = React.useState('');
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        // if (!loading) {
        //     return undefined;
        // }

        (async () => {

            let suggestions = [];
            if (props.search_type === 'opportunity') {
                const response = await axios.get(`https://torre.co/api/strengths?limit=5&q=${text}&context=add-opportunity&locale=en`);
                // console.log(response.data);
                suggestions = response.data.map(val => {return {name: val.term}});
                // console.log(suggestions);
            } else if (props.search_type === 'people') {
                const response = await axios({
                    method: 'post',
                    url: `https://search.torre.co/people/_search/?size=5&lang=en&aggregate=false&offset=0`,
                    headers: {},
                    data: {"name":{"term":text}}
                });
                // console.log(response.data.results);
                suggestions = response.data.results.map(val => {return {name: val.name}});
            }

            if (active) {
                setOptions(suggestions);
            }

        })();

        return () => {
            active = false;
        };
    }, [text, props.search_type]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.parentCallback(event.target.value);
        }
    }

    return (
        <Autocomplete
            id={`${props.search_type}-textfield`}
            autoComplete={true}
            style={{width: '50vw'}}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={(event)=>setText(event.target.value)}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            options={options}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                    // onChange={(event)=>setText(event.target.value)}
                    onKeyDown={(event)=>handleKeyDown(event)}
                />
            )}
        />
    );
}
