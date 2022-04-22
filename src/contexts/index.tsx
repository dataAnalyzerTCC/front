import React from "react";
import WebSocketsProvider from "./websockets";

const RootContexts: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <WebSocketsProvider>{children}</WebSocketsProvider>;
};

export default RootContexts;
