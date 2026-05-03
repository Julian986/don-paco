import ProductForm from "@/components/admin/product-form";
import { CATEGORY_IDS } from "@/lib/category-tree";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  const defaultValues = {
    slug: "",
    name: "",
    marca: "",
    nombre: "",
    description: "",
    lista: 0,
    cash: null,
    categoryId: CATEGORY_IDS[0]!,
    stock: 5,
    images: [] as string[],
    destacado: false,
  };

  return <ProductForm mode="create" defaultValues={defaultValues} />;
}
