# Simple Push Server
written in Deno.

Works with Firebase.

Uses Cloud Messaging and FireStore.


## Setup
Just add your service account json file from https://console.firebase.google.com/u/0/project/*your-project*/settings/serviceaccounts/adminsdk.
You need to rename it to auth.json and place it in the root folder

You can change it with the .env file in the root dir. See .env.example for details

There is some basic auth for the api, via the env parameter


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
