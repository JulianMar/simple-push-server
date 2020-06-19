import { ServerRequest } from "../deps.ts";
export default function (req: ServerRequest) {
  req.respond({ body: "Hello World\n" });
}
