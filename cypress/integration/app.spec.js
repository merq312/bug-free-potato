describe("Message Client", () => {
    beforeEach(() => {
        cy.visit("localhost:3000")
    })

    it("can send a message", () => {
        cy.get("[data-cy=input-message]").type("Hello Cypress")
        cy.get("[data-cy=send-message]").click()

        cy.get("[data-cy=messages]").last().should("have.text", "Hello Cypress")
    })

    it("can set user name", () => {
        cy.get("[data-cy=input-username]").clear().type("Alice")

        cy.get("[data-cy=users]").last().should("have.text", "Alice")
    })
})
