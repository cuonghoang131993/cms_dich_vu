"use strict";

export default {
  routes: [
    {
      method: "GET",
      path: "/products",
      handler: "product.show",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/products/:id",
      handler: "product.showDetails",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

// export default createCoreRouter("api::product.product", routes);
