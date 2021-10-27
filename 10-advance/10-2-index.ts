{
  const obj = {
    name: "selah",
  };

  obj.name;
  obj["name"];

  type Animal = {
    name: string;
    age: number;
    gender: "male" | "female";
  };

  type Name = Animal["name"]; // Name Type은 string
  const text: Name = "Hello";

  type Gender = Animal["gender"]; // "male" | "female"

  type Keys = keyof Animal; // 'name' | 'age' | 'gender'
  const key: Keys = "age";

  type Person = {
    name: string;
    gender: Animal["gender"];
  };

  const person: Person = {
    name: "selah",
    gender: "male",
  };
}
