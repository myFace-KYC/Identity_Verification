from flask import Flask, request
from flask_httpauth import HTTPBasicAuth
from flask_mail import Mail, Message
import requests
from firebase import firebase

import cognitive_face as cf

# Server Gubbins
app = Flask(__name__)
auth = HTTPBasicAuth()
ionic_app_url = 'https://www.google.com'


# Firebase Helper (http://ozgur.github.io/python-firebase/)
db = firebase.FirebaseApplication('https://kyc-app-db.firebaseio.com/', None)


# Azure Face API Details
KEY = 'be8a2049b2e24dc3a42b041739af2ed0'
cf.Key.set(KEY)
BASE_URL = 'https://westus.api.cognitive.microsoft.com/face/v1.0/'  # Replace with your regional Base URL
cf.BaseUrl.set(BASE_URL)
example_url = 'https://raw.githubusercontent.com/Microsoft/Cognitive-Face-Windows/master/Data/detection1.jpg'


# Email Config
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'sutd.myfaceapp@gmail.com'
app.config['MAIL_PASSWORD'] = 'myface2018!'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


# API ENDPOINTS
@app.route('/api/v1/new-user-submit', methods=['PUT'])
def new_user_submission():  # acknowledges new user and sends confirmation email
    user_email = request.args.get('email')
    user_uid = request.args.get('uid')

    db.put('/users/'+user_uid, 'email_confirmed', False)

    return send_email_confirmation(user_email, user_uid)


@app.route('/api/v1/new-kyc-submit', methods=['POST'])
def new_kyc_submit():
    user_uid = request.args.get('uid')
    user_email = db.get('/users/'+user_uid+'/email_address/', None)
    selfie_url = request.args.get('selfie_url')
    passport_url = request.args.get('passport_url')

    result = verify_faces(selfie_url, passport_url)

    if result[0]:
        db.put('/users/'+user_uid, 'kyc_status', 'APPROVED')
        send_email_verify_success(user_email, result[1])
        return 'Success'
    else:
        db.put('/users/'+user_uid, 'kyc_status', 'REJECTED')
        send_email_verify_fail(user_email, result[1])
        return 'Fail'


# PAGE ROUTING
@app.route('/new-user-confirm')
def new_user_confirm():
    user_uid = request.args.get('uid')
    exists = db.get('/users/'+user_uid)

    if exists:
        db.put('/users/'+user_uid, 'email_confirmed', True)
    else:
        return 'No such user exists!'

    # TODO: implement redirection to ionic app
    return 'Email confirmation successful! Redirecting to MyFace to login...'


@app.route('/')
def hello_world():
    # return 'Welcome to the MyFace Verification Server!'
    # print(send_email('charlescrinkle@gmail.com', '123'))
    return 'Welcome to the MyFace Verification Server!', request.base_url


# UTILITY FUNCTIONS
def send_email_confirmation(email, uid):
    msg = Message('MyFace Confirmation',
                  sender='sutd.myfaceapp.gmail.com',
                  recipients=[email])

    msg.html = "<b>Thank you for registering with MyFace Verification!</b> <br>" \
               "We're here for all your KYC/AML needs. <br><br>" \
               "Please click on the following link to confirm your email:<br>" \
               ""+request.base_url+'new-user-confirm/?uid='+uid
    try:
        mail.send(msg)
        result = 'Email success'
    except Exception:
        result = 'Email failed'

    return result


def send_email_verify_success(email):
    msg = Message('MyFace KYC Success',
                  sender='sutd.myfaceapp.gmail.com',
                  recipients=[email])

    msg.html = "<b>Thank you for verifying with MyFace KYC!</b><br>" \
               "Your application was successful!<br><br>" \
               "Click here to proceed to login:<br>" \
               ""+ionic_app_url
    try:
        mail.send(msg)
        result = 'Email success'
    except Exception:
        result = 'Email failed'

    return result


def send_email_verify_fail(email, error_msg):
    msg = Message('MyFace KYC Rejection',
                  sender='sutd.myfaceapp.gmail.com',
                  recipients=[email])

    msg.html = "<b>Thank you for verifying with MyFace KYC.</b><br>" \
               "Unfortunately, your application was not successful due to the following:<br><br>" \
               "<b><i>"+error_msg+"</i></b><br><br>" \
               "Click here to login and try again:<br>" \
               ""+ionic_app_url
    try:
        mail.send(msg)
        result = 'Email success'
    except Exception:
        result = 'Email failed'

    return result


def verify_faces(selfie_url, passport_url):  # Face API Handling
        selfie_faces = cf.face.detect(selfie_url)
        selfie_face_id = selfie_faces[0][u'faceId']

        passport_faces = cf.face.detect(passport_url)
        passport_face_id = passport_faces[0][u'faceId']

        result = cf.face.verify(selfie_face_id, passport_face_id)

        confidence = result["confidence"]

        if result["isIdentical"]:
            if confidence > 0.98:
                return [False, "Rejected: Possible duplicate images. Ensure selfie image is front facing photo of user.", confidence]
            else:
                return [True, "Verified", confidence]

        elif not result["isIdentical"]:
            return [False, "Rejected: No facial match. Try a clearer picture or passport scan.", confidence]


if __name__ == '__main__':
    app.run(debug=True)

