from flask import Flask, jsonify, request
app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello From Data Analyser!"

@app.route('/match', methods=['POST'])
def match():
    json_ = request.get_json()
    print(json_)

    return jsonify(json_)



if __name__ == '__main__':
    app.run()