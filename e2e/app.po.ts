import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h3')).getText();
  }

  getIncreaseButton() {
    return element(by.css('app-root .btn-increase'));
  }

  getCounterText() {
    return element(by.css('app-root .banana-counter')).getText();
  }
  getBoxesListCount() {
    return element.all(by.css('app-root .box-id')).count();
  }
  async getNewBox(id: string) {
    await browser.driver.findElements(by.id(id));
    return await element(by.id(id));
  }
  getSubmitButton() {
    return element(by.css('app-root .save-counter'));
  }
}
