import { app } from "./app";

class DefaultPort {
  value: string;

  constructor(value: string) {
    this.value = value;
  }

  verifyPort(): boolean | number | string {
    const port = parseInt(this.value, 10);

    if (isNaN(port)) {
      return this.value;
    } else if (port >= 0) {
      return port;
    }

    return false;
  }
}

const PORT = new DefaultPort(process.env.PORT || "3000");

if(!module.parent) {
  app.listen(PORT.verifyPort() as number, (err?: Error) => {
    if (err) console.log(err);
    console.log(`App listening on port ${PORT.verifyPort()}`);
  });
}
