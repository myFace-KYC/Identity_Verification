import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
// import {
//   PlatformMock,
//   StatusBarMock,
//   SplashScreenMock
// } from '../../test-config/mocks-ionic';

import {PlatformMock, StatusBarMock, SplashScreenMock} from 'ionic-mocks';
import { LoginPage } from '../pages/login/login';




describe('MyApp Component', () => {
  let fixture;
  let component;
  let platform: Platform;
  let statusbar: StatusBar;
  let splashscreen: SplashScreen;
  let classUnderTest: MyApp;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [MyApp],
  //     imports: [
  //       IonicModule.forRoot(MyApp)
  //     ],
  //     providers: [
  //       { provide: StatusBar, useClass: StatusBarMock },
  //       { provide: SplashScreen, useClass: SplashScreenMock },
  //       { provide: Platform, useClass: PlatformMock }
  //     ]
  //   })
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(MyApp);
  //   component = fixture.componentInstance;
  // });

  beforeEach(() => {

      platform = PlatformMock.instance();
      statusbar = StatusBarMock.instance();
      splashscreen = SplashScreenMock.instance();
      classUnderTest = new MyApp(platform, statusbar, splashscreen);
  });

  it('root test', () => {
    expect(classUnderTest.rootPage).toBe(LoginPage);
  });

  // it('should have two pages', () => {
  //   expect(component.pages.length).toBe(2);
  // });

});