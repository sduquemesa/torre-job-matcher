from collections import Counter
import itertools

from nltk.tokenize import sent_tokenize, RegexpTokenizer
from nltk.corpus import stopwords
stop_words = set(stopwords.words('english'))  

from nltk.stem import PorterStemmer 
ps = PorterStemmer() 

import nltk

import gensim
from gensim.summarization import keywords
from gensim.summarization.summarizer import summarize 
from gensim import models
from gensim import similarities



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
    for job in job_data:
        flattened_text = ' '.join(job['job_data']['details'] + [job['job_data']['objective']])
        job['job_data']['as_document'] = flattened_text


    # Get and merge user data into a single document per job
    user_data = data['user_data']
    user_data['as_document'] = ' '.join([user_data['professionalHeadline'],user_data['summaryOfBio']])

    return {'jobs_data': job_data, 'user_data': user_data}

def tokenize_documents(data: dict) -> dict:
    ''' tokenize documents and remove stopwords
    '''

    tokenizer = RegexpTokenizer(r'\w+')
    docs = []
    strenghts_list = []
    flat_text = ''

    # from jobs info
    jobs_data = data['jobs_data']
    for job in jobs_data:
        flat_text += job['job_data']['as_document']
        sentence_tokens = sent_tokenize(job['job_data']['as_document'])
        word_tokens = [[word.lower() for word in tokenizer.tokenize(sentence) if word.lower() not in stop_words]
                        for sentence in sentence_tokens]
        job['job_data']['tokens'] = word_tokens
        docs.append(list(itertools.chain(*word_tokens)))

        strenghts_list.append(job['job_data']['strengths'])

    strenghts_stats = Counter(list(itertools.chain(*strenghts_list))).most_common(10)
    strenghts_dict = [{'name': name, 'frequency': freq} for name, freq in strenghts_stats]

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

    # create query document from user info, update an existing dictionary and create bag of words
    user_doc_bow = dictionary.doc2bow(list(itertools.chain(*user_data['tokens'])))

    # Similarity query using LSI
    lsi = models.LsiModel(corpus, id2word=dictionary, num_topics=10)
    vec_lsi = lsi[user_doc_bow]  # convert the query to LSI space

    index = similarities.MatrixSimilarity(lsi[corpus])  # transform corpus to LSI space and index it

    sims = index[vec_lsi]  # perform a similarity query against the corpus
    # print(list(enumerate(sims)))  # print (document_number, document_similarity) 2-tuples

    sims = sorted(enumerate(sims), key=lambda item: -item[1])
    # for doc_position, doc_score in sims:
    #     print(doc_score, jobs_data[doc_position]['id'])

    job_similarity_list = [{'id':jobs_data[doc_position]['id'],'score': str(doc_score)} for doc_position, doc_score in sims ]
    # job_similarity_list = [{'id':1,'score':1} for doc_position, doc_score in sims ]
    job_similarity_mean = np.mean([ doc_score for doc_position, doc_score in sims ])

    # Summarize
    summary = summarize(flat_text, word_count = 100).replace('•', ' ')
    # print(summary)

    # get keywords
    keywords_list = [key for key, grp in itertools.groupby([ps.stem(keyword) for keyword in keywords(flat_text).split('\n')])]
    # print(keywords_list)

    analysis_result = {'summary': summary,
                        'keywords': keywords_list[:10],
                        'global_match_score': str(job_similarity_mean), 
                        'job_score': job_similarity_list,
                        'strenght_stats': strenghts_dict
                        }

    return analysis_result



def analize(data: dict):

    data = parse_data(data)
    result = tokenize_documents(data)


    return result