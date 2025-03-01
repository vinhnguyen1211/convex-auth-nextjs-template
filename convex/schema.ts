import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
  }).index("email", ['email']),
  
  profiles: defineTable({
    userId: v.string(),
    fullName: v.string(),
    companyName: v.optional(v.string()),
    phone: v.optional(v.string()),
    website: v.optional(v.string()),
  }),

  subcontractorDetails: defineTable({
    profileId: v.id("profiles"),
    skills: v.array(v.string()),
    certifications: v.array(v.string()),
    yearsOfExperience: v.number(),
    hourlyRate: v.number(),
    availability: v.string(),
    preferredJobTypes: v.array(v.string()),
  }),

  reviews: defineTable({
    subcontractorId: v.id("subcontractorDetails"),
    reviewerId: v.id("profiles"),
    rating: v.number(),
    comment: v.string(),
  }),
});

export default schema;
