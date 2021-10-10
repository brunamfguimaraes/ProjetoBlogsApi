const mockedToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRl
c3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30
.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8`;
class UserService {
  constructor(model, statusCode, errorMessage) {
    this.model = model;
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
    this.createUser = this.createUser.bind(this);
  }

  async createUser(user) {
    const res = await this.model.create(user);
    console.log(res);
    return mockedToken;
  }
}

module.exports = UserService;