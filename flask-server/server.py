from flask import Flask, redirect, url_for, jsonify ,request
from youtube_transcript_api import YouTubeTranscriptApi
from google_trans_new import google_translator
from deep_translator import GoogleTranslator
app = Flask(__name__)

def get_youtube_to_text(Link):
    tx = YouTubeTranscriptApi.get_transcript(Link, languages=['en'], preserve_formatting=True)
    total_string = " "
    list_of_strings= []
    for i in tx:
        outtxt = (i['text'])
        total_string += " "
        total_string += outtxt
    return total_string

LANGUAGES = {
    'arabic' : 'ar' ,
    'bengali' : 'bn',
    'english' : 'en',
    'french' : 'fr',
    'german' : 'de',
    'greek' : 'el',
    'gujarati' :'gu',
    'japanese' : 'ja',
    'kannada' : 'kn',
    'malayalam' : 'ml',
    'marathi' : 'mr',
    'hindi' : 'hi',
    'tamil' : 'ta',
    'telugu' : 'te'
}

@app.route("/<lang>/<tag>")
def translate(lang,tag):
    if(lang == 'default'):
        return {"tag" : [str("NOTHING")]}
    code = LANGUAGES[lang]
    try:
        textval  = get_youtube_to_text(tag)    
    except:
        textval = "NO SUB-TITLE"
    ans = GoogleTranslator(source='auto', target=code).translate(textval)
    # translator =  google_translator()  
    # answer = translator.translate(textval ,  lang_tgt= code)
    return {"tag" :[ans]}

if __name__ == "__main__":
    app.run(debug=True)