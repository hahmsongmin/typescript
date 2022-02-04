{
  const obj = {
    name: 'ivan',
  };

  obj.name; // ivan
  obj['name'];

  type Animal = {
    name: string;
    age: number;
    gender: 'male' | 'female';
  };

  type Name = Animal['name']; // string;
  const text: Name = 'Hello';

  type Gender = Animal['gender'];

  type Keys = keyof Animal;

  const key: Keys = 'age';

  type Person = {
    name: string;
    gender: Animal['gender'];
  };
}
