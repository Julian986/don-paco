import "server-only";

import { setGroupHeroInFile } from "@/lib/group-hero-file-fallback";
import { isUnknownHeroImageUrlError } from "@/lib/prisma-hero-field";
import { prisma } from "@/lib/prisma";

/** Si el cliente Prisma no conoce `heroImageUrl`, persiste solo texto en BD y la URL en `data/group-hero-urls.json`. */
export async function upsertProductGroupDisplayWithHeroFallback(
  groupSlug: string,
  displayName: string,
  description: string | null,
  heroImageUrl: string | null,
) {
  try {
    await prisma.productGroupDisplay.upsert({
      where: { groupSlug },
      create: {
        groupSlug,
        displayName,
        description,
        heroImageUrl,
      },
      update: { displayName, description, heroImageUrl },
    });
  } catch (e) {
    if (!isUnknownHeroImageUrlError(e)) throw e;
    await prisma.productGroupDisplay.upsert({
      where: { groupSlug },
      create: {
        groupSlug,
        displayName,
        description,
      },
      update: { displayName, description },
    });
    await setGroupHeroInFile(groupSlug, heroImageUrl);
  }
}

type ProductGroupUpsertArgs = {
  slug: string;
  displayName: string;
  description: string | null;
  isCustom: boolean;
  heroImageUrl: string | null;
};

export async function upsertProductGroupRowWithHeroFallback(data: ProductGroupUpsertArgs) {
  const { slug, displayName, description, isCustom, heroImageUrl } = data;
  try {
    await prisma.productGroup.upsert({
      where: { slug },
      create: {
        slug,
        displayName,
        description,
        isCustom,
        heroImageUrl,
      },
      update: {
        displayName,
        description,
        heroImageUrl,
      },
    });
  } catch (e) {
    if (!isUnknownHeroImageUrlError(e)) throw e;
    await prisma.productGroup.upsert({
      where: { slug },
      create: {
        slug,
        displayName,
        description,
        isCustom,
      },
      update: {
        displayName,
        description,
      },
    });
    await setGroupHeroInFile(slug, heroImageUrl);
  }
}
