import { ServerRequest } from "../deps.ts";
import { parseBody } from "../router.ts";
import { createDevice, addDevice } from "../devices/index.ts";
interface RegisterRequest {
  id: string;
  platform: string;
}
export default async function (req: ServerRequest) {
  const body = await parseBody<RegisterRequest>(req);

  if (body && body.id) {
    const device = createDevice(body.id, body.platform);
    addDevice(device);

    return req.respond({ body: "Register", status: 200 });
  }

  req.respond({ body: "Failed" });
}
