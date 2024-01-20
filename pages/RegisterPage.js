const { Builder, By, until } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const assert = require("assert");

class RegisterPage {
  constructor(driver) {
    this.driver = driver;
    this.name = "//input[@placeholder='Type your name']";
    this.username = "//input[@placeholder='Type your username']";
    this.password = "//input[@placeholder='Type your password']";
    this.confirmPassword = "//input[@placeholder='Confirm Password']";
    this.registerButton = "//button[contains(text(), 'Register')]";
  }

  async register(name, username, password, confirmPassword) {
    await this.driver.wait(until.elementLocated(By.xpath(this.name))).sendKeys(name);
    await this.driver.wait(until.elementLocated(By.xpath(this.username))).sendKeys(username);
    await this.driver.wait(until.elementLocated(By.xpath(this.password))).sendKeys(password);
    await this.driver.wait(until.elementLocated(By.xpath(this.confirmPassword))).sendKeys(confirmPassword);
    await this.driver.findElement(By.xpath(this.registerButton)).click();
  }

  async registerSuccess(name, username, password) {
    const alert = await this.driver.switchTo().alert();

    const alertText = await alert.getText();

    assert.equal(
      alertText,
      `Berhasil registrasi ${name} username ${username} dengan password ${password}`
    );

    await alert.accept();
  }

  async registerFailed(username, password) {
    const alert = await this.driver.switchTo().alert();
    const alertText = await alert.getText();
    assert.equal(
      alertText,
      `Password ${password} telah dipakai oleh username ${username}`
    );
    await alert.accept();
  }
}

module.exports = RegisterPage;