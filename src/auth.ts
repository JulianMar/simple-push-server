import { decode } from "./deps.ts"
import { ServerRequest } from "./deps.ts";
import env from "./env.ts";

const secureRoute = (req: ServerRequest) => {
    if (env.ROUTE_PASSWORD !== '' && !basicAuth(env.ROUTE_USERNAME, env.ROUTE_PASSWORD, req.headers.get('authorization'))) {
        req.respond({status: 401, body: 'unauthenticated'})
        throw new Error('unauthenticated');
    }
}

const basicAuth = ( username: string, password: string, authHeader: string|null) => {
const base64Header = authHeader?.substring(6)

if (base64Header) {
    const buffer = decode(base64Header);
    const text = new TextDecoder("utf-8").decode(buffer)

    if (text === (username + ':' + password)) {
    return true
    }

    return false;
}

return false;
}

export {
    secureRoute
}
