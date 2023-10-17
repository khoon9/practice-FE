// Boolean
let boolean: boolean;
let falseBoolean: boolean = false;

// Number
let number: number;
let integer: number = 6;
let float: number = 1.2345;

// String
let string: string;
let firstName: string = "Doe";

// Array
// 한가지 타입만 가지는 배열
let names1: string[] = ["John", "Kim"];
let names2: Array<string> = ["John", "Kim"];

// 여러 타입을 가지는 배열(유니언 타입 사용)
let array1: (string | number)[] = ["John", 1, 2];
let array2: Array<string | number> = ["John", 1, 2];

// 여러 타입을 단언할 수 없다면, any 사용
let someArray = ["John", 1, [], {}, false];

// Interface, Type

// 읽기 전용 배열 생성(readonly, ReadonlyArray)
let stringArray: readonly string[] = ["A", "B"];
let numberArray: ReadonlyArray<number> = [1, 2];

// Tuple
let tuple1: [string, number];
tuple1 = ["a", 1];
tuple1 = ["a", 1];

let users: [number, string][];
users = [
  [1, "John"],
  [2, "Doe"],
];

let tuple2: [string, number];
tuple2 = ["a", 1];
// tuple 이라도 push 는 허용된다. 물론 무관한 형식은 허용되지 않는다
tuple2.push("b");
console.log(tuple2);

// sny
let any: any = "abc";
any = 1;
any = [];

// unknown.
let unknown1: unknown = false;
let boolean1: boolean = unknown1 as boolean;

// object type
// {}, [], null, new Date() 모두 object 로 취급. 하지만 이는 형식상 출력.
let obj1: object = {};
let arr1: object = [];
// compilerOptions - strict - true 설정에 의한 컴파일 검열 발생
// let nul1: object = null;
let date1: object = new Date();

// 객체 선언 방식
const obj2: object = {
  id: 1,
  title: "title1",
};
// 올바른 선언 방식
const obj3: { id: number; title: string } = {
  id: 1,
  title: "title1",
};

// Union
let union: string | number;
union = "h1";
union = 123;

// Function
let func1: (arg1: number, arg2: number) => number;
func1 = function (x, y) {
  return x * y;
};

let func2: () => void;
func2 = function () {
  console.log("h1");
};

// Null, Undefined
// string null check 가 false 일 경우 에러가 발생하지 않는 것들
// let number1: number = undefined;
// let string9: string = null;
// let object: { a: 10; b: false } = undefined;
// let array: any[] = null;
// let undefined1: undefined = null;
// let null1: null = undefined;
// let void1: void = null;
let void2: void = undefined;

// void
function greeting(): void {
  console.log("h1");
}
// greeting 은 void 이기에 undefined 을 반환하지만, void 라고 명시해줘야 한다.
const h1: void = greeting();

// never
function throwError(): never {
  throw new Error("error");
}

function keepProcessing(): never {
  while (true) {
    console.log("hi");
  }
}
// 아무런 type 도 명시되지 않은 빈 배열 [] 은 never[] 와 동일한 취급을 한다.
const neverarr1: [] = [];
const neverarr2: never[] = [];

const stringarr1: string[] = [];
stringarr1.push("hi");
