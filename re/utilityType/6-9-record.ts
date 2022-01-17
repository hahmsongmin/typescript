type PageInfo = {
  title: string;
};

type Page = 'home' | 'about' | 'contact';

// Page 를 key로, PageInfo를 value로
const temp: Record<Page, PageInfo> = {
  home: { title: 'Hello' },
  about: { title: 'About' },
  contact: { title: 'Contact' },
};

// 합쳐서 사용
