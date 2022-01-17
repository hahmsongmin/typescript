{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  // 기존에 있는 타입에서 내가 원하는 것만 빼버릴 수 있음

  function getVideo(id: string): Video {
    return {
      id,
      title: 'video',
      url: 'https://...',
      data: 'byte-data...',
    };
  }

  // T 에 있는 key 들중에 k를 제외한
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

  type VideoMetadata = Omit<Video, 'url' | 'data'>;

  function getVideoMetadata(id: string): VideoMetadata {
    return {
      id: id,
      title: 'title',
    };
  }
}
