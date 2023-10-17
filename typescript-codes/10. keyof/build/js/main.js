"use strict";
const user = {
    name: "John",
    age: 20,
    address: "seoul",
};
var UserRole;
(function (UserRole) {
    UserRole[UserRole["admin"] = 0] = "admin";
    UserRole[UserRole["manage"] = 1] = "manage";
})(UserRole || (UserRole = {}));
