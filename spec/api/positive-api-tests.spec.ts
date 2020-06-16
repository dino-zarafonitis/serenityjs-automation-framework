import 'jasmine';

import {CallAnApi, LastResponse} from '@serenity-js/rest';
import {actorCalled, Transform} from '@serenity-js/core';
import {Ensure, equals, property} from '@serenity-js/assertions';
import {GetAllEmployeeRecords, EnsureEmployeesResponseContainsDataWith} from './screenplay/employees/GetAllEmployeeRecords';
import {
    GetEmployeeRecordBy,
    GetEmployeeRecordFrom,
    TheEmployeeIdFrom
} from './screenplay/employees/GetEmployeeRecordBy';
import {UpdateAnEmployeeRecord} from './screenplay/employees/UpdateAnEmployeeRecord';
import {CreateEmployeeRecord} from './screenplay/employees/CreateEmployeeRecord';
import {DeleteEmpoloyeeRecord} from './screenplay/employees/DeleteEmployeeRecord';
import {Employee} from './screenplay/employees/Employee';
import {Value} from '@serenity-js/protractor';

describe(`API Positive Tests`, () => {

    it(`allows to determine if all the employee data are accessible`, () =>
        actorCalled('User')
            .whoCan(
                CallAnApi.at(process.env.npm_package_config_environment),
            )
            .attemptsTo(
                GetAllEmployeeRecords(),

                // verifying the number of expected records
                Ensure.that(Transform.the(LastResponse.body(), body => body.data.length), equals(24)),

                // verify the first employee record
                EnsureEmployeesResponseContainsDataWith('1', 'employee_name', 'Tiger Nixon', LastResponse.body()),
                EnsureEmployeesResponseContainsDataWith('1', 'employee_salary', '320800', LastResponse.body()),
                EnsureEmployeesResponseContainsDataWith('1', 'employee_age', '61', LastResponse.body()),
                EnsureEmployeesResponseContainsDataWith('1', 'profile_image', '', LastResponse.body()),

                // verify the last employee  record
                EnsureEmployeesResponseContainsDataWith('24', 'employee_name', 'Doris Wilder', LastResponse.body()),
                EnsureEmployeesResponseContainsDataWith('24', 'employee_salary', '85600', LastResponse.body()),
                EnsureEmployeesResponseContainsDataWith('24', 'employee_age', '23', LastResponse.body()),
                EnsureEmployeesResponseContainsDataWith('24', 'profile_image', '', LastResponse.body()),
));

    const employee1 = new Employee('1', 'Tiger Nixon', '320800', '61');

    it(`allows to determine if the data of a single employee can be successfully retrieved`, () =>
        actorCalled('User')
            .whoCan(
                CallAnApi.at(process.env.npm_package_config_environment),
            )
            .attemptsTo(
                GetEmployeeRecordBy(employee1.id),

                // verifying the expected employee record was retrieved
                Ensure.that(LastResponse.body(), property('data', equals({employee_name: employee1.name}))),
                Ensure.that(LastResponse.body(), property('data', equals({employee_salary: employee1.salary}))),
                Ensure.that(LastResponse.body(), property('data', equals({employee_age: employee1.age}))),
                Ensure.that(LastResponse.body(), property('data', equals({profile_image: employee1.profile_image}))),
            ));

    const employee2 = new Employee('', 'Jiro Kato', '162300', '28');
    it(`allows to determine if a new employee record can be created`, () =>
        actorCalled('User')
            .whoCan(
                CallAnApi.at(process.env.npm_package_config_environment),
            )
            .attemptsTo(
                CreateEmployeeRecord(employee2.name, employee2.salary, employee2.age),
                Ensure.that(LastResponse.body(), property('data', property('name', equals(employee2.name)))),
                Ensure.that(LastResponse.body(), property('data', property('salary', equals(employee2.salary)))),
                Ensure.that(LastResponse.body(), property('data', property('age', equals(employee2.age)))),

                GetEmployeeRecordFrom(TheEmployeeIdFrom(LastResponse.body())),
                Ensure.that(LastResponse.body(), property('data', property('name', equals(employee2.name)))),
                Ensure.that(LastResponse.body(), property('data', property('salary', equals(employee2.salary)))),
                Ensure.that(LastResponse.body(), property('data', property('age', equals(employee2.age)))),

            ));

    const employee3 = new Employee('4', 'Jiro Kato', '162300', '28');
    it(`allows to determine if an employee record can be updated`, () =>
        actorCalled('Admin')
            .whoCan(
                CallAnApi.at(process.env.npm_package_config_environment),
            )
            .attemptsTo(
                UpdateAnEmployeeRecord(employee3.id, employee3.name, employee3.salary, employee3.age),

                // verify if the employee record has been updated as expected
                GetEmployeeRecordBy(employee3.id),
                Ensure.that(LastResponse.body(), property('data', property('name', equals(employee3.name)))),
                Ensure.that(LastResponse.body(), property('data', property('salary', equals(employee3.salary)))),
                Ensure.that(LastResponse.body(), property('data', property('age', equals(employee3.age)))),
                Ensure.that(LastResponse.body(), property('data', property('id', equals(employee3.id)))),

            ));


    const employee4 = new Employee('2', 'Garrett Winters', '170750', '63');
    it(`allows to determine if an employee record can be deleted`, () =>
        actorCalled('Admin')
            .whoCan(
                CallAnApi.at(process.env.npm_package_config_environment),
            )
            .attemptsTo(
                // delete the record
                DeleteEmpoloyeeRecord(employee4.id),
                Ensure.that(LastResponse.body(), property('status', equals('success'))),
                Ensure.that(LastResponse.body(), property('message', equals('successfully! deleted Records'))),

                // TODO: verify the record has been deleted from /employees...

            ));
});