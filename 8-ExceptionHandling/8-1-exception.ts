class NetworkClient {
  tryConnect(): void {}
}

class UserService {
  constructor(private client: NetworkClient) {}

  login() {
    this.client.tryConnect();
    // login....
  }
}

const client = new NetworkClient();
const service = new UserService(client);
service.login();
