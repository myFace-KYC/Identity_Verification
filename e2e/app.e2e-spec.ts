import { browser, by, element } from 'protractor';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }

  setUserName(username: string) {
    element(by.css("[type]='text'")).sendKeys(username);
  }

  getUserName() {
    return element(by.css("[type]='password'")).getText();
  }

  setPassword(password: string) {
    element(by.css("[type]='password'")).sendKeys(password);
  }

  getPageOneTitleText() {
    return element(by.tagName('page-page1')).element(by.tagName('ion-title')).element(by.css('.toolbar-title')).getText();
  }
}


describe('App', () => {

  describe('default screen', () => {
    beforeEach(() => {
      browser.get('https://www.google.com.sg');
    });

    // it('should have a title saying Login', () => {
    //   page.getPageOneTitleText().then(title => {
    //     expect(title).toEqual('Login');
    //   });
    //   // expect(true).toEqual(true);
    // });

    it('Set Username', () => {
      element(by.id("csi")).sendKeys('hello');
      expect<any>(element(by.id("csi")).getText()).toEqual("hello");
    })
  })
});
