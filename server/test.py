from firebase import firebase
import cognitive_face as cf
import server

db = firebase.FirebaseApplication('https://kyc-app-db.firebaseio.com/', None)
#
# result = db.get('/users/8PufRaJSApYbf66kXDKFlDGgasdsadZSn2', None)


# result = db.put('/users/ESsYyscXtNXfhhgjjfhj73G3', 'email_confirmed', False)


# exists = db.get

# Azure Face API Details
# KEY = 'be8a2049b2e24dc3a42b041739af2ed0'
# cf.Key.set(KEY)
# BASE_URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0'  # Replace with your regional Base URL
# cf.BaseUrl.set(BASE_URL)
# passport_url = 'https://firebasestorage.googleapis.com/v0/b/kyc-app-db.appspot.com/o/0321%200900%20Charles%20Wong.jpg?alt=media&token=24dea5e5-2dc2-4d60-81f2-616b19d0da6e'
# selfie_url = 'https://firebasestorage.googleapis.com/v0/b/kyc-app-db.appspot.com/o/selfie%20with%20driving%20license?alt=media&token=74e7a621-7642-4c5b-9b5d-31dfb6f7775f'
#
# result = server.verify_faces(selfie_url, passport_url)
#
# print(result)


user_email = db.get('/users/'+'8PufRaJSApYbf66kXDKFlDGgZSn2'+'/email_address/', None)

print(user_email)
