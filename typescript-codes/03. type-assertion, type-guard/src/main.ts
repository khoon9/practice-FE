const bodyElement01 = document.querySelector("body") as HTMLBodyElement;
bodyElement01.innerText = "Hello";

const bodyElement02 = document.querySelector("body");
bodyElement02!.innerText = "Hello";

const bodyElement03 = document.querySelector("body");
if (bodyElement03) {
  bodyElement03.innerText = "Hello";
}

// 타입 단언을 잘못 사용한 경우
// function func01(arg: string | null) {
//   return (arg as string).toLowerCase();
// }
// func01("hello");
// func01(null);
function func02(arg: string | null) {
  if (arg) {
    return arg.toLowerCase();
  }
}
func02("hello");
func02(null);
