from flask import Flask, redirect, url_for, jsonify ,request
from youtube_transcript_api import YouTubeTranscriptApi
from deep_translator import GoogleTranslator
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
    answer = GoogleTranslator(source='auto', target=code).translate(textval)
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

@app.route("/frnd/<dropbar>")
def friends(dropbar):

    if(dropbar != 'Default'):
        return {
            "Friends" : friends_finder(dropbar)
        }
    with open('Domain.txt', 'r') as f:
        Value = f.read()
    if(Value == ""):
        return {
            "Friends" : ("NOTHING TO SHOW")
        }
    return {
        "Friends" : friends_finder(Value)
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
	jobsconn = sqlite3.connect('Jobs.db')
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
	c.execute('SELECT * FROM '+Domain)
	data = c.fetchall()
	return data

def find_user(c,Domain,username):
	c.execute('SELECT * FROM '+Domain +' WHERE username =(?)',(username,))
	li=list(c.fetchall())
	return len(li)

#----------------------------------------------------------------------------

def friends_finder(Domain):
	friendsconn = sqlite3.connect('Friends.db')
	friendscursor = friendsconn.cursor()
	users = view_all_users(friendscursor,Domain)
	print(users)
	main_dict = []
	ind=0
	for user in users:
		skillsets = []
		for topics in Domains:
			if(find_user(friendscursor,topics,user[0]) >=1):
				skillsets.append(topics)
		dict = {
			"USER" : user[0],
			"SKILLSETS" : skillsets
		}
		print(dict)
		main_dict.append(
            dict)
		ind  = ind+1
	return (main_dict)


if __name__ == "__main__":
    app.run()