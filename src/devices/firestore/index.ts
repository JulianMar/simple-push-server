import { requester } from "../../fcm/requester.ts";
import { getServiceAccount } from "../../fcm/login.ts";
import { Device } from '../index.ts'

const BASE_URL = `https://firestore.googleapis.com/v1/projects/${getServiceAccount().project_id}/databases/(default)/documents`

const checkIfExists = async (device: Device) => {
    const data = await requester(
        BASE_URL + ':runQuery',
        {
            structuredQuery: {
                from: [
                    {
                        collectionId: "users"
                    }
                ],
                where: {
                    fieldFilter: {
                        field: {
                            fieldPath: 'id'
                        },
                        op: 'EQUAL',
                        value: {
                            stringValue: device.deviceId
                        }
                    }
                }
            }
        },
        {
            method: 'POST'
        }
    )

    return data[0].hasOwnProperty('document')
}

const store = async (device: Device) => {

    if (await checkIfExists(device)) {
        return;
    }

    await requester(
        BASE_URL + '/users',
        {
            fields: {
                id: {
                    stringValue: device.deviceId,

                },
                platform: {
                    stringValue: device.platform
                }
            }
        },
        {
            method: 'POST'
        }
    )
}

type stringValue = {
    stringValue: string
}
type queryResponse = {
    document: {
        name: string,
        fields: {
            id: stringValue,
            platform?: stringValue
        },
        createTime: string,
        updateTime: string
    },
    readTime: string
}

const getAllFromPlatform = async (platform: string): Promise<queryResponse[]> => {
    return requester(
        BASE_URL + ':runQuery',
        {
            structuredQuery: {
                select: {
                    fields: [
                        {
                            fieldPath: 'id'
                        }
                    ]
                },
                from: [
                    {
                        collectionId: "users"
                    }
                ],
                where: {
                    fieldFilter: {
                        field: {
                            fieldPath: 'platform'
                        },
                        op: 'EQUAL',
                        value: {
                            stringValue: platform
                        }
                    }
                }
            }
        },
        {
            method: 'POST'
        }
    )
}

export {
    store,
    getAllFromPlatform
}
