import { test, expect } from '@playwright/test';

test('Reorder item fields', async ({ page }) => {
    // Step 1: Log in to NeetoPlanner subdomain as admin user
    await loginAsAdminUser(page);

    // Step 2: Create a new project
    const projectName = await createNewProject(page);

    // Step 3: Go to Settings > Fields
    await goToSettingsFields(page);

    // Step 4: Click the Reorder button and reorder the fields
    await reorderProjectFields(page);

    // Validate the order of fields
    await validateFieldsOrder(page, projectName);
});

// Function to log in as admin user
async function loginAsAdminUser(page) {
    // Implementation to log in as admin user
}

// Function to create a new project and return the project name
async function createNewProject(page) {
    // Implementation to create a new project and return the project name
    return 'New Project';
}

// Function to navigate to Settings > Fields
async function goToSettingsFields(page) {
    // Implementation to navigate to Settings > Fields
}

// Function to reorder project fields
async function reorderProjectFields(page) {
    // Implementation to click the reorder button and reorder the fields
    await page.click('button[data-testid="reorder-fields-button"]');
    await page.dragAndDrop('div[data-testid="due-date-field"]', 'div[data-testid="assignee-field"]');
}

// Function to validate the order of fields
async function validateFieldsOrder(page, projectName) {
    // Implementation to validate the order of fields
    await page.click(`a[data-testid="${projectName}-link"]`);

    // Example validation: You can confirm the order of the fields here
    const assigneeIndex = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.project-fields-list .project-field')).findIndex(field => field.textContent.trim() === 'Assigned')
    );
    const dueDateIndex = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.project-fields-list .project-field')).findIndex(field => field.textContent.trim() === 'Due date')
    );

    expect(assigneeIndex).toBeLessThan(dueDateIndex);
}
