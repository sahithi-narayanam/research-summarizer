import os
from fastapi import FastAPI, Request, Query
from fastapi.middleware.cors import CORSMiddleware
from arxiv_fetcher import fetch_papers
from summarizer.pdf_utils import download_pdf, extract_text_from_pdf
from summarizer.model import summarize_text
from summarizer.ranking_utils import rank_papers  # ✅ Import ranking

app = FastAPI()

# Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Root Endpoint
@app.get("/")
def root():
    """
    Root endpoint to check if the API is running.
    """
    return {"message": "Research Summarizer API is running!"}

# Papers Endpoint
@app.get("/papers")
def get_papers(
    topic: str = Query(..., description="Topic to search (e.g. AI, Science, Medicine)"),
    limit: int = Query(5, description="Number of papers to fetch")
):
    """
    Fetch papers based on the provided topic and limit.
    Ranks the papers and includes necessary metadata in the response.
    """
    try:
        papers = fetch_papers(topic, max_results=limit)
        ranked_papers = rank_papers(papers, topic)

        response = [
            {
                "id": i,
                "title": paper.get("title", ""),
                "authors": paper.get("authors", []),
                "url": paper.get("url", ""),
                "abstract": paper.get("summary", ""), 
                "published": paper.get("published", "")  # Summary will be fetched separately
            }
            for i, paper in enumerate(ranked_papers)
        ]
        return {"topic": topic, "ranked_papers": response}

    except Exception as e:
        return {"error": str(e)}

# Summarize a Paper Endpoint
@app.get("/summarize-paper/")
def summarize_paper(arxiv_url: str = Query(..., description="arXiv abstract URL")):
    """
    Summarize a specific paper given its arXiv URL.
    Downloads the PDF, extracts its text, and generates a summary.
    """
    try:
        print(f"Fetching PDF from: {arxiv_url}")
        pdf_path = download_pdf(arxiv_url)
        print(f"PDF downloaded to: {pdf_path}")

        full_text = extract_text_from_pdf(pdf_path)
        print(f"Extracted text length: {len(full_text)} characters")

        summary = summarize_text(full_text)
        print(f"Generated summary: {summary}")

        # Delete temporary PDF
        if os.path.exists(pdf_path):
            os.remove(pdf_path)

        return {"summary": summary}

    except Exception as e:
        print(f"Error during summarization: {e}")
        return {"error": str(e)}

# Summarize Multiple Papers Endpoint
@app.post("/summarize")
async def summarize(request: Request):
    """
    Summarize multiple papers based on the provided topic and number of papers.
    Fetches papers, ranks them, and generates summaries for each.
    """
    data = await request.json()
    topic = data["topic"]
    num_papers = data["num_papers"]

    try:
        papers = fetch_papers(topic, max_results=num_papers)
        ranked_papers = rank_papers(papers, topic)

        summaries = []
        for paper in ranked_papers:
            pdf_path = download_pdf(paper["url"])  # Assuming each paper has a URL field
            full_text = extract_text_from_pdf(pdf_path)
            summary = summarize_text(full_text)

            # Delete temporary PDF
            if os.path.exists(pdf_path):
                os.remove(pdf_path)

            summaries.append(summary)

        return {"summaries": summaries}

    except Exception as e:
        return {"error": str(e)}
