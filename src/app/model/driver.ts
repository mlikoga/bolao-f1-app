export class Driver {
  id: string;
  name: string;
  team: string;

  static all() : Array<Driver> {
    return [
      { id: "VER", name: "Max Verstappen",    team: "Red Bull Racing" },
      { id: "LAW", name: "Liam Lawson",       team: "Red Bull Racing" },
      { id: "NOR", name: "Lando Norris",      team: "McLaren" },
      { id: "PIA", name: "Oscar Piastri",     team: "McLaren" },
      { id: "LEC", name: "Charles Leclerc",   team: "Ferrari" },
      { id: "HAM", name: "Lewis Hamilton",    team: "Ferrari" },
      { id: "RUS", name: "George Russell",    team: "Mercedes" },
      { id: "ANT", name: "Andrea Antonelli",  team: "Mercedes" },
      { id: "STR", name: "Lance Stroll",      team: "Aston Martin" },
      { id: "ALO", name: "Fernando Alonso",   team: "Aston Martin" },
      { id: "GAS", name: "Pierre Gasly",      team: "Alpine" },
      { id: "DOO", name: "Jack Doohan",       team: "Alpine" },
      { id: "RIC", name: "Isack Hadjar",      team: "RB" },
      { id: "TSU", name: "Yuki Tsunoda",      team: "RB" },
      { id: "OCO", name: "Esteban Ocon",      team: "Haas" },
      { id: "BEA", name: "Oliver Bearman",    team: "Haas" },
      { id: "ALB", name: "Alexander Albon",   team: "Williams" },
      { id: "SAI", name: "Carlos Sainz",      team: "Williams" },
      { id: "HUL", name: "Niko Hulkenberg",   team: "Kick Sauber" },
      { id: "BOR", name: "Gabriel Bortoleto", team: "Kick Sauber" },
      // Reservas
      { id: "BOT", name: "Valtteri Bottas",   team: "Mercedes" },
      { id: "DRU", name: "Felipe Drugovich",  team: "Aston Martin" },
      { id: "COL", name: "Franco Colapinto",  team: "Alpine" },
      
      { id: "SUB", name: "Piloto substituto", team: "-" },
    ]
  }

  static fromId(id: string): Driver {
    return Driver.all().find(driver => driver.id === id);
  }
}
