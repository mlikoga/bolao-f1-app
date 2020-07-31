export class Driver {
  id: string;
  name: string;
  number: number;
  team: string;

  static all() : Array<Driver> {
    return [
      { id: "HAM", name: "Lewis Hamilton",     number: 44, team: "Mercedes" },
      { id: "BOT", name: "Valtteri Bottas",    number: 77, team: "Mercedes" },
      { id: "VET", name: "Sebastian Vettel",   number:  5, team: "Ferrari" },
      { id: "LEC", name: "Charles Leclerc",    number: 16, team: "Ferrari" },
      { id: "VER", name: "Max Verstappen",     number: 33, team: "Red Bull Racing" },
      { id: "ALB", name: "Alexander Albon",    number: 23, team: "Red Bull Racing" },
      { id: "SAI", name: "Carlos Sainz",       number: 55, team: "McLaren" },
      { id: "NOR", name: "Lando Norris",       number:  4, team: "McLaren" },
      { id: "RIC", name: "Daniel Ricciardo",   number:  3, team: "Renault" },
      { id: "OCO", name: "Esteban Ocon",       number: 31, team: "Renault" },
      { id: "GAS", name: "Pierre Gasly",       number: 10, team: "AlphaTauri" },
      { id: "KVY", name: "Daniil Kvyat",       number: 26, team: "AlphaTauri" },
      { id: "STR", name: "Lance Stroll",       number: 18, team: "Racing Point" },
      { id: "HUL", name: "Nico Hulkenberg",    number: 27, team: "Racing Point" },
      { id: "RAI", name: "Kimi Raikkonen",     number:  7, team: "Alfa Romeo Racing" },
      { id: "GIO", name: "Antonio Giovinazzi", number: 99, team: "Alfa Romeo Racing" },
      { id: "GRO", name: "Romain Grosjean",    number:  8, team: "Haas F1 Team" },
      { id: "MAG", name: "Kevin Magnussen",    number: 20, team: "Haas F1 Team" },
      { id: "RUS", name: "George Russell",     number: 63, team: "Williams" },
      { id: "LAT", name: "Nicholas Latifi",    number:  6, team: "Williams" },
      { id: "PER", name: "Sergio Perez",       number: 11, team: "Racing Point" },
    ]
  }

  static fromId(id: string): Driver {
    return Driver.all().find(driver => driver.id === id);
  }
}
