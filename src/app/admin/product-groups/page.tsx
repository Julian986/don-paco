import { redirect } from "next/navigation";

export default function LegacyProductGroupsRedirect() {
  redirect("/admin/products");
}
