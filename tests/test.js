const { describe, it, beforeEach, afterEach, before, after } = require("mocha");
const { Builder, By, until } = require("selenium-webdriver");
const { Options } = require("selenium-webdriver/chrome");
const assert = require("assert");
const LoginPage = require("../pages/LoginPage");
const RegisterPage = require("../pages/RegisterPage");

describe("Login Testing", function () {
  this.timeout(15000);
  let driver, loginPage, registerPage;
  let url = "https://qa-interview-test-1.vercel.app/";

  before(async () => {
    let options = new Options();
    options.excludeSwitches("enable-logging");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

       loginPage = new LoginPage(driver);
       registerPage = new RegisterPage(driver);

  });

  after(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await driver.quit();
  });

  it("should successfully register", async () => {
    await driver.get(url + "/register");

    await registerPage.register("testuser12", "testuser12", "pass123", "pass123");

    await registerPage.registerSuccess("testuser12", "testuser12", "pass123");
  });

  it("should succeess login", async () => {
    await driver.get(url + "/login");

    await loginPage.login("testuser12", "pass123");

    await driver.sleep(100);
    const assertion = await driver.wait(
      until.elementLocated(
        By.css(".text-center.text-4xl.font-bold.text-base-100.text-white")
      )
    );

    const messageText = await assertion.getText();

    assert.strictEqual(
      messageText,
      "Halo pass123, selamat datang di website kami"
    );
  });

  it("should success logout", async () => {

    await loginPage.logout()

    await driver.navigate().refresh();

    const assertion = await driver.wait(
      until.elementLocated(
        By.css(".text-center.text-4xl.font-bold.text-base-100.text-white")
      )
    );

    const messageText = await assertion.getText();

    assert.strictEqual(messageText, "Login");
  });

  it("should failed register with existed password", async () => {
    await driver.get(url + "/register");

    await registerPage.register("testuser12","testuser12","pass123","pass123");

    await registerPage.registerFailed("testuser12","pass123")
  });

  it("should failed login with wrong password", async () => {
    await driver.get(url + "/login");
    const loginPage = new LoginPage(driver);
    await loginPage.login("testuser12", "pass12");

    await loginPage.loginFailed("testuser12", "pass12")
  });
});
