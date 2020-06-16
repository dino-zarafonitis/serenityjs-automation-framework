import {
    Ensure, equals, property, startsWith,

} from '@serenity-js/assertions';
import {Task} from '@serenity-js/core';
import {LastResponse, PostRequest, Send} from '@serenity-js/rest';

export const CreateEmployeeRecord = (name: string, salary: string, age: string) => {

return Task.where(`#actor ensures that an employee record can be created`,
        // create a new employee record
        Send.a(PostRequest.to('api/v1/create').with({
            name: {name},
            salary: {salary},
            age: {age},
        })),
        Ensure.that(LastResponse.header('content-type'), startsWith('application/json')),
        Ensure.that(LastResponse.status(), equals(200)),
        Ensure.that(LastResponse.body(), property('status', equals('success'))),
    );
};