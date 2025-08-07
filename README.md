# API & UI Automation with Serenity/JS

## Note
This assignment is using Serenity/JS which is a next generation full-stack acceptance testing framework with the ability to automate both functional API and UI tests. You can learn more at [serenity-js.org](https://serenity-js.org).

## Test Plan

The following test categories have been briefly identified. In a real world scenario, a [Visual Task Analysis*](https://drive.google.com/file/d/1ThrYRcO3zs3uaxuJXUSlbFClTqQAKYqd/view) and/or a [Mind Map*](https://drive.google.com/file/d/1SkstPU4XvY-TbGifzT9HBi4bn0tgjpUr/view) would have been used for modelling the system as well as identifying and oragnising more testing categories. The Visual Task Analysis in combination with the Serenity-JS would have provided an API + UI automation solution under the same framework. *The illustrations are given only as a general reference.


| Test Scenario Category                                | Category                                                                                                                                                                                      | Description                                                                                                                              | Status           | Specification             |
|-------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|------------------|---------------------------|
| Execution of API calls with valid required parameters | Validation of Status Code [200] for  /employees /employee{id} /create  /update{id}   /delete{id}                                                                                                   | Returned status code is according to spec                                                                                                | Completed        | postive-api-tests.spec.ts |
|                                                       | Validation of header [content-type] for  /employees /employee{id} /create /update{id}  /delete{id}                                                                                              | Verification of response headers                                                                                                         | Completed        | postive-api-tests.spec.ts |
|                                                       | Validation of system state for   /create   /update{id}   /delete{id}                                                                                                                                | Ensuring the action has been performed correctly by the system. For POST and PUT perform appropriate GET request and inspecting response | Mostly Completed | postive-api-tests.spec.ts |
| Negative testing with valid input                     | Attempting to create an employee with a name, salary, age that already exists                                                                                                                 |                                                                                                                                          | Pending          |                           |
|                                                       | Attempting to delete an employee that doesn’t exist (e.g. an employee with no such 'id')                                                                                                      |                                                                                                                                          | Pending          |                           |
|                                                       | Attempting to update an employee with illegal valid data (e.g. renaming an employee to an existing name)                                                                                      |                                                                                                                                          | Pending          |                           |
| Negative testing with invalid input                   | Missing or invalid authorisation token                                                                                                                                                        |                                                                                                                                          | Pending          |                           |
|                                                       | Missing required parameters                                                                                                                                                                   |                                                                                                                                          | Pending          |                           |
|                                                       | Payload with invalid model (violation of schema)                                                                                                                                              |                                                                                                                                          | Pending          |                           |
| Verification of payload                               | Verify that error format is according to spec. e.g., error is a valid JSON object or a plain string (as defined in spec)                                                                      |                                                                                                                                          | Pending          |                           |
|                                                       | Response structure is according to data model  (schema validation) field names and field types are as expected, including nested objects; field values are, non-nullable fields are not null) |                                                                                                                                          | Pending          |                           |


###

## Prerequisites

To use this project, you'll need:
- Node.js, a Long-Term Support (LTS) release version 10 or later - [download](https://nodejs.org/en/)
- Java Runtime Environment (JRE) or a Java Development Kit (JDK) version 8 or later - [download](https://adoptopenjdk.net/)
- Chrome web browser - [download](https://www.google.co.uk/chrome/)

## Usage

```
npm ci                  # installs the node modules
npm run lint            # runs the code linter
npm run test:uat        # executes the example tests on UAT environment and generates the html report under ./target/site/serenity
npm run test:prod       # executes the example tests on PROD environment and generates the html report under ./target/site/serenity
```

