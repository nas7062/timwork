import type { Metadata } from "../types/types";

export async function getMetadata(): Promise<Metadata> {
  const res = await fetch("/data/metadata.json");
  if (!res.ok) throw new Error(`metadata.json load failed: ${res.status}`);
  return (await res.json()) as Metadata;
}
