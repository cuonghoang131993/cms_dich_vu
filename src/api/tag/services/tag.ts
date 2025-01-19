/**
 * tag service
 */

"use strict";

export default {
  async findAll(options) {
    try {
      return strapi.db.query("api::tag.tag").findWithCount({
        select: ["documentId", "name"],
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
            populate: {
              images: {
                select: ["name", "url", "formats", "width", "height"],
              },
            },
          },
        },
        ...options,
      } as any);
    } catch (err) {
      return err;
    }
  },
  async findById(documentId, options) {
    try {
      return strapi.db.query("api::tag.tag").findOne({
        select: ["documentId", "name"],
        where: { documentId },
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
            populate: {
              images: {
                select: ["name", "url", "formats", "width", "height"],
              },
            },
          },
        },
        ...options,
      } as any);
    } catch (err) {
      return err;
    }
  },
};
