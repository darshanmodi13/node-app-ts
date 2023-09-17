import { Connection, createConnection } from "mongoose";

export default class MongoDB {
  private _client!: Connection;
  private MONGO_URI: string;

  constructor(MONGO_URI: string) {
    this.MONGO_URI = MONGO_URI;
  }

  async connect() {
    this._client = await createConnection(this.MONGO_URI);
    this._client.on("connected", () => {
      console.info(":: [MONGO DB] Connection Established To Database ::");
    });
  }
}
