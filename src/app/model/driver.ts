export class Driver {
  id: string;
  name: string;
  team: string;

  static all() : Array<Driver> {
    return [
      { id: "VER", name: "Max Verstappen",    team: "Red Bull Racing" },
      { id: "HAD", name: "Isack Hadjar",      team: "Red Bull Racing" },
      { id: "NOR", name: "Lando Norris",      team: "McLaren" },
      { id: "PIA", name: "Oscar Piastri",     team: "McLaren" },
      { id: "LEC", name: "Charles Leclerc",   team: "Ferrari" },
      { id: "HAM", name: "Lewis Hamilton",    team: "Ferrari" },
      { id: "RUS", name: "George Russell",    team: "Mercedes" },
      { id: "ANT", name: "Kimi Antonelli",    team: "Mercedes" },
      { id: "ALO", name: "Fernando Alonso",   team: "Aston Martin" },
      { id: "STR", name: "Lance Stroll",      team: "Aston Martin" },
      { id: "ALB", name: "Alexander Albon",   team: "Williams" },
      { id: "SAI", name: "Carlos Sainz",      team: "Williams" },
      { id: "HUL", name: "Nico Hulkenberg",   team: "Audi" },
      { id: "BOR", name: "Gabriel Bortoleto", team: "Audi" },
      { id: "GAS", name: "Pierre Gasly",      team: "Alpine" },
      { id: "COL", name: "Franco Colapinto",  team: "Alpine" },
      { id: "LAW", name: "Liam Lawson",       team: "Racing Bulls" },
      { id: "LIN", name: "Arvid Lindblad",    team: "Racing Bulls" },
      { id: "OCO", name: "Esteban Ocon",      team: "Haas" },
      { id: "BEA", name: "Oliver Bearman",    team: "Haas" },
      { id: "BOT", name: "Valtteri Bottas",   team: "Cadillac" },
      { id: "PER", name: "Sergio Perez",      team: "Cadillac" },
      // Reservas
      { id: "TSU", name: "Yuki Tsunoda",      team: "Red Bull Racing" },
      { id: "DOO", name: "Jack Doohan",       team: "Alpine" },
      { id: "DRU", name: "Felipe Drugovich",  team: "Aston Martin" },

      { id: "SUB", name: "Piloto substituto", team: "-" },
    ]
  }

  static fromId(id: string): Driver {
    return Driver.all().find(driver => driver.id === id);
  }
}
