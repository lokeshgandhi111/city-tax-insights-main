import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Property } from "@/utils/analytics";
import { collectionByCity, computeKPIs, propertiesByCity, statusByCity } from "@/utils/analytics";
import { formatINR } from "@/utils/helpers";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ VITE_GEMINI_API_KEY is not set in .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");

function prepareDataSummary(data: Property[], scope: string): string {
  const kpi = computeKPIs(data);
  const collectionData = collectionByCity(data);
  const distributionData = propertiesByCity(data);
  const statusData = statusByCity(data);

  // Format city-wise breakdown
  const cityBreakdown = statusData
    .map((city) => `${city.city}: ${city.Approved} approved, ${city.Rejected} rejected, ${city.Pending} pending`)
    .join("\n");

  const topCollectors = collectionData
    .slice(0, 3)
    .map((c) => `${c.city}: ${formatINR(c.value)}`)
    .join(", ");

  return `
Dataset Summary for Scope: ${scope}

Overall Statistics:
- Total Properties: ${kpi.total}
- Approved: ${kpi.approved} (${((kpi.approved / kpi.total) * 100).toFixed(1)}%)
- Rejected: ${kpi.rejected} (${((kpi.rejected / kpi.total) * 100).toFixed(1)}%)
- Pending: ${kpi.pending} (${((kpi.pending / kpi.total) * 100).toFixed(1)}%)
- Total Collection: ${formatINR(kpi.collection)}

Top Collection Cities: ${topCollectors}

City-wise Breakdown:
${cityBreakdown}

Please answer the user's question based on this property tax data. Be concise and use the exact numbers provided.
`;
}

export async function askGemini(question: string, data: Property[], scope: string): Promise<string> {
  try {
    if (!API_KEY) {
      throw new Error("API key not configured");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const dataSummary = prepareDataSummary(data, scope);

    const prompt = `${dataSummary}

User Question: ${question}

Answer the question directly and concisely, referencing specific numbers from the data where applicable.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return text || "Sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API error:", error);
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes("API key")) {
      return "⚠️ API key not configured. Please check your .env file.";
    }
    if (message.includes("429")) {
      return "⚠️ Rate limit reached. Please wait a moment and try again.";
    }
    if (message.includes("network")) {
      return "⚠️ Network error. Please check your connection.";
    }

    return `⚠️ Error: ${message}`;
  }
}
