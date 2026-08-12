import "server-only";
import { headers } from "next/headers";
import { prisma } from "./prisma";

type AuditInput = {
  userId?: string | null;
  userEmail?: string | null;
  action: string;
  module: string;
  entityId?: string | null;
  summary?: string | null;
  oldValue?: unknown;
  newValue?: unknown;
};

/** Record an admin action to the audit log. Never throws into the caller. */
export async function logAudit(input: AuditInput): Promise<void> {
  try {
    const hdrs = await headers();
    await prisma.auditLog.create({
      data: {
        userId: input.userId ?? null,
        userEmail: input.userEmail ?? null,
        action: input.action,
        module: input.module,
        entityId: input.entityId ?? null,
        summary: input.summary ?? null,
        oldValue: input.oldValue !== undefined ? JSON.stringify(input.oldValue) : null,
        newValue: input.newValue !== undefined ? JSON.stringify(input.newValue) : null,
        ip: hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
        userAgent: hdrs.get("user-agent") ?? null,
      },
    });
  } catch {
    // Audit logging must never break the primary action.
  }
}
