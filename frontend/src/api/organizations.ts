import { supabase } from "../lib/supabaseClient";

type RegisterOrganizationData = {
  organizationName: string;
  organizationEmail: string;
  contactName: string;
  contactEmail: string;
  password: string;
};

export type OrganizationProfile = {
  org_id: string;
  name: string;
  contact_name: string;
  contact_email: string;
  phone_number: string;
  website_url: string;
};

export async function fetchOrganizationProfile(): Promise<OrganizationProfile | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) return null;

  const { data, error } = await supabase
    .from("organizations")
    .select("org_id, name, contact_name, contact_email, phone_number, website_url")
    .eq("org_id", user.id)
    .maybeSingle();

  if (error) throw error;

  return data;
}

type UpdateOrganizationProfileInput = {
  name: string;
  contact_name: string;
  contact_email: string;
  phone_number: string;
  website_url: string;
};

export async function updateOrganizationProfile(updates: UpdateOrganizationProfileInput) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("User not logged in");

  const { data, error } = await supabase
    .from("organizations")
    .update({
      name: updates.name,
      contact_name: updates.contact_name,
      contact_email: updates.contact_email,
      phone_number: updates.phone_number,
      website_url: updates.website_url,
    })
    .eq("org_id", user.id)
    .select()
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function registerOrganization(
  formData: RegisterOrganizationData
) {
  const { data, error } = await supabase.auth.signUp({
    email: formData.organizationEmail,
    password: formData.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const user = data.user;

  if (!user) {
    throw new Error("User was not created");
  }

  const { error: insertError } = await supabase.from("organizations").insert({
    org_id: user.id,
    name: formData.organizationName,
    organization_email: formData.organizationEmail,
    contact_name: formData.contactName,
    contact_email: formData.contactEmail,
  });

  if (insertError) {
    throw new Error(insertError.message);
  }

  return user;
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