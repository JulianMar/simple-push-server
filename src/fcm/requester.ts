import { getToken } from "./login.ts";

const requester = async (
  url: string,
  body: object,
  options: RequestInit = {},
): Promise<any> => {
  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const finalOptions = Object.assign(defaultOptions, options);

  finalOptions.body = JSON.stringify(body);

  finalOptions.headers = {
    ...finalOptions.headers,
    "Authorization": "Bearer " + await getToken(),
  };

  console.log(finalOptions)
  try {
    const response = await fetch(url, finalOptions);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export {
  requester,
};
