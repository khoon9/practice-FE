// // 기본적인 함수 오버로딩 예시

// function add(a: string, b: string): string;
// function add(a: number, b: number): number;
// function add(a: any, b: any): any {
//   return a + b;
// }
// add("hello", "world");
// add(1, 1);

// String 배열 또는 String 입력에 대해 같은 기능을 수행하는 함수 만들기

// // 매개변수에 Union 을 주어 구현하는 방법
// function saySomething(word: string | string[]): string {
//   if (typeof word === "string") {
//     return word;
//   } else if (Array.isArray(word)) {
//     return word.join(" ");
//   }
//   throw new Error("unable to say something")
// }
// saySomething(["hello", "world"]);

// 함수 오버로딩을 통해 구현하는 방법
function saySomething(word: string): string;
function saySomething(word: string[]): string;
function saySomething(word: any): any {
  if (typeof word === "string") {
    return word;
  } else if (Array.isArray(word)) {
    return word.join(" ");
  }
  throw new Error("unable to say something");
}
saySomething(["hello", "world"]);
