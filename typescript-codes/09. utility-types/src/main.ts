// Partial

interface Address {
  email: string;
  address: string;
}

const me: Partial<Address> = {};
const you: Partial<Address> = { email: "example@naver.com" };
const all: Address = { email: "example@naver.com", address: "john" };

// Pick
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// 특정 타입에서 몇 개의 속성을 Pick 해서, 새로운 타입을 정의하는 것을 말한다.
type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean Room",
  completed: false,
};

// Omit, 생략하다. 특정 속성을 제외한 나머지 속성들만 가지고 새로운 타입을 정의하는 것을 말한다.
interface Todo02 {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview02 = Omit<Todo02, "description">;
const todo02: TodoPreview02 = {
  title: "Clean Room",
  completed: false,
  createdAt: 1241223,
};

// Exclude, 일반 Union 유형을 전달한 다음 두 번째 인수에서 제거할 멤버를 지정

// Required
type User = {
  firstName: string;
  lastname?: string;
};
let User01: User = {
  firstName: "john",
};
let User02: Required<User> = {
  firstName: "john",
  lastname: "Two",
};

// Record <Keys, Type>. 여기서 Keys 는 Union 으로서, 가능한 Key Name 들을 의미.
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "persian" },
  boris: { age: 5, breed: "persian" },
  mordred: { age: 16, breed: "persian" },
};

// ReturnType<T>. 추정컨데, 라이브러리에서 받아올 때그에 대한 클래스를
// 정의하는 과정을 생략하는데에 사용하는 것으로 생각된다.
type T0 = ReturnType<() => string>;
type T1 = ReturnType<(s: string) => void>;

function fn(str: string) {
  return str;
}
const a: ReturnType<typeof fn> = "Hello";
