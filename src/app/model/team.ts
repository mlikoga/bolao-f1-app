export class Team {
  name: string;

  static all() : Array<Team> {
    return [
      { name: "Mercedes" },
      { name: "Ferrari" },
      { name: "Red Bull Racing" },
      { name: "Haas F1 Team" },
      { name: "McLaren" },
      { name: "Alfa Romeo Racing" },
      { name: "Renault" },
      { name: "AlphaTauri" },
      { name: "Williams" },
      { name: "Racing Point" },
    ];
  }
}
