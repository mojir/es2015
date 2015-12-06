"use strict";

const data = {
    fistname: "Albert",
    surname: "Mojir",
    age: 36,
    address: {
        street: "Storahultsgatan 1",
        postalCode: "216 22",
        postalAddress: "Limhamn"
    }
};

const {firstname, surname, age} = data;
const {address: {postalCode}} = data;

console.log("First name: " + firstname);
console.log("Surname: " + surname);
console.log("age: " + age);
console.log("Postal code: " + postalCode);
