```
# Research Summarizer

**Research Summarizer** is an AI-powered full-stack web application that enables users to summarize complete research papers based on a given topic. It fetches papers from **arXiv**, downloads the **entire paper content**, and uses advanced transformer models like **BART** and **LED** to generate concise, high-quality summaries.

Built with a **React + Tailwind CSS frontend** and a **FastAPI backend**, the app provides a seamless experience for anyone looking to digest complex research faster.

---

## ✨ Features

- 🔍 **Topic-Based Search**: Enter any topic (e.g., “neural networks”) and fetch related papers from arXiv.
- 🧠 **AI-Powered Models**: Uses state-of-the-art NLP models (BART and LED) to generate summary for the selected paper that are both relevant and readable.
- 📊 **Relevance Ranking**: Displays papers in an order based on topic relevance.
- ⚡ **Clean, Responsive UI**: Built using React and Tailwind CSS for a fast and elegant user experience.
- 🔗 **Direct Links to Papers**: Users can access the original paper via arXiv.

---

## 🛠️ Tech Stack

| Frontend        | Backend            | AI / NLP Models     |
|-----------------|--------------------|---------------------|
| React.js        | FastAPI (Python)   | BART (general), LED (long docs) |
| Tailwind CSS    | Uvicorn (ASGI)     | Hugging Face Transformers |

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sahithi-narayanam/research-summarizer.git
   cd research-summarizer/research-summarizer-backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

📍 Server runs at: `http://localhost:8000`

---

### 🔹 Frontend Setup

1. Go to the frontend directory:
   ```bash
   cd ../research-summarizer-frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm start
   ```

📍 Frontend runs at: `http://localhost:3000`

---

## 🚀 How to Use

1. Open the app in your browser at `http://localhost:3000`.
2. Enter a **research topic** you're interested in.
3. Choose how many papers to fetch.
4. Click **Search**.
5. The app will fetch papers, extract their full content, summarize them, and display results with links to the original sources.

---

## 📌 Future Plans

- 🧾 Download summary reports as PDF or text files.
- 🔐 User accounts to save history or favorite summaries.
- 🧠 Switch between summarization models for custom output.
- 🧬 Add more sources like PubMed, Springer, or Semantic Scholar.

---

## 🤝 Contributing

Interested in contributing? Here's how:

1. Fork this repo
2. Create a branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes
4. Commit and push:
   ```bash
   git commit -m "Added new feature"
   git push origin feature/your-feature
   ```
5. Open a Pull Request 🚀

---

## 🙏 Acknowledgments

- [arXiv API](https://arxiv.org/help/api/) for providing access to academic papers.
- [Hugging Face](https://huggingface.co/) for the powerful NLP models.
- [FastAPI](https://fastapi.tiangolo.com/) for making backend development seamless.
- [Tailwind CSS](https://tailwindcss.com/) for beautiful UI styling.
```
