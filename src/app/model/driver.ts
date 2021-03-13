export class Driver {
  id: string;
  name: string;
  number: number;
  team: string;

  static all() : Array<Driver> {
    return [
      { id: "HAM", name: "Lewis Hamilton",     number: 44, team: "Mercedes" },
      { id: "BOT", name: "Valtteri Bottas",    number: 77, team: "Mercedes" },
      { id: "VER", name: "Max Verstappen",     number: 33, team: "Red Bull Racing" },
      { id: "PER", name: "Sergio Perez",       number: 11, team: "Red Bull Racing" },
      { id: "NOR", name: "Lando Norris",       number:  4, team: "McLaren" },
      { id: "RIC", name: "Daniel Ricciardo",   number:  3, team: "McLaren" },
      { id: "STR", name: "Lance Stroll",       number: 18, team: "Aston Martin" },
      { id: "VET", name: "Sebastian Vettel",   number:  5, team: "Aston Martin" },
      { id: "OCO", name: "Esteban Ocon",       number: 31, team: "Alpine" },
      { id: "ALO", name: "Fernando Alonso",    number: 40, team: "Alpine" },
      { id: "LEC", name: "Charles Leclerc",    number: 16, team: "Ferrari" },
      { id: "SAI", name: "Carlos Sainz",       number: 55, team: "Ferrari" },
      { id: "GAS", name: "Pierre Gasly",       number: 10, team: "AlphaTauri" },
      { id: "TSU", name: "Yuki Tsunoda",       number: 26, team: "AlphaTauri" },
      { id: "RAI", name: "Kimi Raikkonen",     number:  7, team: "Alfa Romeo Racing" },
      { id: "GIO", name: "Antonio Giovinazzi", number: 99, team: "Alfa Romeo Racing" },
      { id: "SCH", name: "Mick Schumacher",    number:  8, team: "Haas F1 Team" },
      { id: "MAZ", name: "Nikita Mazepin",     number: 20, team: "Haas F1 Team" },
      { id: "RUS", name: "George Russell",     number: 63, team: "Williams" },
      { id: "LAT", name: "Nicholas Latifi",    number:  6, team: "Williams" },
    ]
  }

  static fromId(id: string): Driver {
    return Driver.all().find(driver => driver.id === id);
  }
}
