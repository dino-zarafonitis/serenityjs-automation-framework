export interface Data {
    id: string;
    name: string;
    salary: string;
    age: string;
    profile_image: string;
}

class Person {

     name: string;
     age: string;

     constructor(name: string, age: string) {
        this.name = name;
        this.age = age;
    }
}

export class Employee extends Person {
    id: string;
    salary: string;
    profile_image: string;

    constructor(id: string, name: string, salary: string, age: string) {
        super(name, age);
        this.id = id;
        this.salary = salary;
        this.profile_image = '';
    }
}