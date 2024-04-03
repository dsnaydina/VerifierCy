describe('Negative Tests - Task API', () => {
    it('fails to create a task with invalid data', () => {
        const apiUrl = 'https://sqlverifier-live-6e21ca0ed768.herokuapp.com/api/tasks';
        const authToken = Cypress.env('authToken');
        const invalidTaskData = {

            text: null,
            answer: true,
            title: false
        };

        cy.log('Attempting to create a task with invalid data:');
        cy.log(JSON.stringify(invalidTaskData));

        cy.request({
            method: 'POST',
            url: apiUrl,
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: invalidTaskData,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.not.equal(201);
            cy.log(`Request failed with status code: ${response.status}`);
            cy.log(`Response body: ${JSON.stringify(response.body)}`);
        });
    });

    it('fails to delete a task with invalid task ID', () => {
        const invalidTaskId = 'invalid_task_id';
        const apiUrl = `https://sqlverifier-live-6e21ca0ed768.herokuapp.com/api/tasks/${invalidTaskId}`;
        const authToken = Cypress.env('authToken');

        cy.log(`Attempting to delete a task with invalid task ID: ${invalidTaskId}`);

        cy.request({
            method: 'DELETE',
            url: apiUrl,
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${authToken}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.not.equal(204);
            cy.log(`Request failed with status code: ${response.status}`);
            cy.log(`Response body: ${JSON.stringify(response.body)}`);
        });
    });
});
