import HomeClient from "./home-client";
import { getSiteSettings } from "@/lib/site-settings";
import { buildListingEntries } from "@/lib/products-build";

export const dynamic = "force-dynamic";

export default function Page() {
  const initialListing = buildListingEntries();
  const site = getSiteSettings();
  return <HomeClient initialListing={initialListing} site={site} />;
}
