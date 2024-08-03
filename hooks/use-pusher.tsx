'use client';

import { useContext, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import React from 'react';

const PusherContext = React.createContext<{
  pusher: Pusher | null;
  subscribe: (
    channelName: string,
    eventName: string,
    callback: (data: any) => void
  ) => void;
}>({ pusher: null, subscribe: () => {} });

export function PusherProvider({ children }: { children: React.ReactNode }) {
  const [pusher, setPusher] = useState<Pusher | null>(null);

  const key = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;

  const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

  if (!key || !cluster) {
    throw new Error('missing key');
  }

  useEffect(() => {
    const pusherInstance = new Pusher(key, {
      cluster: cluster,
      forceTLS: true,
    });

    setPusher(pusherInstance);

    return () => {
      pusherInstance.disconnect();
    };
  }, []);

  const subscribe = (
    channelName: string,
    eventName: string,
    callback: (data: any) => void
  ) => {
    if (!pusher) return;
    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, callback);
  };

  return (
    <PusherContext.Provider value={{ pusher, subscribe }}>
      {children}
    </PusherContext.Provider>
  );
}

export function usePusher() {
  const context = useContext(PusherContext);

  if (!context) {
    throw new Error('usePusher must be used within a PusherProvider');
  }

  return context;
}
