import { requester } from "./requester.ts";
import { message } from "./message.ts";
import { getServiceAccount } from "./login.ts";

const PUSH_URL = `https://fcm.googleapis.com/v1/projects/${getServiceAccount().project_id}/messages:send`
export class Sender {
  static async send(message: message) {
    const result = await requester(
      PUSH_URL,
      {
        message,
      },
      {
        method: "POST",
      },
    );
    console.log(result, message);
  }
}
