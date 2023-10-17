interface Animal {
  name: string;
}
interface Bear extends Animal {
  honey: boolean;
}

const bear1: Bear = {
  name: "honey bear",
  honey: true,
};

type Animal02 = {
  name: string;
};
// 인터섹션 오퍼레이터
type Bear02 = Animal02 & {
  honey: boolean;
};

const bear2: Bear02 = {
  name: "honey bear",
  honey: true,
};

// interface 에서는 선언 병합 가능
interface AnimalMerged {
  name: string;
}
interface AnimalMerged {
  honey: boolean;
}

const bear3: AnimalMerged = {
  name: "honey bear",
  honey: true,
};
// 두 형식 모두 implements 사용 가능
interface IArticle {
  category: string;
  content: string;
}
class Article01 implements IArticle {
  public category = "";
  public content = "";
}
type MyArticle = {
  category: string;
  content: string;
};
class Article02 implements MyArticle {
  public category = "";
  public content = "";
}
// 두 형식 모두 Union 지정 가능. 단, type 로 선언해야한다.
interface IAnimal {
  name: string;
}
interface IBear {
  honey: boolean;
}

type INewType = IAnimal | IBear;

const bear4: INewType = {
  name: "honey bear",
  honey: true,
};

type Animal0 = {
  name: string;
};
type Bear0 = {
  honey: boolean;
};

type NewType = Animal0 | Bear0;

const bear5: NewType = {
  name: "honey bear",
  honey: true,
};
