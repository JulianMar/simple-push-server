import { ServerRequest } from "https://deno.land/std/http/server.ts";
import { sendPushToAll } from "../devices/index.ts";
import { parseBody } from "../router.ts";
import { createMessage } from "../fcm/message.ts";
import { secureRoute } from "../auth.ts";

interface SendRequest {
  title: string;
  body: string;
}
export default async (req: ServerRequest) => {
  try {
    secureRoute(req)
  } catch (error) {
    return;
  }

  const body = await parseBody<SendRequest>(req);

  if (!body) {
    return req.respond({ body: "error" });
  }

  const message = createMessage(body.title, body.body);

  // sendPushToAll(message);

  req.respond({ body: "start sending" });
};
