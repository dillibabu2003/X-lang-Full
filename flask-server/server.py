from flask import Flask, redirect, url_for, jsonify ,request
from youtube_transcript_api import YouTubeTranscriptApi
from googletrans import Translator
translator = Translator()
app = Flask(__name__)

import sqlite3
import pandas as pd
import numpy as np
import os

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfTransformer

from sklearn.svm import LinearSVC
import regex as re

df = pd.read_excel("Dataset.xlsx")

def get_youtube_to_text(Code):
    tx = YouTubeTranscriptApi.get_transcript(Code, languages=['en'], preserve_formatting=True)
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

Domains =['DeepLearning',
		  'MachineLearning',
		  'WebDevelopment',
		  'Agriculture',
		  'Marketing',
		  'AppDevelopment',
		  'FashionTech',
		  'IOT',
		  'ARVR',
		  'CloudComputing',
		  'CyberSecurity',
		  'SoftwareTesting',
		  'DataStructures',
		  'SocialMediaBranding',
		  'FoodTechnology',
		  'Chemistry',
		  'Physics',
		  'Biology',
		  'BigData',
		  'BlockChain',
		  'Networking',
		  'Aeronautics',
		  'QuantumComputing',
		  'DroneTechnology',
		  'Economics',
		  'Cinematography',
		  'Robotics',
		  'GraphicsDesign',
		  'DatabaseConnectivity',
		  'Accounting',
]

Domain_storage = ""

@app.route("/lang/<lang>/<tag>")
def translate(lang,tag):
    if(lang == 'default'):
        return {"tag" : [str("NOTHING")]}
    code = LANGUAGES[lang]
    try:
        textval  = get_youtube_to_text(tag)    
    except:
        textval = "NO SUB-TITLE"
    answer = translator.translate(textval , dest= code).text
    prediction  = str(model.predict(fitted_vectorizer.transform([textval])))
    prediction = prediction[2:-2]
    Domain_storage = prediction
    with open("Domain.txt", 'w') as f:
        pass
    with open('Domain.txt', 'w') as f:
        d = prediction
        f.write(d)
    return {
            "tag" : [str(answer)],
            }

@app.route("/add_friend/<Name>")
def add_friend(Name):
    with open("Friend.txt",'w')as f:
        pass
    with open("Friend.txt",'w')as f:
        f.write(Name)
    return {
        "TAG" : Name
    }


@app.route("/job/<dropbar>")
def job(dropbar):
    if(dropbar != 'Default'):
        return {
            "JOBS" : [(jobs_finder(dropbar))]
        }
    with open('Domain.txt', 'r') as f:
        Value = f.read()
    if(Value == ""):
        return {
            "Jobs" : [str("NOTHING TO SHOW")]
        }
    return {
        "Jobs" : [(jobs_finder(Value))],
    }

def jobs_finder(Domain):
	jobsconn = sqlite3.connect(r'C:\Users\dilli\OneDrive\Desktop\stream-chat\stream-chat\flask-server\Jobs.db')
	jobscursor = jobsconn.cursor()
	jobs = view_all_users(jobscursor,Domain)
	return jobs



df.dropna(inplace =True)
df['category_id'] = df['Cluster'].factorize()[0]
category_id_df = df[['Cluster', 'category_id']].drop_duplicates()
category_to_id = dict(category_id_df.values)
id_to_category = dict(category_id_df[['category_id', 'Cluster']].values)
tfidf = TfidfVectorizer(sublinear_tf=True, min_df=5,
                        ngram_range=(1, 2),
                        stop_words='english')
X = df['Details']
y = df['Cluster']
X_train, X_test, y_train, y_test = train_test_split(X, y,
                                                        test_size=0.2,
                                                        random_state=1)
tfidf = TfidfVectorizer(sublinear_tf=True, min_df=5,
                            ngram_range=(1, 2),
                            stop_words='english')
fitted_vectorizer = tfidf.fit(X_train)
tfidf_vectorizer_vectors = fitted_vectorizer.transform(X_train)
model = LinearSVC().fit(tfidf_vectorizer_vectors, y_train)

#----------------------------------------------------------------------------

def view_all_users(c,Domain):
	c.execute('SELECT * FROM NEW'+Domain)
	data = c.fetchall()
	return data

#----------------------------------------------------------------------------



def find_users_of_domain(Domain):
    blockchainconn = sqlite3.connect(r'C:\Users\dilli\OneDrive\Desktop\stream-chat\stream-chat\flask-server\BlockChainFinal.db')
    blockchaincursor = blockchainconn.cursor()
    with open(r'C:\Users\dilli\OneDrive\Desktop\stream-chat\stream-chat\flask-server\Certificate_table_name.txt', 'r') as f:
        table_name_certificate = f.read()
    blockchaincursor.execute("SELECT * FROM FINAL"+table_name_certificate+" WHERE domain = (?) ",(Domain,))
    return blockchaincursor.fetchall()

def skill_list(username):
    blockchainconn = sqlite3.connect(r'C:\Users\dilli\OneDrive\Desktop\stream-chat\stream-chat\flask-server\BlockChainFinal.db')
    blockchaincursor = blockchainconn.cursor()
    with open(r'C:\Users\dilli\OneDrive\Desktop\stream-chat\stream-chat\flask-server\Certificate_table_name.txt', 'r') as f:
        table_name_certificate = f.read()
    blockchaincursor.execute("SELECT domain FROM FINAL"+table_name_certificate+" WHERE username = (?)",(username,))
    return blockchaincursor.fetchall()

@app.route("/friends/<Domain>")
def function(Domain):
    list_of_users = find_users_of_domain(Domain)
    main_list = []
    for iter in list_of_users:
        skills = skill_list(iter[0])
        skillset = set()
        for iteration in skills:
            skillset.add(iteration)
        dict ={
            "USER" : iter[0],
            "SKILLSETS" : list(skillset)
        }
        main_list.append(dict)
    return main_list


if __name__ == "__main__":
    app.run(debug = True)