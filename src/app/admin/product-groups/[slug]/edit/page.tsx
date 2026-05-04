import { redirect } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function LegacyEditProductGroupRedirect({ params }: Props) {
  const { slug: raw } = await params;
  const slug = decodeURIComponent(raw);
  redirect(`/admin/products/groups/${encodeURIComponent(slug)}`);
}
