# Identity Verification App
Ionic app for cross-platform identity verification and KYC.

## Getting Started
Ionic is a cross-platform framework, and as such can be deployed on the web as well natively on devices.

In this instance, we cover local deployment and Android compiling.

### Prerequisites
* Ionic 3
* npm
### Installation
```
npm install
```
That's it!
## Running the tests

### Unit Tests

Frameworks: karma, jasmine and protractor. 
- **karma** is the Karma module which is our testing environment for unit testing. 
- **jasmine** is the Jasmine module which is the unit testing framework. 
- **protractor** is the Protractor module which is our testing environment for our end-to-end tests. 

We implemented two different kind of testing:

- Unit Testing (Karma + Jasmine)
- E2E (End-to-End) Testing
Tutorial that we follow (Unit testing for ionic is still under development, so potential bugs may happen) https://github.com/ionic-team/ionic-unit-testing-example#mocking-classes-for-ionic https://leifwells.github.io/2017/08/27/testing-in-ionic-configure-existing-projects-for-testing/

Languages & Frameworks: Angular, Typescript, Ionic, NodeJS

Import Command

Unit Testing: npm run test (Run unit test, jasmine & karma)
E2E Testing Run IonicTest.java
P.S. All unit testing has file name pattern “*.spec.ts”, under each page folder, testing case is written in typescript and jasmine syntax.

Hints I find useful

Make sure to serve browser in chrome instead of safari
ionic serve --browser "google chrome"
Serve ionic app first before run e2e test (IMPORTANT)

## Deployment

## Features
* User registration and secure recurrent login
* Easy-to-use KYC procedure
* Basic profile input
* Selfie and passport scan upload
* Redirection to customer portal
* Instant verification with facial recognition
* Instant email updates to user for registration and KYC status

## To-do
* KYC fields regex verification
* Summary page before KYC submission
* Remove ability to backtrack during KYC
* Progress bar of KYC
* Pretty up the interface!

## Authors

See also the list of [contributors](https://github.com/orgs/myFace-KYC/people) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* https://ionicframework.com/docs/intro/tutorial/
* http://ccoenraets.github.io/ionic-tutorial/
* https://www.joshmorony.com/building-a-crud-ionic-2-application-with-firebase-angularfire/
* https://firebase.google.com/docs/auth/
