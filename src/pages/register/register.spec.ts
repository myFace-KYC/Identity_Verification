import { browser, by, element } from 'protractor';

class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }

  getPageOneTitleText() {
    return element(by.tagName('page-page1')).element(by.tagName('ion-title')).element(by.css('.toolbar-title')).getText();
  }
}


describe('Register Page', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('default screen', () => {
    beforeEach(() => {
      browser.get('/');;
    });

    it('should have a title saying Page One', () => {
      browser.getTitle().then(title => {
        expect(title).toEqual('Page One');
      });
    });


  })
});
