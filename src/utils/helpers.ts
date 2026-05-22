export const formatINR = (n: number): string => {
  if (n >= 1_00_00_000) return `₹${(n / 1_00_00_000).toFixed(2)} Cr`;
  if (n >= 1_00_000) return `₹${(n / 1_00_000).toFixed(2)} L`;
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
};

export const formatNumber = (n: number): string =>
  new Intl.NumberFormat("en-IN").format(n);

export const CITIES = [
  "Delhi","Mumbai","Pune","Bengaluru","Chennai",
  "Hyderabad","Ahmedabad","Kolkata","Jaipur","Lucknow",
] as const;
