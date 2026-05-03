import { CATEGORY_IDS, categoryBadgeLabel, type CategoryId } from "@/lib/category-tree";

export function listCategorySelectOptions(): { id: CategoryId; label: string }[] {
  return [...CATEGORY_IDS]
    .map((id) => ({ id, label: categoryBadgeLabel(id) }))
    .sort((a, b) => a.label.localeCompare(b.label, "es"));
}
