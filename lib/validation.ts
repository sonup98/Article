// import { z } from "zod";

// export const formSchema = z.object({
//   title: z.string().min(3).max(100),
//   description: z.string().min(20).max(500),
//   category: z.string().min(3).max(20),
//   link: z
//     .string()
//     .url()
//     .refine(async (url) => {
//       try {
//         const res = await fetch(url, { method: "HEAD" });
//         const contentType = res.headers.get("content-type");

//         return contentType?.startsWith("image/");
//       } catch {
//         return false;
//       }
//     }),
//   pitch: z.string().min(10),
// });
import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  summary: z.string().min(20).max(500),
  category: z.string().min(3).max(50),
  link: z.string().url().superRefine(async (url, ctx) => {
    try {
      const res = await fetch(url, { method: "HEAD" });
      const contentType = res.headers.get("content-type");

      console.log("Response Headers:", res.headers);

      if (!contentType || !contentType.startsWith("image/")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "URL must be an image (jpg, png, etc.)",
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid or unreachable URL",
      });
    }
  }),
  body: z.string().min(10),
});

