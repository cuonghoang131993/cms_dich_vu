/**
 * A set of functions called "actions" for `products`
 */
"use strict";

const { removeParam } = require("../../../helpers/params");
const { removeDuplicates } = require("../../../helpers/array");

export default {
  async show(ctx) {
    try {
      const category = isNaN(ctx.query.category)
        ? 0
        : parseInt(ctx.query.category);
      const brand = isNaN(ctx.query.brand) ? 0 : parseInt(ctx.query.brand);
      const tag = isNaN(ctx.query.tag) ? 0 : parseInt(ctx.query.tag);
      const keyword = ctx.query.keyword ?? "";
      const sort = ["price", "newest", "popular"].includes(ctx.query.sort)
        ? ctx.query.sort
        : "price";
      const page = isNaN(ctx.query.page)
        ? 1
        : Math.max(1, parseInt(ctx.query.page));
      // show products
      let options: any = {
        filters: {},
      };
      if (category > 0) {
        options.filters.categoryId = category;
      }
      if (brand > 0) {
        options.filters.brandId = brand;
      }
      if (tag > 0) {
        options.populate = {
          tag: {
            filters: { id: tag },
          },
        };
      }
      if (keyword.trim() !== "") {
        options.filters.name = {
          $contains: keyword,
        };
      }
      // select * from products where name like
      // %abc%;
      switch (sort) {
        case "newest":
          options.sort = { created_at: "desc" };
          break;

        // case "popular":
        //   options.sort = [["stars", "DESC"]];
        //   break;

        default:
          options.sort = "price";
          break;
      }

      let originalUrl = removeParam("sort", ctx.originalUrl);
      if (Object.keys(ctx.query).length == 0) {
        originalUrl = originalUrl + "?";
      }

      // pagination
      const limit = 6;
      options.limit = limit;
      options.start = (page - 1) * limit;

      const [products, count] = await strapi
        .service("api::product.product")
        .findAll(options);

      ctx.body = {
        products,
        pagination: {
          page,
          limit,
          total: count,
          queryParams: ctx.query,
        },
        sort,
        originalUrl,
      };
    } catch (err) {
      ctx.badRequest("products show controller error", { moreDetails: err });
    }
  },
  async showDetails(ctx) {
    try {
      const id = ctx.params.id;
      const product = await strapi.service("api::product.product").findById(id);

      const tagIds = [];
      let relatedProducts = [];

      product.tags.forEach((tag) => tagIds.push(tag.documentId));

      const options = {
        where: {
          documentId: { $in: tagIds },
        },
        populate: {
          products: {
            select: [
              "documentId",
              "name",
              "oldPrice",
              "price",
              "summary",
              "description",
              "specification",
            ],
            where: {
              documentId: { $notIn: id },
            },
            populate: {
              images: {
                select: ["name", "url", "formats", "width", "height"],
              },
            },
          },
        },
      };
      const [ tags ] = await strapi
        .service("api::tag.tag")
        .findAll(options);

      tags.forEach((tag) => {
        relatedProducts = relatedProducts.concat(tag.products);
      });

      relatedProducts = removeDuplicates(relatedProducts, 'documentId');

      ctx.body = {
        product,
        relatedProducts,
      };
    } catch (err) {
      ctx.badRequest("product show details controller error", {
        moreDetails: err,
      });
    }
  },
};
