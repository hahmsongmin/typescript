{
  type ToDo = {
    title: string;
    description: string;
    label: string;
    priority: 'high' | 'low';
  };

  // 부분적인 업데이트 가능
  function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
    return { ...todo, ...fieldsToUpdate };
  }
  const todo: ToDo = {
    title: 'learn',
    description: 'hard',
    label: 'gogo',
    priority: 'high',
  };

  type SuperPartial<T> = {
    [P in keyof T]?: T[P];
  };

  const hello: SuperPartial<ToDo> = {
    priority: 'high',
  };

  const updated = updateTodo(todo, { description: 'cold', priority: 'low' });
  console.log(updated);
}
