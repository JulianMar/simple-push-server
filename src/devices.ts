import { Sender } from "./fcm/sender.ts";
import { message, addSender } from "./fcm/message.ts";

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
  pushDevices.add(device);
};

const sendPushToAll = (message: message) => {
  pushDevices.forEach((device) => {
    if (device.platform === "web") {
      sendWeb(message, device.deviceId);
    }
  });
};

const sendWeb = (message: message, id: string) => {
  const finalMessage = addSender(message, id);

  Sender.send(finalMessage);
};

export {
  createDevice,
  addDevice,
  sendPushToAll,
};
