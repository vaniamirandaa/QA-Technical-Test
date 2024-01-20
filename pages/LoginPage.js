const { Builder, By, Key, until } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const assert = require("assert");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.username = "//input[@placeholder='Type your username']";
    this.password = "//input[@placeholder='Type your password']";
    this.loginButton = "//button[contains(text(), 'Login')]";
    this.logoutButton = "//button[contains(text(), 'Log Out')]";
  }

  async login(username, password) {
    await this.driver
      .wait(until.elementLocated(By.xpath(this.username)))
      .sendKeys(username);
    await this.driver
      .wait(until.elementLocated(By.xpath(this.password)))
      .sendKeys(password);
    await this.driver.findElement(By.xpath(this.loginButton)).click();
  }

  async logout() {
    await this.driver.findElement(By.xpath(this.logoutButton)).click();
  }

  async loginFailed(username, password) {
    const alert = await this.driver.switchTo().alert();
    const alertText = await alert.getText();
    assert.equal(alertText, `Password username ${username} bukan ${password}`);
    await alert.accept();
  }
}

module.exports = LoginPage;
