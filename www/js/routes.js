angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('sMS', {
    url: '/sms1',
    templateUrl: 'templates/sMS.html',
    controller: 'sMSCtrl'
  })

  .state('sMS2', {
    url: '/sms2',
    templateUrl: 'templates/sMS2.html',
    controller: 'sMS2Ctrl'
  })

  .state('emailConfirmation', {
    url: '/email_confirm',
    templateUrl: 'templates/emailConfirmation.html',
    controller: 'emailConfirmationCtrl'
  })

  .state('googleAuthenticator', {
    url: '/google_auth1',
    templateUrl: 'templates/googleAuthenticator.html',
    controller: 'googleAuthenticatorCtrl'
  })

  .state('googleAuthenticator2', {
    url: '/google_auth2',
    templateUrl: 'templates/googleAuthenticator2.html',
    controller: 'googleAuthenticator2Ctrl'
  })

  .state('personalParticulars', {
    url: '/personal_info',
    templateUrl: 'templates/personalParticulars.html',
    controller: 'personalParticularsCtrl'
  })

  .state('verifyYourPhoneNumber', {
    url: '/sms_setup',
    templateUrl: 'templates/verifyYourPhoneNumber.html',
    controller: 'verifyYourPhoneNumberCtrl'
  })

  .state('setUpGoogleAuthenticator', {
    url: '/google_auth_setup',
    templateUrl: 'templates/setUpGoogleAuthenticator.html',
    controller: 'setUpGoogleAuthenticatorCtrl'
  })

  .state('pleaseUploadThesePhotos', {
    url: '/photo_uploading',
    templateUrl: 'templates/pleaseUploadThesePhotos.html',
    controller: 'pleaseUploadThesePhotosCtrl'
  })

  .state('forgetPassword', {
    url: '/forget_password',
    templateUrl: 'templates/forgetPassword.html',
    controller: 'forgetPasswordCtrl'
  })

  .state('resetPassword', {
    url: '/reset_password',
    templateUrl: 'templates/resetPassword.html',
    controller: 'resetPasswordCtrl'
  })

  .state('photoVerification', {
    url: '/photo_verification',
    templateUrl: 'templates/photoVerification.html',
    controller: 'photoVerificationCtrl'
  })

  .state('passwordResetSucceed', {
    url: '/reset_ok',
    templateUrl: 'templates/passwordResetSucceed.html',
    controller: 'passwordResetSucceedCtrl'
  })

  .state('verificationSucceed', {
    url: '/verification_ok',
    templateUrl: 'templates/verificationSucceed.html',
    controller: 'verificationSucceedCtrl'
  })

  .state('registrationSucceed', {
    url: '/registration_ok',
    templateUrl: 'templates/registrationSucceed.html',
    controller: 'registrationSucceedCtrl'
  })

$urlRouterProvider.otherwise('/login')


});