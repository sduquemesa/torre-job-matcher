# Torre | Your Career Pathway

<!-- ABOUT THE PROJECT -->

## About The Project

![Webpage screeenshot](UIdesign/screeenshots/Desktop/results-frame.png?raw=true "UI")

This app is an analytics tool that allows Torre users to match their genome to job listings as well suggesting
possible new skills, phrases and keywords to better match their CV to a desired job or opportunity. To
do this the text of the opportunities and of the user genome is analyzed and matched by a couple of natural
language processing ML algorithms.

I thought of this as a user centric application where you can get feedback on how to improve your profile
to better match your desired job —I do think that job platforms should be focused as well in the
user professional growth and not only geared towards recruiter needs, which is always my general feeling with this kind of platforms.

If you have a verified account at Torre and alredy filled your genome info, check and try out the app [here](https://torre-frontend.web.app/)!

### Built With

#### Backend

- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [Express](http://expressjs.com/)

#### NLP service

- [Python 3](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/1.1.x/)
- [GENSIM](https://radimrehurek.com/gensim/)
- [NLTK](https://www.nltk.org/)

#### Frontend

- [ReactJS](https://reactjs.org/)
- [MATERIAL-UI](https://material-ui.com/)

<!-- GETTING STARTED -->

## Getting Started

Setting up your project locally.
To get a local copy up and running follow these steps.

### Installation

1.  ```sh
    git clone https://github.com/sduquemesa/torre-job-matcher.git
    ```
2.  Install NPM packages
    ```sh
    cd server && npm install && cd ..;
    cd client && npm install && cd ..;
    ```
3.  Create python virtual environment
    ```sh
    cd ml-server && python3 -m venv env;
    source env/bin/activate;
    pip install -r requirements.txt;
    ```

<!-- USAGE EXAMPLES -->

## Usage

To see how to run each service go to the respective folder

- [Backend](server/)
- [Frontend](client/)
- [ML service](ml-server/)
