import { readJson } from "https://deno.land/std/fs/read_json.ts";
import Gtoken from "https://dev.jspm.io/gtoken";

interface ServiceAccount {
  "type": string;
  "project_id": string;
  "private_key_id": string;
  "private_key": string;
  "client_email": string;
  "client_id": string;
  "auth_uri": string;
  "token_uri": string;
  "auth_provider_x509_cert_url": string;
  "client_x509_cert_url": string;
}

let serviceAccount: ServiceAccount;
const file: unknown = await readJson(
  "auth.json",
);

if (!file) {
  throw new Error("Provide auth.json in root dir");
}

serviceAccount = file as ServiceAccount;

const gtoken = new Gtoken.GoogleToken({
  key: await serviceAccount.private_key,
  email: await serviceAccount.client_email,
  scope: [
    "https://www.googleapis.com/auth/firebase.messaging",
    "https://www.googleapis.com/auth/cloud-platform",
    "https://www.googleapis.com/auth/datastore"
  ],
});

const login = async () => {
  await gtoken.getToken();
};

const refresh = async () => {
  await gtoken.getToken();
};

const getToken = async () => {
  if (gtoken.hasExpired()) {
    await login();
  }

  return gtoken.accessToken;
};

const getServiceAccount = () => {
  return serviceAccount
}

export {
  login,
  refresh,
  getToken,
  getServiceAccount
};
