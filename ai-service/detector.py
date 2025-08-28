# import joblib

# # ✅ Load using joblib (matches how you saved the model)
# model = joblib.load('models/model.pkl')
# vectorizer = joblib.load('models/vectorizer.pkl')

# # ✅ Define the prediction function
# def is_fake_news(text):
#     text_vec = vectorizer.transform([text])
#     prediction = model.predict(text_vec)[0]
#     return "FAKE" if prediction == 1 else "REAL"
#     # print(f"🧠 Prediction for: {text[:60]}... → {prediction}")
#     # return {'label': prediction, 'confidence': float(prob)} # returns 'FAKE' or 'REAL'


import joblib
import os

model_path = os.path.join('models', 'model.pkl')
vectorizer_path = os.path.join('models', 'vectorizer.pkl')

model = joblib.load(model_path)
vectorizer = joblib.load(vectorizer_path)

def is_fake_news(text):
    if not text:
        print("Empty text received, returning REAL")
        return "REAL"
    print(f"Predicting fake news for text: {text[:100]}...")  # Log first 100 chars
    vect_text = vectorizer.transform([text])
    prediction = model.predict(vect_text)[0]
    print(f"Model prediction: {prediction}")
    return "FAKE" if prediction == 1 else "REAL"
