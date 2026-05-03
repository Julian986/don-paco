"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";

const updateSchema = z.object({
  id: z.string().min(1),
  status: z.nativeEnum(OrderStatus),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("UNAUTHORIZED");
  if (!process.env.DATABASE_URL?.trim()) throw new Error("DATABASE_URL no configurada");
}

export async function updateOrderStatus(raw: unknown) {
  await requireAdmin();
  const { id, status } = updateSchema.parse(raw);
  await prisma.order.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/orders");
  return { ok: true as const };
}
