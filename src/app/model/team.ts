export class Team {
  name: string;

  static all() : Array<Team> {
    return [
      { name: "Mercedes" },
      { name: "Red Bull Racing" },
      { name: "McLaren" },
      { name: "Aston Martin" },
      { name: "Alpine" },
      { name: "Ferrari" },
      { name: "AlphaTauri" },
      { name: "Alfa Romeo Racing" },
      { name: "Haas F1 Team" },
      { name: "Williams" },
    ];
  }
}
