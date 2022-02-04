{
  type Todo = {
    title: string;
    desc: string;
    label: string;
    priority: 'high' | 'low';
  };

  function updateTodo(todo: Todo, fields: Partial<Todo>): Todo {
    return { ...todo, ...fields };
  }

  const todo: Todo = {
    title: 'good',
    desc: 'jmt',
    label: 'abc',
    priority: 'high',
  };

  const results = updateTodo(todo, { desc: 'halo' });
  console.log(results);
}
