import { ServerRequest } from "https://deno.land/std/http/server.ts";
export default function (req: ServerRequest) {
  req.respond({ body: "Hello World\n" });
}
