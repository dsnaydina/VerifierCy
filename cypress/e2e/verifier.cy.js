import LoginPage from '../pages/LoginPage';
import TaskPage from '../pages/TaskPage';

describe('First test suite', () => {
   const loginPage = new LoginPage();
   const taskPage = new TaskPage();

   beforeEach(() => {
      // Assuming LoginPage has a method to perform login
      cy.visit("/login"); // Make sure this is the correct URL
      loginPage.login("admin_automation", "admin_automation");
      cy.get('[data-cy="TaskHeading"] > span').should('be.visible');
   });

   it('Login, create, delete task', function () {
      taskPage.navigateToTasks();
      taskPage.createTask('Task for CYPRESS', 'TEXT', 'ANSWER');
      // Assuming there's a method to confirm task creation or you add assertions here
   });
});
