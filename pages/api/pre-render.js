import { getViewRecipes } from "@/lib/view-recipes";


export async function getRecipes(limit = 48) {
  try {
    const documents = await getViewRecipes(0, limit, {}, {});
    const number = documents.number;

    return { recipes: documents, count: number };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Data fetching failed");
  }
}
