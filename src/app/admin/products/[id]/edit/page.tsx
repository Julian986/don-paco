import { notFound } from "next/navigation";

import ProductForm, { productToFormValues } from "@/components/admin/product-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  let product = null;
  try {
    if (process.env.DATABASE_URL?.trim()) {
      product = await prisma.product.findUnique({ where: { id } });
    }
  } catch {
    product = null;
  }
  if (!product) notFound();

  return <ProductForm mode="edit" productId={product.id} defaultValues={productToFormValues(product)} />;
}
