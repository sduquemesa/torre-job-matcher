import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from 'body-parser';
const axios = require('axios').default;

// Create Express app
const app: Express = express();

// Add json parsing middleware to app
app.use(express.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static resources in client folder
app.use("/",
  express.static(path.join(__dirname, '../../client/dist'))
);

// Set CORS policy
app.use((inRequest: Request, inResponse: Response, inNext: NextFunction) => {
  inResponse.header('Access-Control-Allow-Origin', '*');
  inResponse.header('Access-Control-Allow-Methods', "GET,OPTIONS");
  inResponse.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
  inNext();
});

// Start express app
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
  console.log(`Express server listening on `, server.address());
});


// *** REST API endpoints *** //

// Get user info
app.get('/api/user/:username',
  async (inRequest: Request, inResponse: Response) => {
    console.log(`GET /api/users/${inRequest.params.username}`);
    try {
      const response = await axios.get(`https://bio.torre.co/api/bios/${inRequest.params.username}`);
      inResponse.json(response.data);
    } catch (error) {
      console.log(error);
      inResponse.send('error');
    }
  }
);

// Search for jobs in general
app.get('/api/jobs/search',
  async (inRequest: Request, inResponse: Response) => {
    console.log(`GET /api/jobs/search`);
    try {
      // Access the provided query parameters
      let offset = inRequest.query.offset;
      let size = inRequest.query.size;
      let aggregate = inRequest.query.aggregate;
      inResponse.json(`GET /api/jobs/search/?offset=${offset}&size=${size}&aggregate=${aggregate}`);
    } catch (error) {
      inResponse.send('error');
    }
  }
);


// Get job info
app.get('/api/jobs/:id',
  async (inRequest: Request, inResponse: Response) => {
    console.log(`GET /api/jobs/${inRequest.params.id}`);
    try {
      const response = await axios.get(`https://torre.co/api/opportunities/${inRequest.params.id}`);
      inResponse.json(response.data);
    } catch (error) {
      console.log(error);
      inResponse.send('error');
    }
  }
);

