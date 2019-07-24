from flask import *
from flask_cors import CORS, cross_origin
import os
import json
import random
import string
from flask_socketio import SocketIO

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app)

@app.route('/api/1/update/<sheetID>', methods = ['POST'])
@cross_origin()
def updateData(sheetID):
	if request.is_json:
		req = request.get_json()
		try:
			with open('sheets/'+sheetID+'.json', 'w') as f:
				json.dump(req, f)
			return '1', 200
		except:
			return '1', 200

	return '1', 400


@app.route('/api/1/get/<sheetID>')
@cross_origin()
def getData(sheetID):
	try:
		with open('sheets/'+sheetID+".json") as jsonFile:
			data = json.load(jsonFile)
	except:
		data = []

	print("Data:")
	print(jsonify(data))
	return jsonify(data)


@app.route('/api/1/newID')
@cross_origin()
def generateID():
	rtStr = ''.join(random.choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(16))
	return jsonify("result",rtStr)


def messageRecieved(methods=['GET','POST']):
	print("Message Recieved")


@socketio.on('myEvent')
def handleMyEvent(json, methods=['GET','POST']):
	print('Recieved my event: '+ str(json))
	with open('sheets/'+sheetID+".json") as jsonFile:
		data = json.load(jsonFile)

	print("Data:")
	print("EMIT")



