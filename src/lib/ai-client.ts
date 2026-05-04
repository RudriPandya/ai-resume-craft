import { supabase } from "@/integrations/supabase/client";

export async function callAI<T = any>(task: string, payload: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke("ai-resume", { body: { task, payload } });
  if (error) {
    // Try to extract a friendlier message from the function's response
    const ctx: any = (error as any).context;
    if (ctx?.status === 429) throw new Error("Rate limit reached. Please wait a moment and try again.");
    if (ctx?.status === 402) throw new Error("AI credits exhausted. Add credits in Workspace Settings → Usage.");
    throw new Error(error.message || "AI request failed");
  }
  if ((data as any)?.error) throw new Error((data as any).error);
  return (data as any).result as T;
}
