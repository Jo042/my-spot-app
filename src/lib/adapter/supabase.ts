// lib/adapter/supabase.ts

import { Adapter, AdapterUser } from "next-auth/adapters";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

interface SupabaseAdapterConfig {
  url: string;
  secret: string;
  schema?: string;
}

interface AdapterUserInput {
  id?: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  [key: string]: any;
}

export function SupabaseAdapter(config: SupabaseAdapterConfig): Adapter {
  const schema = config.schema ?? "public";

  const supabase = createClient(config.url, config.secret);

  return {
    async createUser(user: AdapterUserInput): Promise<AdapterUser> {
      const { data, error } = await supabase
        .from("users")
        .insert(user)
        .select()
        .single();
      if (error) throw error;
      return data as AdapterUser;
    },

    async getUser(id: string) {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
      return data as AdapterUser | null;
    },

    async getUserByEmail(email: string) {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();
      return data as AdapterUser | null;
    },

    async getUserByAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }) {
      const { data } = await supabase
        .from("accounts")
        .select("*")
        .eq("provider", provider)
        .eq("providerAccountId", providerAccountId)
        .single();
      return data ?? null;
    },

    async updateUser(user: Partial<AdapterUser> & { id: string }) {
      const { data } = await supabase
        .from("users")
        .update(user)
        .eq("id", user.id)
        .select()
        .single();
      if (!data) throw new Error("Failed to update user");
      return data as AdapterUser;
    },

    async deleteUser(userId: string) {
      await supabase.from("users").delete().eq("id", userId);
    },

    async linkAccount(account: any) {
      await supabase.from("accounts").insert(account);
    },

    async unlinkAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }) {
      await supabase
        .from("accounts")
        .delete()
        .eq("provider", provider)
        .eq("providerAccountId", providerAccountId);
    },

    async createSession(session: any) {
      const { data } = await supabase
        .from("sessions")
        .insert(session)
        .select()
        .single();
      return data!;
    },

    async getSessionAndUser(sessionToken: string) {
      const { data: session } = await supabase
        .from("sessions")
        .select("*")
        .eq("sessionToken", sessionToken)
        .single();
      if (!session) return null;

      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.userId)
        .single();

      return { session, user } as any;
    },

    async updateSession(session: any) {
      const { data } = await supabase
        .from("sessions")
        .update(session)
        .eq("sessionToken", session.sessionToken)
        .select()
        .single();
      return data!;
    },

    async deleteSession(sessionToken: string) {
      await supabase.from("sessions").delete().eq("sessionToken", sessionToken);
    },

    async createVerificationToken(token: any) {
      const { data } = await supabase
        .from("verification_tokens")
        .insert(token)
        .select()
        .single();
      return data!;
    },

    async useVerificationToken({ identifier, token }: { identifier: string; token: string }) {
      const { data: tokenData } = await supabase
        .from("verification_tokens")
        .select("*")
        .eq("identifier", identifier)
        .eq("token", token)
        .single();

      if (tokenData) {
        await supabase
          .from("verification_tokens")
          .delete()
          .eq("identifier", identifier)
          .eq("token", token);
      }

      return tokenData ?? null;
    },
  };
}
