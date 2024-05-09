const { chromium } = require('playwright');

(async () => {
const browser = wait chromium.launch();
const context = wait browser.newContext() ;
const page = wait context.newPage();

// enter your neetoPlanner subdomain
wait page.goto('https://abhijit-mishra.neetoplanner.net/tasks/assigned-to-me ' ); < br>
// Enter your email
wait page.fill('input[name="email"]', 'cpts9gnqty9-planner-abhijit_mishra-silicon_university@bigbinary.com');
< br> // Enter a random OTP number
const otp =generateRandomOTP(); // Use the function to generate a random OTP
ait page.fill('input[name="otp"]', otp
< br > / / Confirm login ID
wait Promise.all([
page.waitForNavigation(), // Wait for navigation to complete
page.click('button[type ="submit"]' ) // Click submit button
]);

// Alternatively,
> // You can add confirmation or additional tasks after closing the browser
wait browser.close() ;
}( );

functiongenerateRandomOTP() {
// Use logic to generate a random number OTP
return Math.floor(100000 + Math. random() * 900000).toString();
}
