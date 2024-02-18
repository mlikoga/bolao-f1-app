import { Bet } from 'app/model/bet';
import { PointCalculator } from './point-calculator';
import { InitialBet } from 'app/model/initial-bet';

describe("Australia GP 2019", function() {
  let result = {
    pole: "HAM",
    qualifying2: "BOT",
    qualifying3: "VER",
    fastestLap: "BOT",
    positions: ["BOT", "HAM", "VER", "VET", "LEC", "MAG", "HUL", "RAI", "STR", "KVY", "GAS"],
    race: "1",
  };

  it("bet completely wrong - 0 pts", function() {
    let bet = Bet.from({
      pole: "GAS",
      qualifying2: "NOR",
      qualifying3: "PER",
      fastestLap: "GAS",
      positions: ["GAS", "NOR", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: "1",
    } as Bet);
    expect(PointCalculator.calculatePoints(result, bet).total).toBe(0);
  });

  it("pole and fastest lap - 11 pts", function() {
    let bet = Bet.from({
      pole: "HAM", // 10
      qualifying2: "NOR",
      qualifying3: "LEC",
      fastestLap: "BOT", // 1
      positions: ["GAS", "NOR", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: "1",
    } as Bet);
    expect(PointCalculator.calculatePoints(result, bet).total).toBe(11);
  });

  it("2nd and 3rd of qualifying - 10 pts", function() {
    let bet = Bet.from({
      pole: "NOR",
      qualifying2: "BOT", // 7
      qualifying3: "VER", // 3
      fastestLap: "GAS",
      positions: ["GAS", "NOR", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: "1",
    } as Bet);
    expect(PointCalculator.calculatePoints(result, bet).total).toBe(10);
  });

  it("Just winner - 25 pts", function() {
    let bet = Bet.from({
      pole: "GAS",
      qualifying2: "NOR",
      qualifying3: "PER",
      fastestLap: "GAS",
      positions: ["BOT", "NOR", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: "1",
    } as Bet);
    expect(PointCalculator.calculatePoints(result, bet).total).toBe(25);
  });

  it("60% winner - 15 pts", function() {
    let bet = Bet.from({
      pole: "GAS",
      qualifying2: "NOR",
      qualifying3: "PER",
      fastestLap: "GAS",
      positions: ["GAS", "BOT", "PER", "ALB", "GIO", "RUS", "KUB", "GRO", "RIC", "SAI"],
      user: "user",
      race: "1",
    } as Bet);
    expect(PointCalculator.calculatePoints(result, bet).total).toBe(15);
  });

  it("Yuri bet", function() {
    let bet = Bet.from({
      pole: "LEC",
      qualifying2: "BOT",
      qualifying3: "PER", // 7,
      fastestLap: "HAM",
      //points:  [    0,  10.8,   1.5,   1.2,     1,     0,     6,     0,     0,     0],
      positions: ["VET", "LEC", "HAM", "RAI", "BOT", "VER", "HUL", "GAS", "RIC", "MAG"],
      user: "Yuri",
      race: "1",
    } as Bet);
    expect(PointCalculator.calculatePoints(result, bet).total).toBeCloseTo(27.5);
  });
});

describe("Exemplo do regulamento", function() {
  let result = {
    pole: "VET",
    qualifying2: "RIC",
    qualifying3: "BOT",
    fastestLap: "VET",
    positions: ["RIC", "BOT", "RAI", "HAM", "VER", "HUL", "ALO", "VET", "SAI", "MAG"],
    user: "resultado",
    race: "1",
  };

  it("Apostador 1", function() {
    let bet = Bet.from({
      pole: "HAM",
      qualifying2: "NOR",
      qualifying3: "PER",
      fastestLap: "RIC",
      positions: ["HAM", "BOT", "RAI", "VET", "HUL", "MAG", "VAN", "VER", "ALO", "SAI"],
      user: "user",
      race: "1",
    } as Bet);
    expect(PointCalculator.calculatePoints(result, bet).total).toBeCloseTo(43);
  });

  it("Apostador 2", function() {
    let bet = Bet.from({
      pole: "VET", // 10
      qualifying2: "NOR",
      qualifying3: "PER",
      fastestLap: "VET", // 1
      // points: [    0,   5.4,    15,   1.2,    10,     0,   1.8,     0,    1.2,   0]
      positions: ["HAM", "VET", "RAI", "BOT", "VER", "RIC", "GAS", "SAI", "ALO", "HUL"],
      user: "user",
      race: "1",
    } as Bet);
    expect(PointCalculator.calculatePoints(result, bet).total).toBeCloseTo(45.6);
  });
});

describe("Calculate season points", function() {
  let result = {
    driversPositions: ["LEC", "BOT", "RAI", "HAM", "VER"],
    teamsPositions: ["Mercedes", "Ferrari", "Red Bull Racing", "Alpine", "Williams"],
    season: 2024,
  };

  it("Person with max points: 300", function() {
    let bet = {
      driversPositions: ["LEC", "BOT", "RAI", "HAM", "VER"],
      teamsPositions: ["Mercedes", "Ferrari", "Red Bull Racing", "Alpine", "Williams"],
      season: 2024,
      user: "user",
      createdAt: new Date(),
    } as InitialBet;
    expect(PointCalculator.calculateSeasonPoints(result, bet).total).toBe(300);
  });

  it("Person with driver winner and 3rd team", function() {
    let bet = {
      driversPositions: ["LEC", "HAM", "VER", "RUS", "ALO"],
      teamsPositions: ["Williams", "Mercedes", "Red Bull Racing", "Ferrari", "Alpine"],
      season: 2024,
      user: "user",
      createdAt: new Date(),
    }  as InitialBet;
    expect(PointCalculator.calculateSeasonPoints(result, bet).total).toBe(80);
  });
});
