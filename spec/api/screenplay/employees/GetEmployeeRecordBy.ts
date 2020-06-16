import {Ensure, equals, property, startsWith,

} from '@serenity-js/assertions';
import {Duration, Log, Question, Task, Transform} from '@serenity-js/core';
import { GetRequest, LastResponse, Send } from '@serenity-js/rest';

interface Employee {
    name: string;
    salary: string;
    age: string;
    id: string;
}

interface Response {
    status: string;
    data: Employee;
}

export const TheEmployeeIdFrom = (apiResponse: Question<Response>) =>
    Transform.the(apiResponse, body => body.data.id as Employee['id']);

export const GetEmployeeRecordBy = (id: string) =>

    Task.where(`#actor ensures that the ${id}th employee record can be retrieved`,
        Send.a(GetRequest.to(`/api/v1/employee/${id}`)),
        Ensure.that(LastResponse.header('content-type'), startsWith('application/json')),
        Ensure.that(LastResponse.body(), property('status', equals('success'))),
        Log.the(LastResponse.body()),
    );

export const GetEmployeeRecordFrom = (id: Transform<Response, string>) =>

    Task.where(`#actor ensures that the ${id}th employee record can be retrieved`,
        Send.a(GetRequest.to(`/api/v1/employee/${id}`)),
        Ensure.that(LastResponse.header('content-type'), startsWith('application/json')),
        Ensure.that(LastResponse.body(), property('status', equals('success'))),
        Log.the(LastResponse.body()),
    );
