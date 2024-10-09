export class Driver {
  id: string;
  name: string;
  number: number;
  team: string;

  static all() : Array<Driver> {
    return [
      { id: "VER", name: "Max Verstappen",     number:  1, team: "Red Bull Racing" },
      { id: "PER", name: "Sergio Perez",       number: 11, team: "Red Bull Racing" },
      { id: "HAM", name: "Lewis Hamilton",     number: 44, team: "Mercedes" },
      { id: "RUS", name: "George Russell",     number: 63, team: "Mercedes" },
      { id: "LEC", name: "Charles Leclerc",    number: 16, team: "Ferrari" },
      { id: "SAI", name: "Carlos Sainz",       number: 55, team: "Ferrari" },
      { id: "NOR", name: "Lando Norris",       number:  4, team: "McLaren" },
      { id: "PIA", name: "Oscar Piastri",      number: 81, team: "McLaren" },
      { id: "STR", name: "Lance Stroll",       number: 18, team: "Aston Martin" },
      { id: "ALO", name: "Fernando Alonso",    number: 14, team: "Aston Martin" },
      { id: "OCO", name: "Esteban Ocon",       number: 31, team: "Alpine" },
      { id: "GAS", name: "Pierre Gasly",       number: 10, team: "Alpine" },
      { id: "ALB", name: "Alexander Albon",    number: 23, team: "Williams" },
      { id: "SAR", name: "Logan Sargeant",     number:  2, team: "Williams" },
      { id: "COL", name: "Franco Colapinto",   number: 43, team: "Williams" },
      { id: "RIC", name: "Daniel Ricciardo",   number:  3, team: "RB" },
      { id: "TSU", name: "Yuki Tsunoda",       number: 22, team: "RB" },
      { id: "LAW", name: "Liam Lawson",        number: 30, team: "RB" },
      { id: "BOT", name: "Valtteri Bottas",    number: 77, team: "Kick Sauber" },
      { id: "ZHO", name: "Zhou Guanyu",        number: 24, team: "Kick Sauber" },
      { id: "MAG", name: "Kevin Magnussen",    number: 20, team: "Haas F1 Team" },
      { id: "HUL", name: "Niko Hulkenberg",    number: 27, team: "Haas F1 Team" },
      { id: "BEA", name: "Oliver Bearman",     number: 50, team: "Haas F1 Team" },
      
      
      { id: "SUB", name: "Piloto substituto",  number: 99, team: "-" },
    ]
  }

  static fromId(id: string): Driver {
    return Driver.all().find(driver => driver.id === id);
  }
}
