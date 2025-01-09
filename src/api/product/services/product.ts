/**
 * product service
 */

"use strict"

export default {
  async findAll(options) {
    try {
      return strapi.db.query("api::product.product").findWithCount({
        select: [
          "documentId",
          "name",
          "oldPrice",
          "price",
          "summary",
          "description",
          "specification",
        ],
        populate: {
          images: {
            select: ["name", "url", "formats", "width", "height"]
          }
        },
        ...options
      } as any);
    } catch (err) {
      console.log(err)
      return err;
    }
  },
  async findById(documentId, options) {
    try {
      return strapi.db.query("api::product.product").findOne({
        select: [
          "documentId",
          "name",
          "oldPrice",
          "price",
          "summary",
          "description",
          "specification",
        ],
        where: { documentId },
        populate: {
          images: {
            select: ["name", "url", "formats", "width", "height"]
          },
          tags: {
            select: ["id", "documentId", "name"]
          },
          reviews: {
            select: ["documentId", "content", "note"],
            populate: {
              author: {
                select: ["username"],
                populate: {
                  picture: {
                    select: ["formats"]
                  }
                }
              }
            }
          },
        },
        ...options,
      } as any);
    } catch (err) {
      return err;
    }
  },
};
