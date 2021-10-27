{
  // 어느 한 곳에서 수정이 일어나면 다른 곳도 수동으로 해줘야한다
  /* Ex(
    type Video = {
        title: string;
        author: string;
        descrition: stirng; 🔙 추가 한다면 VideoOptional에도 추가해줘야함
    }
    type VideoOptional = {
        title? : string;
        author? : string;
        descrition: string;
    }
  )
  */
  type Video = {
    title: string;
    author: string;
  };

  type VideoOptional = {
    title?: string;
    author?: string;
  };

  type VideoReadOnly = {
    readonly title: string;
    readonly author: string;
  };

  type AnimalType = {
    name: string;
    age: number;
  };

  // ⭐️ 간편하게 하고 재사용성을 높이는 것이 map 타입이다.
  // 기존의 타입을 다른형태로 변환할 수 있음

  // T 타입의 key들을 돌면서, 그 key들에 value 값을 할당
  type Optional<T> = {
    [P in keyof T]?: T[P]; // for ... in
  };

  type ReadOnly<T> = {
    readonly [P in keyof T]?: T[P];
  };

  const myVideo: Optional<Video> = {
    title: "Hello",
    author: "dd",
  };

  const myAnimal: Optional<AnimalType> = {
    name: "dog",
  };

  const animal: ReadOnly<Video> = {
    title: "hi",
    author: "Hello",
  };

  type Nullable<T> = { [P in keyof T]: T[P] | null };

  const obj2: Nullable<Video> = {
    title: null,
    author: "Hello",
  };

  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };

  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  };

  // https://dev.to/mattzgg_94/typescript-use-mapped-type-to-implement-a-proxy-4im2
}
