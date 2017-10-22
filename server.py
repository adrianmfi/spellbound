import json
import time
import pandas as pd
from flask import Flask
from flask import request


app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/submit_measurements', methods=['POST'])
def recieved_measurements():
    mes = json.loads(request.form.getlist('measurements')[0])
    my_df = pd.DataFrame(mes)
    my_df.to_csv('./csv/mes'+str(time.time()) +'.csv', index=False, header = False)
    print('saved csv')
    return ('ok')

@app.route('/myStyle.css')
def myStyle():
    return app.send_static_file('myStyle.css')

@app.route('/gatherData.js')
def gatherData():
    return app.send_static_file('gatherData.js')
