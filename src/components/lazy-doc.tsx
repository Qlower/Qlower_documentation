import React, { Suspense } from "react";

const SwaggerDoc = React.lazy(() => import("@site/src/components/swagger-doc"));

const LazyDoc = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SwaggerDoc />
  </Suspense>
);

export default LazyDoc;
