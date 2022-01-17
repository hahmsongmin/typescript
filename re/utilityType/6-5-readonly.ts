{
  type ToDo = {
    title: string;
    description: string;
  };

  // 이미 다 만들어져있어서 사용하면 됨
  // Readonly, command + click <사용가능한 모든 utility>
  function display(todo: Readonly<ToDo>) {}

  type Props = 'ivanSelah';

  const hello: Uppercase<Props> = 'IVANSELAH';
}
