# Identity_Verification
An Identity Verification App to be used to for KYC purposes 

<<<<<<< HEAD
=======

------------ TESTING PLANS ------------


We implemented two different kind of testing:
1. Unit Testing
2. E2E (End-to-End) Testing

Tutorial that we follow (Unit testing for ionic is still under development, so potential bugs may happen)
https://github.com/ionic-team/ionic-unit-testing-example#mocking-classes-for-ionic
https://leifwells.github.io/2017/08/27/testing-in-ionic-configure-existing-projects-for-testing/

Languages & Frameworks: Angular, Typescript, Ionic, NodeJS

Import Command
- Unit Testing: 
	npm run test (Run unit test, jasmine & karma)
- E2E Testing
	Run IonicTest.java

P.S.
All unit testing has file name pattern “*.spec.ts”, under each page folder, testing case is written in typescript and jasmine syntax.

Hints I find useful
1. Make sure to serve browser in chrome instead of safari 
    1. ionic serve --browser "google chrome"
2. Serve ionic app first before run e2e test (IMPORTANT)
>>>>>>> c80acf1152ff11fdcc821670580d50eebe06c188
