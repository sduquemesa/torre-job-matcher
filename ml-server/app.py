from flask import Flask, jsonify, request
from service import analize

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello From Data Analyser!"

@app.route('/match', methods=['POST'])
def match():
    json = request.get_json()
    return analize.analize(json)



if __name__ == '__main__':
    app.run()