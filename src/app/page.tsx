import HomeClient from "./home-client";
import { getSiteSettings } from "@/lib/site-settings";
import { buildListingEntries } from "@/lib/products-build";

export const dynamic = "force-dynamic";

export default async function Page() {
  const initialListing = await buildListingEntries();
  const site = getSiteSettings();
  return <HomeClient initialListing={initialListing} site={site} />;
}
