{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  // 기존에 있는 타입에서 내가 원하는 것만 뽑아서 제한적으로 사용

  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'https://...',
      data: 'byte-data...',
    };
  }

  // K를 T 에 key 타입으로 제한
  //   type Pick<T, K extends keyof T> = {
  //     [P in K]: T[P];
  //   };

  type VideoMetadata = Pick<Video, 'title' | 'id'>;

  function getVideoMetadata(id: string): VideoMetadata {
    return {
      id: id,
      title: 'title',
    };
  }
}
