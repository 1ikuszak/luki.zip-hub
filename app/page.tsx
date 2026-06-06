import { redirect } from "next/navigation";

// Home page zarchiwizowany na razie — zob. content/_archive/app-page-home.tsx.bak.
// Strona główna pokazuje artykuły. Przywrócenie: skopiuj backup z powrotem tutaj.
export default function Home() {
  redirect("/artykuly");
}
