import {
    Ensure, equals, startsWith,
} from '@serenity-js/assertions';
import {Log, Task} from '@serenity-js/core';
import {DeleteRequest, LastResponse, Send} from '@serenity-js/rest';

export const DeleteEmpoloyeeRecord = (id: string) =>

    Task.where(`#actor ensures that a specific employee record can be delete`,
        Send.a(DeleteRequest.to(`/api/v1/delete/${id}`)),
        Ensure.that(LastResponse.header('content-type'), startsWith('application/json')),
        Ensure.that(LastResponse.status(), equals(200)),
        Log.the(LastResponse.body()),
    );