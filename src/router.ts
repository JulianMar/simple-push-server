import { ServerRequest } from "https://deno.land/std/http/server.ts";
import register from "./routes/register.ts";
import index from "./routes/index.ts";
import send from "./routes/send.ts";

enum HTTPVERBS {
  GET = "GET",
  POST = "POST",
}
type Routes = {
  [key in HTTPVERBS]: {
    [name: string]: (req: ServerRequest) => void;
  };
};

const routes: Routes = {
  POST: {
    register,
    send,
  },
  GET: {
    default: index,
  },
};

const cleanUrl = (url: string) => url.substr(1);

const resolveRoute = (req: ServerRequest) => {
  const url = cleanUrl(req.url);
  const method = req.method;

  if (routes[method as HTTPVERBS].hasOwnProperty(url)) {
    routes[method as HTTPVERBS][url](req);
  } else {
    routes[HTTPVERBS.GET].default(req);
  }
};

const parseBody = async <T>(req: ServerRequest): Promise<T | void> => {
  if (!req.contentLength) {
    return;
  }

  let body = new Uint8Array(req.contentLength);
  await req.body.read(body);

  const bodyString = new TextDecoder("utf-8").decode(body);

  return JSON.parse(bodyString);
};

export {
  resolveRoute,
  parseBody,
};
