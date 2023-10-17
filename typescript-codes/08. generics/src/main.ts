// function getArrayLength(arr: number[] | string[] | boolean[]): number {
//   return arr.length;
// }
function getArrayLength<T>(arr: T[]): number {
  return arr.length;
}
const array1 = [1, 2, 3];
const array2 = ["a", "b", "c"];
const array3 = [true, false, false];

// getArrayLength(array1);
// getArrayLength(array2);
// getArrayLength(array3);

getArrayLength<number>(array1);
getArrayLength<string>(array2);
getArrayLength<boolean>(array3);

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

// 제너릭 사용
interface Vehicle<T> {
  name: string;
  color: string;
  option: T;
}
const car: Vehicle<{ price: number }> = {
  name: "Car",
  color: "red",
  option: {
    price: 1000,
  },
};
const bike: Vehicle<boolean> = {
  name: "Bike",
  color: "green",
  option: true,
};
