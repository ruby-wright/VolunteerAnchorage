import { supabase } from "../lib/supabaseClient";

export interface VolunteerSignupPayload {
  opportunity_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  notes?: string;
}

export async function registerVolunteer(payload: VolunteerSignupPayload) {
  // Save volunteer info to the database
  const { error: insertError } = await supabase
    .from("volunteer_info")
    .insert([payload]);

  if (insertError) {
    throw new Error(insertError.message);
  }

  // Call the edge function to send the email
  const { error: functionError } = await supabase.functions.invoke(
    "send-volunteer-email",
    {
      body: payload,
    }
  );

  if (functionError) {
    throw new Error(functionError.message);
  }

  return { success: true };
}