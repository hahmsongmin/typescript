{
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
      data: 'byte-data..',
    };
  }

  type MetdataPick = Pick<Video, 'id' | 'title'>;

  function getVideoMetadata(id: string): MetdataPick {
    return {
      id: id,
      title: 'title',
    };
  }
}
