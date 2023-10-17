"use strict";
// // 기본적인 함수 오버로딩 예시
function saySomething(word) {
    if (typeof word === "string") {
        return word;
    }
    else if (Array.isArray(word)) {
        return word.join(" ");
    }
    throw new Error("unable to say something");
}
saySomething(["hello", "world"]);
