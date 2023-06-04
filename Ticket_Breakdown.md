# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

With the assumption that same agent can work in different facilities

Task-1:
1. Create a new DB Table AgentFacilityMapping with columns facility_id, agent_id, custom_agent_id also create a unique composite index on facility_id and custom_agent_id.
Estimate: Half day
Acceptance: New table in all the environment(dev/staging/prod) with the required indexes.

Task-2:
In generate report need to update the functionality need to add the functionality
1. Crate a map of internal id and custom id for all the agent for whom reports are generated from the table "AgentFacilityMapping".
2. Replace agent id with custom id in the report for the institute.
Estimate: Half day
Acceptance: Generate report should have the custom_id given by the facility.

Task-3:
1. Custom Ids of existing agents to be added in the database
Estimate: Business team can provide
Acceptance: Structured data in csv with information (facility_id, agent_id, custom_agent_id)

Task-4:
1. Script to fill data of existing agent in the table.
Estimate: Half day
Acceptance: One time script to run save data in DB. Scripts updates should be atomic and idempotent on DB call. If script run multiple time it should not corrupt the data.

