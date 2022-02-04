{
  type ToDo = {
    title: string;
    desc: string;
  };

  type Partials = {
    id?: number;
    name?: string;
    todo: string;
  };

  function display(todo: Readonly<ToDo>) {}
  const propsMe: Partial<ToDo> = {};
  const arr: Required<Partials>[] = [];
  const obj = { id: 1, name: '', todo: 'go to home' };
  arr.push(obj);
  console.log(arr);
}
