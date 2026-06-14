
def summarize_article(text):
    if not text:
        return "No content to summarize."

    sentences = text.split(".")
    return ".".join(sentences[:3])