from flask import Flask
from flask_restful import reqparse, Resource, Api
from flask_httpauth import HTTPBasicAuth

app = Flask(__name__)
api = Api(app, prefix="/api/v1")
auth = HTTPBasicAuth()

parser = reqparse.RequestParser()

# user details here for testing only
USER_DATA = {
    "CharlesWong": "SecretPassword2018!"
}


@auth.verify_password
def verify(username, password):
    if not (username and password):
        return False
    return USER_DATA.get(username) == password


class Profile(Resource):
    @auth.login_required
    def get(self):
        return 'test'

    def post(self):
        args = parser.parse_args()
        # TODO: generate cust id
        # TODO: parse incoming json from app
        # TODO: CV algorithm to verifiy identityfrom passport selfie
        # TODO: post to firebase
        return cust_id, 201


api.add_resource(Profile, '/customerProfile')

if __name__ == '__main__':
    app.run(debug=True)

