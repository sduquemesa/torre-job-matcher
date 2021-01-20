from collections import Counter
import itertools

from nltk.tokenize import sent_tokenize, RegexpTokenizer
from nltk.corpus import stopwords
stop_words = set(stopwords.words('english'))  

import nltk
nltk.download('punkt')

import gensim


def parse_data(data: dict) -> dict:
    """Gets data posted to the match endpoint and prepares it for analysis
    
    @params: 
    data: dict with nested user and job data

    @returns
    dictionary with flattened user and job data
    """
    
    # Get and merge job data into a single document per job
    job_data = data['jobs_data']
    strenghts_list = []
    for job in job_data:
        flattened_text = ' '.join(job['job_data']['details'] + [job['job_data']['objective']])
        job['job_data']['as_document'] = flattened_text

        strenghts_list.append(job['job_data']['strengths'])

    strenghts_stats = dict(Counter(list(itertools.chain(*strenghts_list))))

    # Get and merge user data into a single document per job
    user_data = data['user_data']
    user_data['as_document'] = ' '.join([user_data['professionalHeadline'],user_data['summaryOfBio']])

    return {'jobs_data': job_data, 'user_data': user_data, 'required_strengths': strenghts_stats}

def tokenize_documents(data: dict) -> dict:
    ''' tokenize documents and remove stopwords
    '''

    tokenizer = RegexpTokenizer(r'\w+')
    docs = []

    # from jobs info
    job_data = data['jobs_data']
    for job in job_data:
        sentence_tokens = sent_tokenize(job['job_data']['as_document'])
        word_tokens = [[word.lower() for word in tokenizer.tokenize(sentence) if word.lower() not in stop_words]
                        for sentence in sentence_tokens]
        job['job_data']['tokens'] = word_tokens
        docs.append[word_tokens]


    # from user info
    user_data = data['user_data']
    sentence_tokens = sent_tokenize(user_data['as_document'])
    word_tokens = [[word.lower() for word in tokenizer.tokenize(sentence) if word.lower() not in stop_words]
                        for sentence in sentence_tokens]
    user_data['tokens'] = word_tokens
    docs.append[word_tokens]

    # create dictionary
    dictionary = gensim.corpora.Dictionary(docs)
    print(dictionary)

    return data

def create_corpus(data: dict) -> dict:

    # Create bag of words




def analize(data: dict):
    """
    """

    data = parse_data(data)
    data = tokenize_documents(data)
    data = create_corpus(data)


    return data