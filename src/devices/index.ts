import { Sender } from "../fcm/sender.ts";
import { message, addSender } from "../fcm/message.ts";
import { store, getAllFromPlatform } from "./firestore/index.ts";

interface Device {
  deviceId: string;
  platform: string;
}

const pushDevices: Set<Device> = new Set();

const createDevice = (id: string, platform: string): Device => {
  return {
    deviceId: id,
    platform: platform,
  };
};

const addDevice = (device: Device) => {
  store(device)
};

const sendPushToAll = async (message: message) => {
  const users = await getAllFromPlatform("web")

  users.forEach(({document}) => {
    sendWeb(message, document.fields.id.stringValue);
  })
};

const sendWeb = (message: message, id: string) => {
  const finalMessage = addSender(message, id);

  Sender.send(finalMessage);
};

export {
  createDevice,
  addDevice,
  sendPushToAll,
  Device
};
