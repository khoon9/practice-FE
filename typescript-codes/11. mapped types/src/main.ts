// Union 에 대한 Mapped type 사용

type Users = "John" | "Han" | "Kim";

type UserFirstNames = { [K in Users]: string };
const userFirstNameInfo: UserFirstNames = {
  John: "Doe",
  Han: "Ho",
  Kim: "jun",
};

type UserAge = { [K in Users]: number };
const userAgeInfo: UserAge = {
  John: 10,
  Han: 20,
  Kim: 30,
};

// type 에 대한 Mapped type 사용 <- 실용적
type DeviceFormatter<T> = {
  [K in keyof T]: T[K];
};
type Device = {
  manufacturer: string;
  price: number;
};

const iphone: DeviceFormatter<Device> = {
  manufacturer: "apple",
  price: 100,
};

type DeviceFormatterPartials<T> = {
  [K in keyof T]?: T[K];
};

const priceOnly: DeviceFormatterPartials<Device> = {
  price: 23,
};
const manufacturerOnly: DeviceFormatterPartials<Device> = {
  manufacturer: "apple",
};
const empty: DeviceFormatterPartials<Device> = {};
