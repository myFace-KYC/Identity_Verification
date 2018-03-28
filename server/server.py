from flask import Flask
from flask_restful import reqparse, Resource, Api
from flask_httpauth import HTTPBasicAuth
import requests

import cognitive_face as cf

app = Flask(__name__)
api = Api(app, prefix="/api/v1")
auth = HTTPBasicAuth()

parser = reqparse.RequestParser()

# Azure Face API Details
KEY = 'be8a2049b2e24dc3a42b041739af2ed0'
cf.Key.set(KEY)


BASE_URL = 'https://westus.api.cognitive.microsoft.com/face/v1.0/'  # Replace with your regional Base URL
cf.BaseUrl.set(BASE_URL)

example_url = 'https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/detection1.jpg'


# Test user details
USER_DATA = {
    "CharlesWong": "SecretPassword2018!"
}


# Face API Handling
def verify_faces(selfie_url, passport_url):
        selfie_faces = cf.face.detect(selfie_url)
        selfie_face_id = selfie_faces[0][u'faceId']

        passport_faces = cf.face.detect(passport_url)
        passport_face_id = passport_faces[0][u'faceId']

        result = cf.face.verify(selfie_face_id, passport_face_id)

        if result["isIdentical"]:
            return "Verified"
        elif not result["isIdentical"]:
            return "Rejected"


class FaceVerify(Resource):
    def get(self):
        """
        args[0] selfie url
        args[1] identity document url
        :return: string, verification result "Verified", "Rejected"
        """
        args = parser.parse_args()

        return verify_faces(args[0], args[1])


# User Profiles
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
api.add_resource(FaceVerify, '/faceVerify')

if __name__ == '__main__':
    app.run(debug=True)

