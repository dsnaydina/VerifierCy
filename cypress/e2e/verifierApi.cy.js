describe('Delete Task via API', () => {
    let taskIdToDelete;
    beforeEach(() => {

        const apiUrl = 'https://sqlverifier-live-6e21ca0ed768.herokuapp.com/api/tasks';
        const authToken = Cypress.env('authToken');
        const taskData = {
            text: "Task to be deleted",
            answer: "string",
            title: "string"
        };

        cy.request({
            method: 'POST',
            url: apiUrl,
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: taskData
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');


            taskIdToDelete = response.body.id;
            cy.log(`Task created with ID: ${taskIdToDelete}`);
        });
    });

    it('successfully deletes a task', () => {
        expect(taskIdToDelete).to.not.be.undefined;
        cy.log(`Deleting task with ID: ${taskIdToDelete}`);

        const apiUrl = `https://sqlverifier-live-6e21ca0ed768.herokuapp.com/api/tasks/${taskIdToDelete}`;
        const authToken = Cypress.env('authToken');

        cy.request({
            method: 'DELETE',
            url: apiUrl,
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${authToken}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(204);
            cy.log(`Task deleted with ID: ${taskIdToDelete}`);
            cy.log(`Delete request status code: ${response.status}`);
        });
    });
});
