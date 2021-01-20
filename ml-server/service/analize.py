from collections import Counter
import itertools

from nltk.tokenize import sent_tokenize, RegexpTokenizer
from nltk.corpus import stopwords
stop_words = set(stopwords.words('english'))  

import nltk
nltk.download('punkt')

import gensim
from gensim.summarization import summarize, keywords

import numpy as np

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
    flat_text = ''

    # from jobs info
    job_data = data['jobs_data']
    for job in job_data:
        flat_text += job['job_data']['as_document']
        sentence_tokens = sent_tokenize(job['job_data']['as_document'])
        word_tokens = [[word.lower() for word in tokenizer.tokenize(sentence) if word.lower() not in stop_words]
                        for sentence in sentence_tokens]
        job['job_data']['tokens'] = word_tokens
        docs.extend([sentence for sentence in word_tokens])


    # from user info
    user_data = data['user_data']
    sentence_tokens = sent_tokenize(user_data['as_document'])
    word_tokens = [[word.lower() for word in tokenizer.tokenize(sentence) if word.lower() not in stop_words]
                        for sentence in sentence_tokens]
    user_data['tokens'] = word_tokens

    # create dictionary
    dictionary = gensim.corpora.Dictionary(docs)
    
    # create corpus
    corpus = [dictionary.doc2bow(doc) for doc in docs]

    # TF-IDF
    tf_idf = gensim.models.TfidfModel(corpus)
    # for doc in tf_idf[corpus]:
    #     print([[dictionary[id], np.around(freq, decimals=2)] for id, freq in doc])


    # similarity measure
    sims = gensim.similarities.Similarity('./service/index_data',tf_idf[corpus],
                                        num_features=len(dictionary))

    # create query document from user info, update an existing dictionary and create bag of words
    print(user_data['tokens'])
    user_doc_bow = dictionary.doc2bow(list(itertools.chain(*user_data['tokens'])))

    # perform a similarity query against the corpus
    query_doc_tf_idf = tf_idf[user_doc_bow]
    # print('Comparing Result:', sims[query_doc_tf_idf])
    print(np.mean(sims[query_doc_tf_idf]))
    print(np.max(sims[query_doc_tf_idf]))


    # Summarize

    # collapse = lambda lst: ' ' .join(itertools.chain.from_iterable(lst))
    # plain_jobs_text = collapse(docs)
    print(summarize(flat_text, word_count = 50), keywords(flat_text, ratio = 0.01))

    return data



def analize(data: dict):
    """
    """

    data = parse_data(data)
    data = tokenize_documents(data)


    return data