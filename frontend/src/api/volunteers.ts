import { supabase } from "../lib/supabaseClient";

export type VolunteerSignupPayload = {
  opportunity_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  notes: string;
};

export async function registerVolunteer(formData: VolunteerSignupPayload) {
  const { data, error } = await supabase
    .from("volunteer_info")
    .insert({
      opportunity_id: formData.opportunity_id,
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      notes: formData.notes,
    })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}