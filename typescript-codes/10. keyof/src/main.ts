interface IUser {
  name: string;
  age: number;
  address: string;
}

type UserKeys = keyof IUser;

const user = {
  name: "John",
  age: 20,
  address: "seoul",
};

type UserKeys02 = keyof typeof user;

enum UserRole {
  admin,
  manage,
}

type UserKeys03 = keyof typeof UserRole;
