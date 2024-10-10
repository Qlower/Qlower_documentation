import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

const SwaggerDoc = () => {
  const isClient = typeof window !== "undefined";
  if (!isClient) {
    return null;
  }

  return <SwaggerUI url="https://dev.api.qlower.com/swagger.json" />;
};

export default SwaggerDoc;
