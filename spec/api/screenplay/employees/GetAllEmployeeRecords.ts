import {
    containItemsWhereEachItem,
    Ensure, equals, property, startsWith} from '@serenity-js/assertions';

import {Log, Question, Task, Transform} from '@serenity-js/core';
import {GetRequest, LastResponse, Send} from '@serenity-js/rest';

interface Response {
    status: string;
    data: Employee[];
}

export interface Employee {
    id: string;
    employee_name: string;
    employee_salary: string;
    employee_age: string;
    profile_image: string;
}

const AllTheEmployeesFrom = (apiResponse: Question<Response>) =>
    Transform.the(apiResponse, body => body.data as Employee[]);

const EmployeesById = (id: string, allEmployees: Transform<Response, Employee[]>) =>
    Question.about(`employee record by id ${ id }`, actor =>
        actor.answer(allEmployees).then(employees => employees.filter(employee => employee.id === id)));

export const EnsureEmployeesResponseContainsDataWith = (id: string, propertyName: any,
                                                        expectedValue: string, apiResponse: Question<Response>) =>
    Task.where(`#actor verifies the property name of an employee`,
        Ensure.that(
            EmployeesById(id, AllTheEmployeesFrom(apiResponse)),
            containItemsWhereEachItem(property(propertyName, equals(expectedValue)))
        ),
    );

export const GetAllEmployeeRecords = () =>

    Task.where(`#actor ensures that all employee data can be accessed`,
        Send.a(GetRequest.to('/api/v1/employees')),
        Ensure.that(LastResponse.header('content-type'), startsWith('application/json')),
        Ensure.that(LastResponse.status(), equals(200)),
        Ensure.that(LastResponse.body(), property('status', equals('success'))),
        Log.the(LastResponse.body()),
    );