# Simple Push Server
written in Deno.

Works with Firebase.

Tokens are only stored in memory right now


## Setup
Just add your service account json file from https://console.firebase.google.com/u/0/project/*your-project*/settings/serviceaccounts/adminsdk.
You need to rename it to auth.json and place it in the root folder


## API

there are two endpoints right now.

```(js)
POST /register

interface RegisterRequest {
  id: string;
  platform: string;
}

```

```
POST /send

interface SendRequest {
  title: string;
}
```
