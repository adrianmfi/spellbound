from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/submit', methods=['POST'])
def posttest():
    print(request.form.getlist('measurements[]'))
    mes_x = request.form.getlist('measurements[0][]')
    mes_y = request.form.getlist('measurements[1][]')
    mes_z = request.form.getlist('measurements[2][]')
    return ('ok')

@app.route('/myStyle.css')
def myStyle():
    return app.send_static_file('myStyle.css')

@app.route('/gatherData.js')
def gatherData():
    return app.send_static_file('gatherData.js')
