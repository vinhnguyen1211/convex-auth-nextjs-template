import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    profileId: v.id("profiles"),
    skills: v.array(v.string()),
    certifications: v.array(v.string()),
    yearsOfExperience: v.number(),
    hourlyRate: v.number(),
    availability: v.string(),
    preferredJobTypes: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("subcontractorDetails", {
      ...args,
    });
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("subcontractorDetails")
      .collect();
  },
});