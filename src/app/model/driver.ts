export class Driver {
  id: string;
  name: string;
  number: number;
  team: string;

  static all() : Array<Driver> {
    return [
      { id: "HAM", name: "Lewis Hamilton",     number: 44, team: "Mercedes" },
      { id: "RUS", name: "George Russell",     number: 63, team: "Mercedes" },
      { id: "VER", name: "Max Verstappen",     number:  1, team: "Red Bull Racing" },
      { id: "PER", name: "Sergio Perez",       number: 11, team: "Red Bull Racing" },
      { id: "LEC", name: "Charles Leclerc",    number: 16, team: "Ferrari" },
      { id: "SAI", name: "Carlos Sainz",       number: 55, team: "Ferrari" },
      { id: "NOR", name: "Lando Norris",       number:  4, team: "McLaren" },
      { id: "RIC", name: "Daniel Ricciardo",   number:  3, team: "McLaren" },
      { id: "OCO", name: "Esteban Ocon",       number: 31, team: "Alpine" },
      { id: "ALO", name: "Fernando Alonso",    number: 14, team: "Alpine" },
      { id: "GAS", name: "Pierre Gasly",       number: 10, team: "AlphaTauri" },
      { id: "TSU", name: "Yuki Tsunoda",       number: 22, team: "AlphaTauri" },
      { id: "STR", name: "Lance Stroll",       number: 18, team: "Aston Martin" },
      { id: "VET", name: "Sebastian Vettel",   number:  5, team: "Aston Martin" },
      { id: "ALB", name: "Alexander Albon",    number: 23, team: "Williams" },
      { id: "LAT", name: "Nicholas Latifi",    number:  6, team: "Williams" },
      { id: "BOT", name: "Valtteri Bottas",    number: 77, team: "Alfa Romeo Racing" },
      { id: "ZHO", name: "Zhou Guanyu",        number: 24, team: "Alfa Romeo Racing" },
      { id: "MSC", name: "Mick Schumacher",    number: 47, team: "Haas F1 Team" },
      { id: "MAG", name: "Kevin Magnussen",    number: 99, team: "Haas F1 Team" },
    ]
  }

  static fromId(id: string): Driver {
    return Driver.all().find(driver => driver.id === id);
  }
}
