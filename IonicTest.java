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

import java.util.Scanner;

public class IonicTest {

    static String myUserName = "guanlun_zhao@mymail.sutd.edu.sg";
    static String myPassword = "12345abcde";
    static String postcode = "485999";

    public static void main(String[] args) throws InterruptedException {

        // Part I: From register to login

        // Delete

        // Setup
        System.setProperty("webdriver.chrome.driver","/Users/dudu/Desktop/Element of Software Construction/Selenium/chromedriver");
        WebDriver driver = new ChromeDriver();
        driver.get("localhost:8106/");
        driver.manage().window().maximize();

        // Register
        Thread.sleep(1000);
        WebElement register_button = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-login/ion-content/div[2]/ion-card/ion-card-content/ion-row/ion-col[2]/button"));
        Thread.sleep(1000);
        register_button.click();
        Thread.sleep(1000);

        WebElement username_register = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-register/ion-content/div[2]/ion-card/ion-card-content/div/ion-row[1]/ion-item/div[1]/div/ion-input/input"));
        username_register.sendKeys(myUserName);
        WebElement password_register = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-register/ion-content/div[2]/ion-card/ion-card-content/div/ion-row[2]/ion-item/div[1]/div/ion-input/input"));
        password_register.sendKeys(myPassword);
        Thread.sleep(1000);

        WebElement register_submit = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-register/ion-content/div[2]/ion-card/ion-card-content/ion-row/ion-col/button"));
        register_submit.click();
        Thread.sleep(3000);

        WebElement OK = driver.findElement(By.xpath("/html/body/ion-app/ion-alert/div/div[3]/button"));
        OK.click();
        Thread.sleep(1000);

        // fill in username & password
        WebElement username = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-login/ion-content/div[2]/ion-card/ion-card-content/div/ion-row[1]/ion-item/div[1]/div/ion-input/input"));
        username.sendKeys(myUserName);
        WebElement password = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-login/ion-content/div[2]/ion-card/ion-card-content/div/ion-row[2]/ion-item/div[1]/div/ion-input/input"));
        password.sendKeys(myPassword);
        Thread.sleep(1000);

        // login
        WebElement login_button = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-login/ion-content/div[2]/ion-card/ion-card-content/ion-row/ion-col[1]/button"));
        login_button.click();
        Thread.sleep(2000);


        // ------- This should happen after manually verifies the Email address ------
        System.out.println("Please go to your Email address to verify link, after verification, please enter 0 to continue.");
        Scanner scanner = new Scanner(System.in);
        while(scanner.hasNextInt()) {
            int num = scanner.nextInt();
            if (num == 0)
                break;
        }

        // Click Verify me
        WebElement proceed = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-home/ion-content/div[2]/div/ion-card/ion-card-content/ion-row/ion-col/button"));
        proceed.click();
        Thread.sleep(300);

        // Enter Verification information
        WebElement verify_first_name = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-kyc-form/ion-content/div[2]/div[2]/ion-item[1]/div[1]/div/ion-input/input"));
        verify_first_name.sendKeys("Guanlun");
        Thread.sleep(300);

        WebElement verify_last_name = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-kyc-form/ion-content/div[2]/div[2]/ion-item[2]/div[1]/div/ion-input/input"));
        verify_last_name.sendKeys("Zhao");
        Thread.sleep(300);

        WebElement verify_NRIC = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-kyc-form/ion-content/div[2]/div[2]/ion-item[3]/div[1]/div/ion-input/input"));
        verify_NRIC.sendKeys("G1425231U");
        Thread.sleep(300);

        WebElement verify_phone_no = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-kyc-form/ion-content/div[2]/div[2]/ion-item[4]/div[1]/div/ion-input/input"));
        verify_phone_no.sendKeys("85910289");
        Thread.sleep(300);

        WebElement verify_address = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-kyc-form/ion-content/div[2]/div[2]/ion-item[5]/div[1]/div/ion-input/input"));
        verify_phone_no.sendKeys("1 Changi South Ave. Blk 59, #04-102");
        Thread.sleep(300);

        WebElement verify_submit = driver.findElement(By.xpath("/html/body/ion-app/ng-component/ion-nav/page-kyc-form/ion-content/div[2]/div[3]/button"));
        verify_submit.click();
        Thread.sleep(300);

        // Upload photo

    }
}
