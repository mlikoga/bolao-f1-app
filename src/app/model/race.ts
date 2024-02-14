export class Race {
  name: string;
  number: number;
  season: number;
  qualifyingStartsAt: Date;

  get id(): string {
    return `${this.season}.${this.number}`;
  }
  get betEndsAt(): Date {
    return this.qualifyingStartsAt;
  }

  constructor(season: number, number: number, name: string, qualifyingStartsAt: Date) {
    this.season = season;
    this.number = number;
    this.name = name;
    this.qualifyingStartsAt = qualifyingStartsAt;
  }

  static empty(): Race {
    return new Race(2024, -1, "Loading...", new Date());
  }
}
