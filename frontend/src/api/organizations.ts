export async function registerOrganization(data: {
  name: string;
  contact_email: string;
  password: string;
  description?: string;
  phone_number?: string;
  website_url?: string;
}) {
  const response = await fetch("http://localhost:5050/organizations/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to register");
  }

  return result;
}