from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy

import os
import shutil

# Initiate the app
app = Flask(__name__)

# Setting up the db URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/app.db'

db = SQLAlchemy(app)

# Defining our Models (ta7te él db)
class Data(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    file_path = db.Column(db.Text, nullable=False)

    # Overriding the str method
    def __str__(self):
        return f'{self.id} {self.file_path}'

def data_serializer(data):
    return {
        'id': data.id,
        'file_path': data.file_path
    }

@app.route('/api/data/', methods=['GET'])
def index():
    return jsonify([*map(data_serializer, Data.query.all())])

@app.route('/api/data/create', methods=['POST'])
def create():
    # We took the request body and conver it to a python dict.
    request_data = json.loads(request.data)

    # Create an instance to be added to the db
    data = Data(file_path=request_data['file_path'])

    # Saving our data to the session
    db.session.add(data)

    # Commit the changes
    db.session.commit()

    return {'201': 'file inserted successfully'}

@app.route('/api/data/classify', methods=['POST'])
def classify():
    request_data = json.loads(request.data)
    folder =  request_data['folder']
    file = request_data['file']
    
    shutil.copy2(f'../front_end/src/files/{file}', f'./data/{folder}')
    os.remove(f'../front_end/src/files/{file}')
    Data.query.filter_by(id=request_data['id']).delete()
    db.session.commit()

    return { '201': 'transfered Successfully' }


@app.route('/api/data/delete/<int:id>', methods=['POST'])
def delete(id):
    request_data = json.loads(request.data)
    Data.query.filter_by(id=request_data['id']).delete()
    db.session.commit()
    
    file = request_data['file_path']
    os.remove(f'../front_end/src/files/{file}')
    return { '204': 'Deleted Successfully' }


if __name__ == '__main__':
    app.run(debug=True)