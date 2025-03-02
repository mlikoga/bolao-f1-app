export class Team {
  name: string;

  static all() : Array<Team> {
    return [
      { name: "Red Bull Racing" },
      { name: "Mercedes" },
      { name: "Ferrari" },
      { name: "McLaren" },
      { name: "Aston Martin" },
      { name: "Alpine" },
      { name: "Williams" },
      { name: "RB" },
      { name: "Kick Sauber" },
      { name: "Haas" },
    ];
  }
}
