// 함수 매개변수 union 사용
// function getArrayLength(arr: number[] | string[] | boolean[]): number {
//   return arr.length;
// }
// const array1 = [1, 2, 3];
// const array2 = ["a", "b", "c"];
// const array3 = [true, false, false];

// getArrayLength(array1);
// getArrayLength(array2);
// getArrayLength(array3);

// 함수 매개변수 제너릭 사용
// function getArrayLength<T>(arr: T[]): number {
//   return arr.length;
// }

// const array1 = [1, 2, 3];
// const array2 = ["a", "b", "c"];
// const array3 = [true, false, false];

// getArrayLength<number>(array1);
// getArrayLength<string>(array2);
// getArrayLength<boolean>(array3);

// // any 사용
// interface Vehicle {
//   name: string;
//   color: string;
//   option: any;
// }
// const car: Vehicle = {
//   name: "Car",
//   color: "red",
//   option: {
//     price: 1000,
//   },
// };
// const bike: Vehicle = {
//   name: "Bike",
//   color: "green",
//   option: true,
// };

// // 제너릭 사용
// interface Vehicle<T> {
//   name: string;
//   color: string;
//   option: T;
// }
// const car: Vehicle<{ price: number }> = {
//   name: "Car",
//   color: "red",
//   option: {
//     price: 1000,
//   },
// };
// const bike: Vehicle<boolean> = {
//   name: "Bike",
//   color: "green",
//   option: true,
// };

// 제너릭 두 개 사용
const makeArray01 = <T, Y>(x: T, y: Y): [T, Y] => {
  return [x, y];
};

const array01 = makeArray01<number, number>(4, 5);
const array02 = makeArray01<string, string>("a", "b");

const makeArray02 = <T, Y = string>(x: T, y: Y): [T, Y] => {
  return [x, y];
};
const array03 = makeArray02<string>("a", "b");

// // 제너릭을 extense 와 함께 사용
// // 이 상황에서 obj 의 속성으로 다른 속성들도 포함되어 들어올 수 있도록 할 때 제너릭 적용가능
// const makeFullName = (obj: { firstName: string; lastName: string }) => {
//   return {
//     ...obj,
//     fullName: obj.firstName + " " + obj.lastName,
//   };
// };
// makeFullName({firstName:"John", lastName:"Doe"})
// 제너릭
const makeFullName = <T extends { firstName: string; lastName: string }>(
  obj: T
) => {
  return {
    ...obj,
    fullName: obj.firstName + " " + obj.lastName,
  };
};
makeFullName({ firstName: "John", lastName: "Doe", location: "Seoul" });
makeFullName({ firstName: "John", lastName: "Doe", hello: "Greeting" });
