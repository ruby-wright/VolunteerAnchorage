import { supabase } from "../lib/supabaseClient";

export async function registerOrganization(formData: {
  organizationName: string;
  organizationEmail: string;
  contactName: string;
  contactEmail: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email: formData.organizationEmail,
    password: formData.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("User was not created");
  }

  const { error: insertError } = await supabase.from("organizations").insert([
    {
      user_id: data.user.id,
      organization_name: formData.organizationName,
      organization_email: formData.organizationEmail,
      contact_name: formData.contactName,
      contact_email: formData.contactEmail,
    },
  ]);

  if (insertError) {
    throw new Error(insertError.message);
  }

  return data.user;
}