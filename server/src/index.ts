import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import bodyParser from 'body-parser';
import {IUserData, IJobData, ISearchData, ISearchQueryParams, IMatchQueryParams, IMatchData} from './types';
import {UsersWorker, JobsWorker, SearchWorker, MatchWorker } from './controllers';

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
      const userWorker: UsersWorker = new UsersWorker(inRequest.params.username);
      const user_data: IUserData | undefined = await userWorker.getUserData();
      inResponse.json(user_data);
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
      const query_params: ISearchQueryParams = {
        text_query: inRequest.query.text,
        size: inRequest.query.size,
        offset: inRequest.query.offset,
        aggregate: inRequest.query.aggregate,
        lang: inRequest.query.lang
      }


      if (query_params.text_query !== undefined) {
        const searchWorker: SearchWorker = new SearchWorker(query_params);
        const job_results: ISearchData[] | undefined = await searchWorker.getJobs();
        inResponse.json(job_results);
      } else {
        inResponse.json({error: 'invalid text query'});
      }

    } catch (error) {
      console.log(error);
      inResponse.send('error');
    }
  }
);


// Get job info
app.get('/api/jobs/:id',
  async (inRequest: Request, inResponse: Response) => {
    console.log(`GET /api/jobs/${inRequest.params.id}`);
    try {
      const jobsWorker: JobsWorker = new JobsWorker(inRequest.params.id);
      const job_data: IJobData | undefined = await jobsWorker.getJobData();
      inResponse.json(job_data);
    } catch (error) {
      console.log(error);
      inResponse.send('error');
    }
  }
);

// Get job match info
app.get('/api/match',
  async (inRequest: Request, inResponse: Response) => {
    console.log(`GET /api/match/`, inRequest.query);
    try {
      const query_params: IMatchQueryParams = {
        username: inRequest.query.username,
        search_params: {
          text_query: inRequest.query.text,
          size: inRequest.query.size,
          offset: inRequest.query.offset,
          aggregate: inRequest.query.aggregate,
          lang: inRequest.query.lang
        }
      }
      const matchWorker: MatchWorker = new MatchWorker(query_params);
      const match_data: IMatchData | undefined = await matchWorker.getMatchData();
      inResponse.json(match_data);
    } catch (error) {
      console.log(error);
      inResponse.send('error');
    }
  }
);

