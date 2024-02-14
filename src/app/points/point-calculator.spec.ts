import { PointCalculator } from './point-calculator';

describe("Australia GP 2019", function() {
  let result = {
    pole: "HAM",
    fastestLap: "BOT",
    positions: ["BOT", "HAM", "VER", "VET", "LEC", "MAG", "HUL", "RAI", "STR", "KVY", "GAS"],
    race: "1",
  };

  it("bet completely wrong - 0 pts", function() {
    let bet = {
      pole: "GAS",
      fastestLap: "GAS",
      positions: ["GAS", "NOR", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: "1",
    };
    expect(PointCalculator.calculatePoints(result, bet).total).toBe(0);
  });

  it("pole and fastest lap - 20 pts", function() {
    let bet = {
      pole: "HAM",
      fastestLap: "BOT",
      positions: ["GAS", "NOR", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: "1",
    };
    expect(PointCalculator.calculatePoints(result, bet).total).toBe(20);
  });

  it("Just winner - 25 pts + 2", function() {
    let bet = {
      pole: "GAS",
      fastestLap: "GAS",
      positions: ["BOT", "NOR", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: "1",
    };
    expect(PointCalculator.calculatePoints(result, bet).total).toBe(27);
  });

  it("60% winner - 15 pts + 2", function() {
    let bet = {
      pole: "GAS",
      fastestLap: "GAS",
      positions: ["GAS", "BOT", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: "1",
    };
    expect(PointCalculator.calculatePoints(result, bet).total).toBe(17);
  });

  it("Yuri bet", function() {
    let bet = {
      pole: "LEC",
      fastestLap: "HAM",
      positions: ["VET", "LEC", "HAM", "RAI", "BOT", "VER", "HUL", "GAS", "RIC", "MAG"],
      user: "Yuri",
      race: "1",
    };
    expect(PointCalculator.calculatePoints(result, bet).total).toBeCloseTo(36.5);
  });
});

describe("Exemplo do regulamento", function() {
  let result = {
    pole: "VET",
    fastestLap: "VET",
    positions: ["RIC", "BOT", "RAI", "HAM", "VER", "HUL", "ALO", "VET", "SAI", "MAG"],
    user: "resultado",
    race: "1",
  };

  it("Apostador 1", function() {
    let bet = {
      pole: "HAM",
      fastestLap: "RIC",
      positions: ["HAM", "BOT", "RAI", "VET", "HUL", "MAG", "VAN", "VER", "ALO", "SAI"],
      user: "user",
      race: "1",
    };
    expect(PointCalculator.calculatePoints(result, bet).total).toBeCloseTo(61);
  });

  it("Apostador 2", function() {
    let bet = {
      pole: "VET",
      fastestLap: "VET",
      positions: ["HAM", "VET", "RAI", "BOT", "VER", "RIC", "GAS", "SAI", "ALO", "HUL"],
      user: "user",
      race: "1",
    };
    expect(PointCalculator.calculatePoints(result, bet).total).toBeCloseTo(72.6);
  });
});

describe("Calculate season points", function() {
  let result = {
    driversPositions: ["LEC", "BOT", "RAI", "HAM", "VER"],
    teamsPositions: ["Mercedes", "Ferrari", "Red Bull Racing", "Alpine", "Williams"],
    season: 2024,
  };

  it("Person with Max points", function() {
    let bet = {
      driversPositions: ["LEC", "BOT", "RAI", "HAM", "VER"],
      teamsPositions: ["Mercedes", "Ferrari", "Red Bull Racing", "Alpine", "Williams"],
      season: 2024,
      user: "user",
      createdAt: new Date(),
    };
    expect(PointCalculator.calculateSeasonPoints(result, bet).total).toBe(300);
  });

  it("Person with driver winner and 3rd team", function() {
    let bet = {
      driversPositions: ["LEC", "HAM", "VER", "RUS", "ALO"],
      teamsPositions: ["Williams", "Mercedes", "Red Bull Racing", "Ferrari", "Alpine"],
      season: 2024,
      user: "user",
      createdAt: new Date(),
    };
    expect(PointCalculator.calculateSeasonPoints(result, bet).total).toBe(80);
  });
});
