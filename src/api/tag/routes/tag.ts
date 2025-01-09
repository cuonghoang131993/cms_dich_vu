"use strict";

export default {
  routes: [
    {
      method: "GET",
      path: "/tags",
      handler: "tag.show",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/tags/:id",
      handler: "tag.showDetails",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
