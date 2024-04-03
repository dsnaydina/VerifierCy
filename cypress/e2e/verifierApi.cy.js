describe('Delete Task via API', () => {
    let taskIdToDelete; // Define a variable to store the task ID to be deleted

    beforeEach(() => {
        // Before each test, create a task that will be deleted
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

            // Store the task ID for deletion
            taskIdToDelete = response.body.id;
            cy.log(`Task created with ID: ${taskIdToDelete}`);
        });
    });

    it('successfully deletes a task', () => {
        // Ensure that the task ID to be deleted has been retrieved and stored
        expect(taskIdToDelete).to.not.be.undefined;
        cy.log(`Deleting task with ID: ${taskIdToDelete}`);

        // Construct the URL for deleting the task
        const apiUrl = `https://sqlverifier-live-6e21ca0ed768.herokuapp.com/api/tasks/${taskIdToDelete}`;
        const authToken = Cypress.env('authToken');

        // Send a DELETE request to delete the task
        cy.request({
            method: 'DELETE',
            url: apiUrl,
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${authToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(204); // Update expectation to check for status code 204
            cy.log(`Task deleted with ID: ${taskIdToDelete}`);
            cy.log(`Delete request status code: ${response.status}`);
        });
    });
});
