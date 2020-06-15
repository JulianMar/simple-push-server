import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { sendPushToAll } from "../devices.ts";
import { parseBody } from "../router.ts";
import { createMessage } from "../fcm/message.ts";

interface SendRequest {
  title: string;
}
export default async (req: ServerRequest) => {
  const body = await parseBody<SendRequest>(req);

  if (!body) {
    return req.respond({ body: "error" });
  }

  const message = createMessage(body.title, "test");

  sendPushToAll(message);

  req.respond({ body: "start sending" });
};
