import React, { createContext, useState } from "react";
import { useContext } from "react";
import { io } from "socket.io-client";

export interface Result {
  filter: string;
  word: string;
  file: string;
  timestamp?: Date;
}

export interface WebSocketsContextData {
  connect: () => void;
  receivedMessages: Result[];
}

export const WebSocketsContext = createContext<WebSocketsContextData>(
  {} as WebSocketsContextData
);

const WebSocketsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [connection, setConnection] = useState<ReturnType<typeof io> | null>(
    null
  );
  const [receivedMessages, setReceivedMessages] = useState<Result[]>([]);

  const connect = () => {
    const wsUrl = process.env.REACT_APP_WS_URL;

    if (wsUrl === undefined) {
      throw Error(".env missing REACT_APP_WS_URL variable");
    }

    if (connection) return;

    const _connection = io(wsUrl);

    _connection.on("message", (data) => {
      console.log(data);
      if ("word" in data) {
        setReceivedMessages((prev) => [
          ...prev,
          { ...(data as Result), timestamp: new Date() },
        ]);
      }
    });

    setConnection(_connection);
  };

  return (
    <WebSocketsContext.Provider value={{ connect, receivedMessages }}>
      {children}
    </WebSocketsContext.Provider>
  );
};

export const useWebSockets = () => {
  const context = useContext(WebSocketsContext);

  if (context === undefined || context === null) {
    throw Error("useWebSockets must be used within a WebSocketsProvider");
  }

  return context;
};

export default WebSocketsProvider;
