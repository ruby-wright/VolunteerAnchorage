import { supabase } from "../lib/supabaseClient";

type RegisterOrganizationData = {
  organizationName: string;
  organizationEmail: string;
  contactName: string;
  contactEmail: string;
  password: string;
};

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