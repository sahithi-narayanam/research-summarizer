# summarizer/ranking_utils.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def rank_papers(papers, query):
    contents = [paper['title'] + ' ' + paper['summary'] for paper in papers]
    texts = [query] + contents

    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(texts)

    scores = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
    ranked = sorted(zip(papers, scores), key=lambda x: x[1], reverse=True)
    return [paper for paper, _ in ranked]
