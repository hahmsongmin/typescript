// 어느 한개에 수정이 이루어지면 다른 곳도 해줘야 한다.
type Video = {
  title: string;
  author: string;
  descrition: string;
};

{
  type VideoOptional = {
    title?: string;
    author?: string;
    descrition?: string;
  };

  type VideoReadOnly = {
    readonly title: string;
    readonly author: string;
    readonly descrition: string;
  };
}

// 그래서 map 사용
type Optional<T> = {
  // T가 가지고 있는 key들중에
  [P in keyof T]?: T[P]; // for...in (모든 키들을 돌면서)
};

type VideoOptional = Optional<Video>; // Optional에 전달된 Video

type Person = {
  name: string;
  age: number;
  descrition: string;
};

type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

type PersionReadOnly = ReadOnly<Person>;

const student: PersionReadOnly = {
  name: 'Hello',
  age: 33,
  descrition: 'ddd',
};

{
  type Video = {
    title: string;
    author: string;
    descrition: string;
  };

  type Nullable<T> = {
    [P in keyof T]: T[P] | null; // or null
  };

  const obj2: Nullable<Video> = {
    title: null,
    author: null,
    descrition: null,
  };

  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };

  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  };

  type Per = Proxify<Video>;
}
