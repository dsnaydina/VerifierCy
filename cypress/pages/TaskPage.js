class TaskPage {
    navigateToTasks() {
        cy.get('[data-cy="entity"] > .d-flex').click();
        cy.get('[href="/task"] > span').click();
    }

    createTask(title, text, answer) {
        cy.get('[data-cy="entityCreateButton"] > span').click();
        cy.get('[data-cy="title"]').type(title);
        cy.get('[data-cy="text"]').type(text);
        cy.get('[data-cy="answer"]').type(answer);
        cy.get('[data-cy="entityCreateSaveButton"] > span').click();
    }
}
export default TaskPage;


