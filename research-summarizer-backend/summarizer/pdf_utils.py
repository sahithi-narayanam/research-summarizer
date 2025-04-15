import requests
import fitz  # PyMuPDF
import os

def download_pdf(arxiv_url, save_path="temp_paper.pdf"):
    pdf_url = arxiv_url.replace("/abs/", "/pdf/") + ".pdf"
    response = requests.get(pdf_url)
    
    if response.status_code != 200:
        raise Exception(f"Failed to download PDF from {pdf_url}")
    
    with open(save_path, "wb") as f:
        f.write(response.content)
    
    return save_path

def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text()
    return full_text
