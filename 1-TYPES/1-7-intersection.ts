{
  // Intersection Types: &

  type Student = {
    name: string;
    score: number;
  };

  type Worker = {
    empolyeeId: number;
    work: () => void;
  };

  function internWork(person: Student & Worker) {
    console.log(person.name, person.empolyeeId, person.work());
  }

  internWork({
    name: "Ivan",
    score: 10,
    empolyeeId: 123,
    work: () => {},
  });
}
