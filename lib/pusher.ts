import PusherServer from 'pusher';
import PusherClient from 'pusher-js';

declare global {
  var pusherServerInstance: PusherServer | undefined;
  var pusherClientInstance: PusherClient | undefined;
}

const ID = process.env.NEXT_PUBLIC_PUSHER_APP_ID;
const KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
const SECRET = process.env.NEXT_PUBLIC_PUSHER_SECRET;
const CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

if (!ID || !KEY || !SECRET || !CLUSTER) {
  throw new Error('missing key');
}
if (!global.pusherServerInstance) {
  global.pusherServerInstance = new PusherServer({
    appId: ID,
    key: KEY,
    secret: SECRET,
    cluster: CLUSTER,
    useTLS: true,
  });
}

if (!global.pusherClientInstance) {
  global.pusherClientInstance = new PusherClient(KEY, {
    channelAuthorization: {
      endpoint: '/api/pusher-auth',
      transport: 'ajax',
    },
    cluster: CLUSTER,
  });
}

export const pusherServer = global.pusherServerInstance;
export const pusherClient = global.pusherClientInstance;
