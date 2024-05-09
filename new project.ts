const { chromium } = require('playwright');

async () => {
const browser = wait chromium.launch();
const context = wait browser.newContext() ;
const page = wait context.newPage();
}
// enter your neetoPlanner subdomain
wait page.goto('https://your-neetoPlanner-subdomain.com ' ); < br>
// Click the "Projects" section of the sidebar
wait page.click('text=Projects');

// Click the "New Project" button > await page . click ('text=New project');

// Enter the name and description
of page.fill('input[name="projectName"]' , 'New project name' ; > page . waitForNavigation(), // Wait for the navigation to finish
page.click('button[type='submit']') // Press the submit button
// Indicates that the project has been created and you will go to the content page
const projectName = wait page.textContent('h1'); // Assume the project name is displayed in the h1 tag of the project detail page
if (projectName === 'New project name') {
console.log('Project creation completed.' );
} else {console.error('The project could not be created.' );< br>

// Close the browser
wait browser.close();
}) ( );