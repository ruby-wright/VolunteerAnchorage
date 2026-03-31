import { supabase } from "../lib/supabaseClient";

type RegisterVolunteerData = {
  opportunityId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  notes: string;
};

export async function registerVolunteer(formData: RegisterVolunteerData) {
  const { data, error } = await supabase.from("volunteer_info").insert({
    opportunity_id: formData.opportunityId,
    first_name: formData.firstName,
    last_name: formData.lastName,
    email: formData.email,
    phone_number: formData.phoneNumber,
    notes: formData.notes,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}