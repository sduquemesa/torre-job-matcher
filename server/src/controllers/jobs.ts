import axios, {AxiosResponse} from 'axios';

const response = await axios.get(`https://bio.torre.co/api/bios/${inRequest.params.username}`);