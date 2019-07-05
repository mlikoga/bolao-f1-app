export class User {
  email: string;
  username: string;
  points?: number;
  diff?: number;

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }
}