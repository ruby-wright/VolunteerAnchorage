import { supabase } from "./supabaseClient";

export type SignUpOrganizationInput = {
  organizationName: string;
  organizationEmail: string;
  contactName: string;
  contactEmail: string;
  password: string;
};

export async function signUpOrganization(input: SignUpOrganizationInput) {
  const { organizationName, organizationEmail, contactName, contactEmail, password } = input;

  const { data, error } = await supabase.auth.signUp({
    email: organizationEmail,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const user = data.user;

  if (!user) {
    throw new Error("No auth user returned.");
  }

  const { error: orgError } = await supabase.from("organizations").insert([
    {
      user_id: user.id,
      organization_name: organizationName,
      organization_email: organizationEmail,
      contact_name: contactName,
      contact_email: contactEmail,
    },
  ]);

  if (orgError) {
    throw new Error(orgError.message);
  }

  return data;
}

export async function signInOrganization(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signOutOrganization() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}