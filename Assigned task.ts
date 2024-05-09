import { test, expect } from '@playwright/test';

test('Evidence study created and detailed report', async ({ page }) => {
    // Step 1: Visit neetoPlanner subdomain
    await page.goto('https://abhijit-mishra.neetoplanner.net/dashboard/active ');

    // Step 2: Go to the Tasks section in the sidebar
    await page.click('nav.sidebar > ul > li:nth-child(2) > a');

    // Step 3: Show that there are no tasks currently
    const noTasks = await page.$('.no-tasks-message');
    expect(noTasks).not.toBeNull();

    // Step 4: Click on the "Projects" section on the sidebar
    await page.click('nav.sidebar > ul > li:nth-child(3) > a');

    // Step 5: Create two new projects
    await createProject(page, 'Project 1');
    await createProject(page, 'Project 2');

    // Step 6: Create a task within each project and assign it to the existing user login
    await createTaskInProject(page, 'Project 1', 'Task 1 in Project 1', 'Task Description 1', 'Some notes on Task 1');
    await createTaskInProject(page, 'Project 2', 'Task 1 in Project 2', 'Task description 2', 'Some comments on Task 2');

    // Step 7: Go to the working section of the sidebar
    await page.click('nav.sidebar > ul > li:nth-child(2) > a');

    // Step 8: Make sure the two new tasks are on the page
    const signedTasks = await page.$$('.signed-task');
    expect(signedTasks.length).toBe(2);

    // Step 9: Click each task to open it and use the content pane
    for (const task of signedTasks) {
        await task.click();

        const description = await page.$('.task-description');
        expect(description).not.toBeNull();

        const comments = await page.$$('.task-comment');
        expect(comments.length).toBeGreaterThan(0);

        const assignee = await page.$('.task-signee');
        expect(assignee).not.toBeNull();

        // Step 10: Close the task details pane
        await page.click('.close-button');
    }
});

async function createProject(page, projectName: string) {
    // Code to create the project
    await page.click('#create-project-button');
    await page.fill('#project-name-entry', projectName);
    await page.click('#save-project-button');
}

async function createTaskInProject(page, projectName: string, taskName: string, description: string, comments: string) {
    // Code to create the task in the project
    await page.click(`.project-title:has-text("${projectName}")`);
    await page.fill('#task-name-entry', taskName);
    await page.fill('#task-description-entry', description);
    await page.fill('#task-comment-entry', comments);
    await page.click('#sign-to-me-checkbox');
    await page.click('#save-task-button');
}
