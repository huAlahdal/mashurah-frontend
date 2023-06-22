export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public roleId: number,
    public typeId: number,
    private token: string
  ) {}

  get _token() {
    return this.token;
  }
}
