import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('my-test App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Banana counter', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Banana counter');
  });

  it('should add a new banana box correctly', async() => {
    // Navigate to the home page
    page.navigateTo();

    // Get the increase button and click it to add a banana
    const increaseButton = page.getIncreaseButton();
    increaseButton.click();

    // Check 1. Banana has been correctly added
    const counterText = page.getCounterText();
    expect(counterText).toEqual('1 banana');

    // Check 2. We have a list of 5 banana boxes
    const boxesListCount = page.getBoxesListCount();
    expect(boxesListCount).toEqual(5);

    // Get the save button and click it
    const submitButton = page.getSubmitButton();
    submitButton.click();

    // We now the ID of the new box will be 6 so look for it
    // This is an await call as we need to wait the backend response
    // to create this html element
    const newBox = await page.getNewBox('bqty_6');

    // Check 3. Confirm the element exists
    expect(newBox).toBeTruthy();

    // Check 4. Confirm quantity
    expect(newBox.getText()).toBe('1 banana');
  });

  it('should remove a banana box correctly', async() => {
    // Navigate to the home page
    page.navigateTo();

    // Check 1. Check the list is 6 boxes
    let boxesListCount = page.getBoxesListCount();
    expect(boxesListCount).toEqual(6);

    // Get last box added
    const lastBox = await page.getNewBox('brm_6');
    lastBox.click();

    // Check 2. Check we have now 5 boxes
    boxesListCount = page.getBoxesListCount();
    expect(boxesListCount).toEqual(5);
  });

});
