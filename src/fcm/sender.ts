import { requester } from "./requester.ts";
import { message } from "./message.ts";

export class Sender {
  static async send(message: message) {
    const result = await requester(
      "https://fcm.googleapis.com/v1/projects/simple-push-server/messages:send",
      {
        message,
      },
      {
        method: "POST",
      },
    );
  }
}
