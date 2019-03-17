export class Driver {
  id: string;
  name: string;
  number: number;

  static all() : Array<Driver> {
    return [
      {id: "HAM", name: "Lewis Hamilton", number: 44},
      {id: "BOT", name: "Valtteri Bottas", number: 77},
      {id: "VET", name: "Sebastian Vettel", number: 5},
      {id: "LEC", name: "Charles Leclerc", number: 4},
      {id: "GAS", name: "Pierre Gasly", number: 10},
      {id: "VER", name: "Max Verstappen", number: 33},
      {id: "RIC", name: "Daniel Ricciardo", number: 3},
      {id: "HUL", name: "Nico Hulkenberg", number: 27},
      {id: "GRO", name: "Romain Grosjean", number: 8},
      {id: "MAG", name: "Kevin Magnussen", number: 20},
      {id: "NOR", name: "Lando Norris", number: 4},
      {id: "SAI", name: "Carlos Sainz", number: 55},
      {id: "PER", name: "Sergio Perez", number: 11},
      {id: "STR", name: "Lance Stroll", number: 18},
      {id: "RAI", name: "Kimi Raikkonen", number: 7},
      {id: "GIO", name: "Antonio Giovinazzi", number: 99},
      {id: "ALB", name: "Alexander Albon", number: 23},
      {id: "KYV", name: "Daniil Kvyat", number: 26},
      {id: "RUS", name: "George Russell", number: 63},
      {id: "KUB", name: "Robert Kubica", number: 88},
    ]
  }
}
