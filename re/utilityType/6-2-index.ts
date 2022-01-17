{
  const obj = {
    name: 'ivan',
  };
  obj.name; //
  obj['name']; //

  type Animal = {
    name: string;
    age: number;
    gender: 'male' | 'female';
  };

  type Name = Animal['name']; // string
  const text: Name = 'Hello';

  type Gender = Animal['gender']; // 'male' | 'female'

  // ⭐️
  type Keys = keyof Animal; // 'name' | 'age' | 'gender'

  type Person = {
    name: string;
    gender: Animal['gender']; // 'male' | 'female'
  };
}
