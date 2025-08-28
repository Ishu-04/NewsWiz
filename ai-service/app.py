# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from summarizer import summarize_article
# from googletrans import Translator
# # from detector import is_fake_news  # Removed fake news detection import
# # ⬅️ your custom news fetch function

# app = Flask(__name__)
# CORS(app)

# translator = Translator()

# @app.route('/summarize', methods=['POST'])
# def summarize():
#     content = request.json.get('content')
#     summary = summarize_article(content)
#     return jsonify({"summary": summary})

# @app.route('/api/news')
# def get_news():
#     # 🔁 Get keywords or category from query param
#     keywords = request.args.get('keywords')
#     category = request.args.get('cat', 'general')
    

#     # 🔍 Fetch news articles from RSS or NewsAPI
#     articles = fetch_news_articles(category=category, keywords=keywords)
#     return jsonify({'articles': articles})


# @app.route('/translate', methods=['POST'])
# def translate_text():
#     data = request.get_json()
#     text = data.get('text')
#     target_lang = data.get('target_lang', 'en')
#     try:
#         translated = translator.translate(text, dest=target_lang)
#         return jsonify({ 'translatedText': translated.text })
#     except Exception as e:
#         return jsonify({ 'error': str(e) }), 500



# if __name__ == '__main__':
#     app.run(port=5001)


# app.py
# 

# ✅ Flask AI Service (app.py)
from flask import Flask, request, jsonify
from flask_cors import CORS
from summarizer import summarize_article
from deep_translator import GoogleTranslator

app = Flask(__name__)
CORS(app)

@app.route('/summarize', methods=['POST'])
def summarize():
    content = request.json.get('content')
    summary = summarize_article(content)
    return jsonify({"summary": summary})

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    text = data.get('text')
    target_lang = data.get('target_lang', 'en')
    try:
        translated_text = GoogleTranslator(source='auto', target=target_lang).translate(text)
        return jsonify({ 'translatedText': translated_text })
    except Exception as e:
        return jsonify({ 'error': str(e) }), 500

if __name__ == '__main__':
    app.run(port=5001)