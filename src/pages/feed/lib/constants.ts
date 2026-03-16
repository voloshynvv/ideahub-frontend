import z from "zod";

export const tabValues = ["new", "popular", "saved"] as const;
export type TabValue = (typeof tabValues)[number];

export const defaultValues = {
  tab: "new",
  q: "",
} as const;

export const searchSchema = z.object({
  tab: z.enum(tabValues).default(defaultValues.tab).catch(defaultValues.tab),
  q: z.string().default(defaultValues.q).catch(defaultValues.q),
});
