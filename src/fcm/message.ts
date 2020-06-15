type message = {
  notification: {
    [key: string]: string;
  };
  token?: string;
};

const createMessage = (title: string, body: string): message => {
  return {
    notification: {
      body,
      title,
    },
  };
};

const addSender = (message: message, token: string): message => {
  return {
    ...message,
    token,
  };
};

export {
  message,
  createMessage,
  addSender,
};
