import requests
import xml.etree.ElementTree as ET
from summarizer.ranking_utils import rank_papers

def fetch_papers(topic, max_results=10):
    """
    Fetches research papers from arXiv based on the given topic.

    Args:
        topic (str): The topic to search for (e.g., 'AI', 'Medicine').
        max_results (int): The maximum number of papers to fetch.

    Returns:
        list[dict]: A list of dictionaries containing paper details (title, summary, url, authors, published).
    """
    base_url = "http://export.arxiv.org/api/query"
    query = f"search_query=all:{topic}&start=0&max_results={max_results}"

    try:
        response = requests.get(f"{base_url}?{query}")
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching papers from arXiv: {e}")
        return []

    try:
        root = ET.fromstring(response.content)

        # Correct namespaces
        ns = {
            'atom': 'http://www.w3.org/2005/Atom',
            'arxiv': 'http://arxiv.org/schemas/atom'
        }

        papers = []
        for entry in root.findall('atom:entry', ns):
            authors = [
                author.find('atom:name', ns).text.strip()
                for author in entry.findall('atom:author', ns)
            ]

            paper = {
                'title': entry.find('atom:title', ns).text.strip(),
                'summary': entry.find('atom:summary', ns).text.strip(),
                'url': entry.find('atom:id', ns).text.strip(),
                'authors': authors,
                'published': entry.find('atom:published', ns).text.strip()
            }

            papers.append(paper)

        # Rank papers before returning
        ranked = rank_papers(papers, topic)
        return ranked

    except ET.ParseError as e:
        print(f"Error parsing arXiv XML response: {e}")
        return []
    except Exception as e:
        print(f"Unexpected error processing arXiv data: {e}")
        return []
