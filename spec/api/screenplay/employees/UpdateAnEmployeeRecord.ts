import {
    Ensure, equals, property, startsWith,
} from '@serenity-js/assertions';
import {Log, Task} from '@serenity-js/core';
import {LastResponse, PutRequest, Send} from '@serenity-js/rest';

export const UpdateAnEmployeeRecord = (id: string, name: string, salary: string, age: string) =>

    Task.where(`#actor ensures that a specific employee record can be updated`,
        Send.a(PutRequest.to(`/api/v1/update/${id}`).with({
            name: {name},
            salary: {salary},
            age: {age},
        })),

        Ensure.that(LastResponse.header('content-type'), startsWith('application/json')),
        Ensure.that(LastResponse.status(), equals(200)),
        Ensure.that(LastResponse.body(), property('status', equals('success'))),
        Log.the(LastResponse.body()),

    );