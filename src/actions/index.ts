import { z } from "astro:schema";
import { ActionError, defineAction } from "astro:actions";
import { fetchClient } from "@/lib/client";

export const server = {
  logoutFunction: defineAction({
    accept: "form",
    handler: async (input, context) => {
      context.cookies.delete("roletoken");
      return { success: true };
    },
  }),
  addPersonel: defineAction({
    accept: "json",
    input: z.object({
      name: z.string(),
      password: z.string(),
      role: z.enum(["conductor", "inspector"]),
    }),
    handler: async (input, context) => {
      if (!context.cookies.get("roletoken")) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Not logged in",
        });
      }

      if (!context.cookies.get("roletoken")?.value) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Not logged in",
        });
      }

      const token = context.cookies.get("roletoken")?.value;

      try {
        const { data } = await fetchClient.post(
          "/manager/addpersonel",
          {
            name: input.name,
            password: input.password,
            role: input.role,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!data) {
          throw new ActionError({
            code: "BAD_REQUEST",
            message: "Failed to add personel",
          });
        }

        return { success: true };
      } catch (error) {
        error;
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Failed to add personel",
        });
      }
    },
  }),
  deletePersonel: defineAction({
    accept: "form",
    input: z.object({
      userId: z.string(),
      type: z.enum(["conductor", "inspector"]),
    }),
    handler: async (input, context) => {
      if (!context.cookies.get("roletoken")) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Not logged in",
        });
      }

      const token = context.cookies.get("roletoken")?.value;

      try {
        await fetchClient.post("/manager/deletepersonel", input, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return { success: true };
      } catch (error) {
        error;
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Failed to delete personel",
        });
      }
    },
  }),
  addLocation: defineAction({
    accept: "form",
    input: z.object({
      name: z.string(),
    }),
    handler: async (input, context) => {
      if (!context.cookies.get("roletoken")) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Not logged in",
        });
      }

      const token = context.cookies.get("roletoken")?.value;

      try {
        const { data } = await fetchClient.post(
          "/manager/addlocation",
          {
            name: input.name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        return { success: true };
      } catch (error) {
        error;
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Failed to add location",
        });
      }
    },
  }),
  addTrips: defineAction({
    accept: "form",
    input: z.object({
      locationId: z.string(),
      conductorId: z.string(),
      inspectorId: z.string(),
      totalPassengers: z.number(),
      date: z.coerce.date(),
    }),
    handler: async (input, context) => {
      if (!context.cookies.get("roletoken")) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Not logged in",
        });
      }

      const token = context.cookies.get("roletoken")?.value;

      try {
        const { data } = await fetchClient.post("/manager/addtrips", input, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        return { success: true };
      } catch (error) {
        error;
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Failed to add trips",
        });
      }
    },
  }),
  deleteLocation: defineAction({
    accept: "form",
    input: z.object({
      id: z.string(),
    }),
    handler: async (input, context) => {
      if (!context.cookies.get("roletoken")) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Not logged in",
        });
      }

      const token = context.cookies.get("roletoken")?.value;

      try {
        const { data } = await fetchClient.post(
          "/manager/deletelocation",
          input,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        return { success: true };
      } catch (error) {
        error;
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Failed to delete location",
        });
      }
    },
  }),
  changePassengerCount: defineAction({
    accept: "json",
    input: z.object({
      type: z.enum(["add", "sub"]),
      count: z.number(),
      tripId: z.string(),
    }),
    handler: async (input, context) => {
      input;

      if (!context.cookies.get("roletoken")) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Not logged in",
        });
      }

      const token = context.cookies.get("roletoken")?.value;
      try {
        await fetchClient.post("/conductor/change-count", input, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        return { success: true };
      } catch (error) {
        error;
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Failed to delete location",
        });
      }
    },
  }),
  startTrip: defineAction({
    accept: "json",
    input: z.object({
      tripId: z.string(),
    }),
    handler: async (input, context) => {
      input;

      if (!context.cookies.get("roletoken")) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Not logged in",
        });
      }

      const token = context.cookies.get("roletoken")?.value;

      try {
        await fetchClient.post("/inspector/start-trip", input, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        return { success: true };
      } catch (error) {
        error;
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Failed to start trip",
        });
      }
    },
  }),
  endTrip: defineAction({
    accept: "json",
    input: z.object({
      tripId: z.string(),
    }),
    handler: async (input, context) => {
      input;

      if (!context.cookies.get("roletoken")) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Not logged in",
        });
      }

      const token = context.cookies.get("roletoken")?.value;

      try {
        await fetchClient.post("/inspector/end-trip", input, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        return { success: true };
      } catch (error) {
        error;
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Failed to end trip",
        });
      }
    },
  }),
  approveRequest: defineAction({
    accept: "json",
    input: z.object({
      tripId: z.string(),
      requestId: z.number(),
      action: z.enum(["approve", "reject"]),
    }),
    handler: async (input, context) => {
      input;

      if (!context.cookies.get("roletoken")) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "Not logged in",
        });
      }

      const token = context.cookies.get("roletoken")?.value;

      try {
        await fetchClient.post(`/inspector/manage-requests/${input.requestId}`, input, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        return { success: true };
      } catch (error) {
        error;
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "Failed to approve request",
        });
      }
    },
  }),
};
