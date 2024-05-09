import { test, expect } from '@playwright/test';

test('Rehearsal run created and detailed report', async ({ page }) => {
    // Step 1: Login to neetoPlanner subdomain as standard user
    await loginAsStandardUser(page);

    // Step 2: Go to the "Tasks" section of the sidebar
    await goToTasksSection(page);

    // Step 3: Assert that there are no assigned tasks
    await assertNoAssignedTasks(page);

    // Step 4: Log in to the neetoPlanner subdomain as an administrator
    await loginAsAdminUser(page);

    // Step 5: Click on the "Projects" section in the sidebar
    await goToProjectsSection(page);

    // Step 6: Create Two New Projects
    await createProject(page, 'Project 1');
    await createProject(page, 'Project 2');

    // Step 7: Create a task in each project and assign it to the standard user
    await createTaskInProject(page, 'Project 1', 'Task 1 in Project 1', 'Task description 1', 'Some comments on Task 1', 'Standard user');
    await createTaskInProject(page, 'Project 2', 'Task 1 in Project 2', 'Task description 2', 'Some comments on task 2', 'Standard user');

    // Step 8: As an administrator, go to the task section of the sidebar
    await goToTasksSection(page);

    // Step 9: Verify that the newly created tasks are not assigned
    await assertNoAssignedTasks(page);

    // Step 10: Go to the "Tasks" section on the sidebar as a standard user
    await loginAsStandardUser(page);
    await goToTasksSection(page);

    // Step 11: Check for new tasks on the page
    const assignedTasks = await page.$$('.assigned-task');
    expect(assignedTasks.length).toBe(2);

    // Step 12: Click each task to open and verify the details pane
    for (const task of assignedTasks) {
        await task.click();

        // Step 13: Make sure the content is displayed correctly.
        await validateTaskDetails(page);

        // Step 14: Close the details pane
        await closeTaskDetailsPane(page);
    }
});

async function loginAsStandardUser(page) {
    await page.goto('https://abhijit-mishra.neetoplanner.net/dashboard/active');
    await page.fill('#username', 'standard_user');
    await page.fill('#password', 'standard_user_password');
    await page.click('#login_button');
}

async function loginAsAdminUser(page) {
    await page.goto('https://abhijit-mishra.neetoplanner.net/dashboard/active');
    await page.fill('#username', 'admin_user');
    await page.fill('#password', 'admin_user_password');
    await page.click('#login_button');
}

async function goToTasksSection(page) {
    await page.click('nav.sidebar > ul > li:nth-child(2) > a');
}

async function assertNoAssignedTasks(page) {
    const noTasks = await page.$('.no-tasks-message');
    expect(noTasks).not.toBeNull();
}

async function goToProjectsSection(page) {
    await page.click('nav.sidebar > ul > li:nth-child(3) > a');
}

async function createProject(page, projectName: string) {
    await page.click('#create-project-button');
    await page.fill('#project-name-input', projectName);
    await page.click('#save-project-button');
}

async function createTaskInProject(page, projectName: string, taskName: string, description: string, comments: string, assigned: string) {
    await page.click(`.project-title:has-text("${projectName}")`);
    await page.click('#add-task-button');
    await page.fill('#task-name-input', taskName);
    await page.fill('#task-description-input', description);
    await page.fill('#task-comments-input', comments);
    await page.selectOption('#assigned-dropdown', { label: assigned });
    await page.click('#save-task-button');
}

async function validateTaskDetails(page) {
    // Assume task details are displayed in a modal or pane
    await page.waitForSelector('https://abhijit-mishra.neetoplanner.net/tasks/assigned-to-me');
    // Add validation logic here
}

async function closeTaskDetailsPane(page) {
    await page.click('.close-button');
}
