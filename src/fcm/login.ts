import { readJson } from "../deps.ts";
import { Gtoken } from "../deps.ts";
import env from '../env.ts'

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
  env.FIREBASE_AUTH_FILE,
);

if (!file) {
  throw new Error("Provide auth.json in root dir");
}

serviceAccount = file as ServiceAccount;

const gtoken = new Gtoken.default.GoogleToken({
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
