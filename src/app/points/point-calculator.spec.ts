import { PointCalculator } from './point-calculator';

describe("Australia GP 2019", function() {
  let result = {
    pole: "HAM",
    fastestLap: "BOT",
    positions: ["BOT", "HAM", "VER", "VET", "LEC", "MAG", "HUL", "RAI", "STR", "KVY"],
    user: "m",
    race: 1,
  };

  it("bet completely wrong - 0 pts", function() {
    let bet = {
      pole: "GAS",
      fastestLap: "GAS",
      positions: ["GAS", "NOR", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: 1,
    };
    expect(PointCalculator.calculatePoints(result, bet)).toBe(0);
  });

  it("pole and fastest lap - 20 pts", function() {
    let bet = {
      pole: "HAM",
      fastestLap: "BOT",
      positions: ["GAS", "NOR", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: 1,
    };
    expect(PointCalculator.calculatePoints(result, bet)).toBe(20);
  });

  it("Just winner - 25 pts + 2", function() {
    let bet = {
      pole: "GAS",
      fastestLap: "GAS",
      positions: ["BOT", "NOR", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: 1,
    };
    expect(PointCalculator.calculatePoints(result, bet)).toBe(27);
  });

  it("60% winner - 15 pts + 2", function() {
    let bet = {
      pole: "GAS",
      fastestLap: "GAS",
      positions: ["GAS", "BOT", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: 1,
    };
    expect(PointCalculator.calculatePoints(result, bet)).toBe(17);
  });
});

describe("Exemplo do regulamento", function() {
  let result = {
    pole: "VET",
    fastestLap: "VET",
    positions: ["RIC", "BOT", "RAI", "HAM", "VER", "HUL", "ALO", "VET", "SAI", "MAG"],
    user: "resultado",
    race: 1,
  };

  it("Apostador 1", function() {
    let bet = {
      pole: "HAM",
      fastestLap: "RIC",
      positions: ["HAM", "BOT", "RAI", "VET", "HUL", "MAG", "VAN", "VER", "ALO", "SAI"],
      user: "user",
      race: 1,
    };
    expect(PointCalculator.calculatePoints(result, bet)).toBeCloseTo(61);
  });

  it("Apostador 2", function() {
    let bet = {
      pole: "VET",
      fastestLap: "VET",
      positions: ["HAM", "VET", "RAI", "BOT", "VER", "RIC", "GAS", "SAI", "ALO", "HUL"],
      user: "user",
      race: 1,
    };
    expect(PointCalculator.calculatePoints(result, bet)).toBeCloseTo(72.6);
  });
});

