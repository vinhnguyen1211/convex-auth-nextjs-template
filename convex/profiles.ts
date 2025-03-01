import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    fullName: v.string(),
    companyName: v.optional(v.string()),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    return await ctx.db.insert("profiles", {
      userId,
      fullName: args.fullName,
      companyName: args.companyName,
      phone: args.phone,
      website: args.website,
    });
  },
});

export const getByUserId = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;
    return await ctx.db
      .query("profiles")
      .filter((q) => q.eq(q.field("userId"), userId))
      .first();
  },
});