from flask import Flask, request, jsonify

app = Flask(__name__)

data = {'Access': 'Allowed'}


# User information requests

# This function returns the user API key
@app.route('/api_access', methods = ['POST'])
def api_access():
    username = request.form['username']
    password = request.form['password']
    return jsonify(data) #api_key

# This function regenerates the API key
@app.route('/changekey/<username>/<password>', methods = ['GET'])
def change_key(username, password):
    return jsonify(data) #api_key

# This function returns the usage statics
@app.route('/statics/<api_key>', methods=['GET'])
def get_statistcs(api_key):
    # Returns a json containing:
    # Total requests done from the begining of the month
    # Numbers of queries the user can preform
    # Amount of websites visited
    return jsonify(data) #data_json

    

# Entity data requests

# This function returns json providing information on a single entity (website)
@app.route('/checksingle',methods=['POST'])
def check_single():
    api_key = request.form['api_key']
    data = request.get_json()
    entity = data['entity']
    en_type = data['entity_type']
    source = date['source'] # did this came from the extension or direct request
    return jsonify(data) #data_json
    
# This function returns information for number of entities
@app.route('/checkbulk', methods = ['POST'])
def check_bulk():
    api_key = request.form['api_key']
    data = request.get_json()
    # analayze for each 'row' in the json
    return jsonify(data) #data_json

# This function returns a list of urls tagged as malicious
@app.route('/Malicious/<api_key>/<int:num_of_entities>', methods = ['GET'])
def get_malicious(apikey, num=100):
    api_key = apikey
    num = num_of_entities
    return jsonify(data) #data_json

# This funtion gets website information
@app.route('/url/<website>')
def get_website_info(website):
    return jsonify(data) #page content, list of links(potential), headers and url to view the image on the website.

# Shouldn't we add another function to collect data?
# or is it a part of get website info





if __name__ == '__main__':
    app.run()
c
