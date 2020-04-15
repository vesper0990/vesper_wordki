import { Before, Given, Then, When } from 'cucumber';
import { by } from 'protractor';
import { expect } from 'chai';

import { AppPage } from '../app.po';

let page: AppPage;

Before(() => {
    page = new AppPage();
});

Given(/^I am on the home page$/, async () => {
    await page.navigateTo();
});

When(/^I do nothing$/, () => { });

Then(/^I should see navigation bar$/, async () => {
    const navigationBar = page.getNavigationBar();
    const logo = await navigationBar.element(by.css('.logo')).getText();
    expect(logo).to.equal('Wordki');
});

Then(/^I should see buttons$/, async () => {
    const navigationBar = page.getNavigationBar();
    const buttons = navigationBar.all(by.css('.nav-links'));
    console.log(await buttons.getText());
    expect(await buttons.getText()).to.equal(['Home', 'Zaloguj', 'Zarejestruj']);
});
