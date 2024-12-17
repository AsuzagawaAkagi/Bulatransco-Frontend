import { defineMiddleware } from "astro:middleware";
import { fetchClient } from "@/lib/client";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
  const token = context.cookies.get("roletoken");

  if (!token) {
    ("no token");
    context.locals.valid = false;
    context.locals.role = null;
    return next();
  }

  try {
    const { data } = await fetchClient.get<{ valid: boolean; role: string }>(
      `/auth/verify?token=${token.value}`
    );

    if (data.valid) {
      context.locals.valid = true;
      context.locals.role = data.role;
    } else {
      context.locals.valid = false;
      context.locals.role = null;
      context.cookies.delete("roletoken");
    }

    return next();
  } catch (error) {
    console.error(error);
    context.locals.valid = false;
    context.locals.role = null;
    return next();
  }
});
