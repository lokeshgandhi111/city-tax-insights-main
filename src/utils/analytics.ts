export interface Property {
  property_id: string;
  tenant: string;
  owner_name: string;
  property_type: string;
  ward: string;
  area_sqft: number;
  status: "Approved" | "Rejected" | "Pending";
  annual_tax_inr: number;
  collection_inr: number;
  registration_date: string;
  floor_count: number;
  address: string;
}

export const filterByTenant = (data: Property[], tenant: string): Property[] =>
  tenant === "All Cities" ? data : data.filter((p) => p.tenant === tenant);

export const computeKPIs = (data: Property[]) => ({
  total: data.length,
  approved: data.filter((p) => p.status === "Approved").length,
  rejected: data.filter((p) => p.status === "Rejected").length,
  pending: data.filter((p) => p.status === "Pending").length,
  collection: data.reduce((s, p) => s + p.collection_inr, 0),
});

export const collectionByCity = (data: Property[]) => {
  const m = new Map<string, number>();
  data.forEach((p) => m.set(p.tenant, (m.get(p.tenant) || 0) + p.collection_inr));
  return Array.from(m, ([city, value]) => ({ city, value }))
    .sort((a, b) => b.value - a.value);
};

export const propertiesByCity = (data: Property[]) => {
  const m = new Map<string, number>();
  data.forEach((p) => m.set(p.tenant, (m.get(p.tenant) || 0) + 1));
  return Array.from(m, ([name, value]) => ({ name, value }));
};

export const statusByCity = (data: Property[]) => {
  const m = new Map<string, { city: string; Approved: number; Rejected: number; Pending: number }>();
  data.forEach((p) => {
    const e = m.get(p.tenant) || { city: p.tenant, Approved: 0, Rejected: 0, Pending: 0 };
    e[p.status] += 1;
    m.set(p.tenant, e);
  });
  return Array.from(m.values()).sort((a, b) => a.city.localeCompare(b.city));
};
