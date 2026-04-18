import { supabase } from "../lib/supabaseClient";

type OpportunityFormData = {
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  startTime: string;
  endTime: string;
  ageRequirements: string;
  commitmentLevel: string;
  capacity: string;
};

export async function fetchOpportunities() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data: organization } = await supabase
    .from("organizations")
    .select("org_id, organization_email, contact_email")
    .or(
      `organization_email.eq.${user.email},contact_email.eq.${user.email}`
    )
    .maybeSingle();

  if (!organization) return [];

  const { data, error } = await supabase
    .from("volunteer_opportunities")
    .select("*")
    .eq("org_id", organization.org_id)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

export async function createOpportunity(formData: OpportunityFormData, photoFile: File | null) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not logged in");

  const { data: organization } = await supabase
    .from("organizations")
    .select("org_id")
    .eq("organization_email", user.email)
    .maybeSingle();

  if (!organization) throw new Error("No organization found");

  let photoUrl = "";

  if (photoFile) {
    const fileExt = photoFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    await supabase.storage
      .from("opportunity-images")
      .upload(fileName, photoFile);

    const { data } = supabase.storage
      .from("opportunity-images")
      .getPublicUrl(fileName);

    photoUrl = data.publicUrl;
  }

  const { data, error } = await supabase
    .from("volunteer_opportunities")
    .insert([
      {
        org_id: organization.org_id,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        category: formData.category,
        start_time: formData.startTime,
        end_time: formData.endTime,
        age_requirements: formData.ageRequirements,
        commitment_level: formData.commitmentLevel,
        capacity: formData.capacity,
        photo_url: photoUrl,
      },
    ])
    .select()
    .maybeSingle();

  if (error) throw error;

  return data;
}

export async function deleteOpportunity(id: string) {
  const { error } = await supabase
    .from("volunteer_opportunities")
    .delete()
    .eq("opportunity_id", id);

  if (error) throw error;
}

export async function updateOpportunity(
  id: string,
  updates: {
    title: string;
    description: string;
    date: string;
    location: string;
    category: string;
    start_time: string;
    end_time: string;
    age_requirements: string;
    commitment_level: string;
    capacity: string;
  }
) {
  const { data, error } = await supabase
    .from("volunteer_opportunities")
    .update(updates)
    .eq("opportunity_id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}