def summarize_text(text):
    # TEMPORARY MOCK: Only returns the first 3 lines of the text
    lines = text.split(". ")
    return ". ".join(lines[:3]) + "..."
