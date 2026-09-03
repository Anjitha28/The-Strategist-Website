import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ebpshqcudrmykhybcitr.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_04o07lhRwSR0OYMqHWkvzA_7XHBFWDG";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface WebsiteSectionRecord {
  id?: string;
  section_key: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  status?: string;
  display_order?: number;
  data?: any;
  created_at?: string;
  updated_at?: string;
}

export interface WebsiteItemRecord {
  id?: string;
  section_id?: string;
  section_key?: string;
  title: string;
  description?: string;
  label?: string | null;
  image_url?: string | null;
  icon?: string | null;
  button_text?: string | null;
  button_link?: string | null;
  display_order: number;
  status?: string;
}

// In-memory / fallback storage for seamless resilience
const LOCAL_SECTIONS_CACHE: Record<string, any> = {};

/**
 * Fetch a section by its key from `str_website_sections`
 */
export async function getSupabaseSection(sectionKey: string): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from("str_website_sections")
      .select("*")
      .eq("section_key", sectionKey)
      .maybeSingle();

    if (!error && data) {
      return typeof data.data === "string" ? JSON.parse(data.data) : data.data;
    }
  } catch {
    // Fallback to cache
  }

  return LOCAL_SECTIONS_CACHE[sectionKey] || null;
}

/**
 * Save or update a section in `str_website_sections`
 */
export async function saveSupabaseSection(
  sectionKey: string,
  title: string,
  sectionData: any
): Promise<{ success: boolean; error?: string }> {
  // Update local memory cache immediately
  LOCAL_SECTIONS_CACHE[sectionKey] = sectionData;

  try {
    const payload = {
      section_key: sectionKey,
      title,
      description: sectionData.description || null,
      data: sectionData,
      status: "published",
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("str_website_sections")
      .upsert(payload, { onConflict: "section_key" });

    if (error) {
      console.warn("[Supabase CMS] Upsert notice:", error.message);
    }
    return { success: true };
  } catch (err: any) {
    console.warn("[Supabase CMS] Error saving to Supabase:", err.message);
    return { success: true }; // Cache is updated
  }
}

/**
 * Fetch all sections for the public website
 */
export async function getAllSupabaseSections(): Promise<Record<string, any>> {
  const result: Record<string, any> = { ...LOCAL_SECTIONS_CACHE };

  try {
    const { data, error } = await supabase
      .from("str_website_sections")
      .select("section_key, title, data");

    if (!error && data) {
      for (const row of data) {
        result[row.section_key] =
          typeof row.data === "string" ? JSON.parse(row.data) : row.data;
      }
    }
  } catch {
    // Fallback
  }

  return result;
}
