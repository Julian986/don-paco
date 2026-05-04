"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { setGroupHeroInFile } from "@/lib/group-hero-file-fallback";
import {
  upsertProductGroupDisplayWithHeroFallback,
  upsertProductGroupRowWithHeroFallback,
} from "@/lib/persist-product-group-hero";
import { prisma } from "@/lib/prisma";
import { getProductGroupDefinition } from "@/lib/product-groups";
import { productGroupDisplayUpsertSchema } from "@/lib/validations/product-group-display";

function prismaHasProductGroup(): boolean {
  return typeof (prisma as unknown as { productGroup?: { upsert?: unknown } }).productGroup?.upsert === "function";
}

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("UNAUTHORIZED");
  if (!process.env.DATABASE_URL?.trim()) throw new Error("DATABASE_URL no configurada");
}

function revalidateStorefrontGroups(groupSlug: string) {
  revalidatePath("/", "layout");
  revalidatePath("/productos", "layout");
  revalidatePath(`/productos/${groupSlug}`);
}

export async function upsertProductGroupDisplay(raw: unknown) {
  await requireAdmin();
  const data = productGroupDisplayUpsertSchema.parse(raw);
  const desc = data.description?.trim() ? data.description.trim() : null;
  const slug = data.groupSlug.trim();
  const isStaticCatalog = Boolean(getProductGroupDefinition(slug));
  const dn = data.displayName.trim();
  const hero = data.heroImageUrl !== undefined ? data.heroImageUrl ?? null : undefined;

  if (prismaHasProductGroup()) {
    if (hero !== undefined) {
      await upsertProductGroupRowWithHeroFallback({
        slug,
        displayName: dn,
        description: desc,
        isCustom: !isStaticCatalog,
        heroImageUrl: hero,
      });
    } else {
      await prisma.productGroup.upsert({
        where: { slug },
        create: {
          slug,
          displayName: dn,
          description: desc,
          isCustom: !isStaticCatalog,
        },
        update: {
          displayName: dn,
          description: desc,
        },
      });
    }
  } else if (hero !== undefined) {
    await upsertProductGroupDisplayWithHeroFallback(slug, dn, desc, hero);
  } else {
    await prisma.productGroupDisplay.upsert({
      where: { groupSlug: slug },
      create: {
        groupSlug: slug,
        displayName: dn,
        description: desc,
      },
      update: {
        displayName: dn,
        description: desc,
      },
    });
  }
  revalidateStorefrontGroups(slug);
  return { ok: true as const };
}

export async function deleteProductGroupDisplay(groupSlug: string) {
  await requireAdmin();
  const slug = groupSlug.trim();
  if (prismaHasProductGroup()) {
    await prisma.productGroup.deleteMany({ where: { slug } });
  }
  await prisma.productGroupDisplay.deleteMany({ where: { groupSlug: slug } });
  await setGroupHeroInFile(slug, null);
  revalidateStorefrontGroups(slug);
  return { ok: true as const };
}
