{
  type Video = {
    title: string;
    author: string;
    ratings: string;
  };

  type Optional<T> = {
    [P in keyof T]?: T[P]; // for....in
  };

  type VideoOptional = Optional<Video>;

  const videos: VideoOptional = {
    title: 'go',
    author: 'ivan',
    ratings: '8.5',
  };

  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
  };

  type Reader = ReadOnly<Video>;

  const hello: Reader = {
    title: 'hell',
    author: 'd',
    ratings: '',
  };

  type Nullable<T> = {
    [P in keyof T]: T[P] | null;
  };

  const obj2: Nullable<Video> = {
    title: null,
    author: null,
    ratings: '',
  };

  type Proxy<T> = {
    get(): T;
    set(value: T): void;
  };

  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>;
  };

  { name : { get : (): T, set(value: T): void }}

  function Proxify<T>(props: T): Proxify<T> {
    const result = {} as Proxify<T>;
    for (let key in props) {
      let rvalue = props[key];
      result[key] = {
        get: () => rvalue,
        set: (value) => {
          rvalue = value;
        },
      };
    }
    return result;
  }

  // rvalue = 'ivan' , 34
  /* result['name'] = {
    get: () => return ravlue,
    set: (value) => ravlue = value, 
  }
  */

  const Hello = Proxify({ name: 'ivan', age: 34 });
  Hello.age.set(77);
  console.log(Hello.age.get());
}
