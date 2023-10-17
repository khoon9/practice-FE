"use strict";
// // ts 에서의 클래스 정의
// class Post {
//   public id: number = 0;
//   public title: string = "";
//   constructor(id: number, title: string) {
//     // ts 에서는 this 로 접근하는 속성들을 위한 타입을 class body 안에 넣어줘야 한다.
//     this.id = id;
//     this.title = title;
//   }
//   getPost() {
//     return `postId: ${this.id}, postTitle: ${this.title}`;
//   }
// }
// const post: Post = new Post(1, "title 1");
// 생성자에 의한 속성 정의 간소화
class Post {
    constructor(id = 0, title = "") {
        this.id = id;
        this.title = title;
    }
    getPost() {
        return `postId: ${this.id}, postTitle: ${this.title}`;
    }
}
const post = new Post(1, "title 1");
