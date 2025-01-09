/**
 * A set of functions called "actions" for `tag`
 */

"use strict";

export default {
  async show(ctx) {
    try {
      const keyword = ctx.query.keyword ?? "";
      // show tags
      let options: any = {
        filters: {},
      };
      if (keyword.trim() !== "") {
        options.filters.name = {
          $contains: keyword,
        };
      }

      const [tags, count] = await strapi
        .service("api::tag.tag")
        .findAll(options);

      ctx.body = {
        tags,
        pagination: {
          total: count,
          queryParams: ctx.query,
        },
      };
    } catch (err) {
      ctx.badRequest("tags show controller error", { moreDetails: err });
    }
  },
  async showDetails(ctx) {
    try {
      const id = ctx.params.id;
      const tag = await strapi.service("api::tag.tag").findById(id);

      ctx.body = {
        tag,
      };
    } catch (err) {
      ctx.badRequest("tag show details controller error", {
        moreDetails: err,
      });
    }
  },
};
