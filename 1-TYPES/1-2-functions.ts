{
  // JavaScript
  //   function jsAdd(num1, num2) {
  //     return num1 + num2;
  //   }

  // TypeScript
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }

  function jsFetchNum(id: string): Promise<number> {
    // code...
    // code...
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // Optional parameter ?
  function printName(firstName: string, lastName?: string) {
    console.log(firstName, lastName);
  }
  printName("Steve", "Jobs");
  printName("Hello");

  // Default parameter
  function printMessage(message: string = "default message") {
    console.log(message);
  }
  printMessage();

  // Rest parameter

  function addNubmer(...numbers: number[]): number {
    return numbers.reduce((pre, curr) => pre + curr);
  }

  console.log(addNubmer(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
}
