export class Driver {
  id: string;
  name: string;
  number: number;
  team: string;

  static all() : Array<Driver> {
    return [
      { id: "VER", name: "Max Verstappen",     number:  1, team: "Red Bull Racing" },
      { id: "PER", name: "Sergio Perez",       number: 11, team: "Red Bull Racing" },
      { id: "LEC", name: "Charles Leclerc",    number: 16, team: "Ferrari" },
      { id: "SAI", name: "Carlos Sainz",       number: 55, team: "Ferrari" },
      { id: "HAM", name: "Lewis Hamilton",     number: 44, team: "Mercedes" },
      { id: "RUS", name: "George Russell",     number: 63, team: "Mercedes" },
      { id: "OCO", name: "Esteban Ocon",       number: 31, team: "Alpine" },
      { id: "GAS", name: "Pierre Gasly",       number: 10, team: "Alpine" },
      { id: "NOR", name: "Lando Norris",       number:  4, team: "McLaren" },
      { id: "PIA", name: "Oscar Piastri",      number:  3, team: "McLaren" },
      { id: "BOT", name: "Valtteri Bottas",    number: 77, team: "Alfa Romeo Racing" },
      { id: "ZHO", name: "Zhou Guanyu",        number: 24, team: "Alfa Romeo Racing" },
      { id: "STR", name: "Lance Stroll",       number: 18, team: "Aston Martin" },
      { id: "ALO", name: "Fernando Alonso",    number: 14, team: "Aston Martin" },
      { id: "MAG", name: "Kevin Magnussen",    number: 20, team: "Haas F1 Team" },
      { id: "HUL", name: "Niko Hulkenberg",    number: 27, team: "Haas F1 Team" },
      { id: "DEV", name: "Nyck De Vries",      number: 45, team: "AlphaTauri" },
      { id: "TSU", name: "Yuki Tsunoda",       number: 22, team: "AlphaTauri" },
      { id: "ALB", name: "Alexander Albon",    number: 23, team: "Williams" },
      { id: "SAR", name: "Logan Sargeant",     number:  6, team: "Williams" },
      { id: "SUB", name: "Piloto substituto",  number: 99, team: "-" },
    ]
  }

  static fromId(id: string): Driver {
    return Driver.all().find(driver => driver.id === id);
  }
}
