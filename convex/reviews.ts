import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    subcontractorId: v.id("subcontractorDetails"),
    rating: v.number(),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const profile = await ctx.db
      .query("profiles")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!profile) {
      throw new Error("Profile not found");
    }

    return await ctx.db.insert("reviews", {
      ...args,
      reviewerId: profile._id,
    });
  },
});

export const getBySubcontractor = query({
  args: { subcontractorId: v.id("subcontractorDetails") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .filter((q) => q.eq(q.field("subcontractorId"), args.subcontractorId))
      .collect();
  },
});