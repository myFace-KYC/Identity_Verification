import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class IonicTest {

    static String myUserName = "guanlun_zhao4@mymail.sutd.edu.sg";
    static String myPassword = "12345abcde";
    static String postcode = "485999";

    public static void main(String[] args) throws InterruptedException {

        // Setup
        System.setProperty("webdriver.chrome.driver","/Users/dudu/Desktop/Element of Software Construction/Selenium/chromedriver");
        WebDriver driver = new ChromeDriver();
        driver.get("localhost:8106/");

        // Register
        WebElement register_button = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-login/ion-content/div[2]/div/button[2]"));
        register_button.click();
        Thread.sleep(1000);

        WebElement username_register = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-register/ion-content/div[2]/ion-item[1]/div[1]/div/ion-input/input"));
        username_register.sendKeys(myUserName);
        WebElement password_register = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-register/ion-content/div[2]/ion-item[2]/div[1]/div/ion-input/input"));
        password_register.sendKeys(myPassword);
        Thread.sleep(1000);

        WebElement register_submit = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-register/ion-content/div[2]/div/button"));
        register_submit.click();
        Thread.sleep(1000);

        WebElement back = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-register/ion-header/ion-navbar/button"));
        back.click();
        Thread.sleep(1000);

        // fill in username & password
        WebElement username = driver.findElement(By.id("username_input")).findElement(By.xpath(".//input"));
        username.sendKeys(myUserName);
        WebElement password = driver.findElement(By.id("password_input")).findElement(By.xpath(".//input"));
        password.sendKeys(myPassword);
        Thread.sleep(1000);

        // login
        WebElement login_button = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-login/ion-content/div[2]/div/button[1]"));
        login_button.click();
        Thread.sleep(2000);

        // Click Verify me
        WebElement verify_me = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-home/ion-content/div[2]/div/div/button"));
        verify_me.click();
        Thread.sleep(1000);

        // Enter Verification information
        WebElement verify_first_name = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-kyc-form/ion-content/div[2]/ion-item[1]/div[1]/div/ion-input/input"));
        verify_first_name.sendKeys("Guanlun");

        WebElement verify_last_name = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-kyc-form/ion-content/div[2]/ion-item[2]/div[1]/div/ion-input/input"));
        verify_last_name.sendKeys("Zhao");

        WebElement verify_submit = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-kyc-form/ion-content/div[2]/div/button"));
        verify_submit.click();
        Thread.sleep(1000);

        // Upload photo


    }
}
