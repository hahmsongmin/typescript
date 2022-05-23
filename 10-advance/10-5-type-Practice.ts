{
  // 앞에서 index, map, condition 의 경우
  // 이미 유틸리티 타입으로 만들어져있음 (TypeScript에 구현되어 있음)

  //⭐️ Readonly

  type Todo = {
    title: string;
    description: string;
  };

  //   function display(todo: Readonly<Todo>) {
  //     todo.title = "Hello";
  //   }

  //⭐️ Partial
  // 기존의 타입중에서 부분적인 것만 수정 및 사용하고 싶을 때 이용
  // Optional ( ? Oprtional 이므로 부분 수정 가능)

  type Today = {
    title: string;
    description: string;
    label: string;
    priority: 'high' | 'low';
  };

  function updateTodo(todo: Today, todayUpdate: Partial<Today>): Today {
    return {
      ...todo,
      ...todayUpdate,
    };
  }

  const todo: Today = {
    title: 'Learn TypeScript',
    description: 'study hard',
    label: 'study',
    priority: 'high',
  };

  const updated = updateTodo(todo, { priority: 'low' });

  // ⭐️ Pick
  // 기존의 타입에서 원하는 속성과 value들만 뽑아서 만들 수 있음

  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'https://..',
      data: 'byte=data',
    };
  }

  type VideoMetadata = Pick<Video, 'id' | 'title'>;

  function getVideoMetadata(id: string): VideoMetadata {
    return {
      id,
      title: 'Hello',
    };
  }

  //⭐️ Omit
  // 기존의 타입에서 원하는 속성과 value들만 제외한 나머지 들만 명시
  // Video Type에 url, data 가 있다면 제외하기 때문에 Video Type에 명시되어 있지않아도 기입은 됨

  type VideoMetadata1 = Omit<Video, 'url' | 'data'>;

  function getVideoMetadata1(id: string): VideoMetadata1 {
    return {
      id,
      title: 'Hello',
    };
  }

  //⭐️ Record
  // 하나와 어떤하나를 연결하고 싶을 때, 하나를 key로쓰고 다른 하나를 다른 타입으로 묶고 싶을 때
  type PageInfo = {
    title: string;
  };
  type Page = 'home' | 'about' | 'contact';

  const nav: Record<Page, PageInfo> = {
    home: { title: 'Hello' },
    about: { title: 'cho' },
    contact: { title: 'haha' },
  };
}
