import { serve } from "./deps.ts";
import { resolveRoute } from "./router.ts";
import { login } from "./fcm/login.ts";

const server = serve({ port: 8000 });

console.log("http://localhost:8000/");

await login();

for await (const req of server) {
  try {
    resolveRoute(req);
  } catch (error) {
    req.respond({ body: error.message, status: 401 });
  }
}
