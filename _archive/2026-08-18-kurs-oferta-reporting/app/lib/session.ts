import { cookies } from "next/headers";
import { SESSION_COOKIE, verifyToken } from "@/app/lib/access";

/**
 * Odczyt sesji kursu z httpOnly cookie — do server components (strony kursu).
 * Route handlery czytają cookie z NextRequest same (patrz /api/kurs/download).
 */
export async function getSessionEmail(): Promise<string | null> {
  const store = await cookies();
  const value = store.get(SESSION_COOKIE)?.value;
  return verifyToken(value, "session", process.env.COURSE_ACCESS_SECRET);
}
