{
  {
    // Intersection Types: & 이거랑 저거

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
      name: 'Ivan',
      score: 10,
      empolyeeId: 123,
      work: () => {},
    });
  }
  {
    type Student = {
      name: string;
      score: number;
    };

    type Worker = {
      empolyeeId: number;
      work: () => void;
    };

    ourInternWork({ name: 'Hello', score: 23, empolyeeId: 33, work: () => {} });

    function ourInternWork(person: Student & Worker) {
      console.log(person.name, person.score, person.empolyeeId, person.work);
    }
  }
}
