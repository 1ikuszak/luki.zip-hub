import { CommandItemData, ReviewData, SocialLink } from "@/app/types";

export const CALENDLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf6pBE9idOVF33I22RuX5h15BfGoXhN8UByOhKRSwxibveoOw/viewform";

// Starter / Content Interest Form (Notion) — przyciski "Chcę Starter"
export const STARTER_FORM_URL =
  "https://www.notion.so/Content-Interest-Form-36a8f4fa2413802a820ff2dae75f7c96";

// "Pogadajmy" — booking Cal.com
export const CONTACT_FORM_URL =
  "https://cal.com/łukasz-glica-tz6ei1/30min";

export const mainCommands: CommandItemData[] = [
  {
    id: "oferta",
    icon: "Layers",
    label: "Oferta",
    description: "Pakiety i wycena",
    shortcut: "O",
    action: "ZOBACZ",
    href: "/oferta",
    keywords: "oferta pakiety cena pricing wycena starter growth full",
  },
  {
    id: "wspolpraca",
    icon: "Clapperboard",
    label: "Współpraca",
    description: "AI Video & Creative Direction",
    shortcut: "C",
    action: "KONTAKT",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSf6pBE9idOVF33I22RuX5h15BfGoXhN8UByOhKRSwxibveoOw/viewform",
    keywords: "współpraca contact projekty creative direction",
  },
  {
    id: "grupka",
    icon: "Users",
    label: "Grupka",
    description: "Darmowa grupa AI Video",
    shortcut: "G",
    action: "DOŁĄCZ",
    href: "https://t.me/+18I7hpVZ1DozOWU0",
    keywords: "grupka community telegram ai video",
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: "youtube",
    icon: "Youtube",
    label: "YouTube",
    stats: "200k wyświetleń • 7k subów",
    href: "https://www.youtube.com/@luki_zip",
    keywords: "youtube video social",
  },
  {
    id: "tiktok",
    icon: "Music2",
    label: "TikTok",
    href: "https://www.tiktok.com/@luki.zip",
    keywords: "tiktok social video",
  },
  {
    id: "linkedin",
    icon: "Linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lukasz-glica-4b3889267/",
    keywords: "linkedin social",
  },
];

export const reviews: ReviewData[] = [
  {
    id: "review-4f",
    author: "Barbara Wieliczko",
    role: "4F",
    // Napisane przez klientkę własnymi słowami, zgoda na publiczne użycie
    // udzielona wprost (WhatsApp, 2026-07-20). Tekst verbatim — nie skracać
    // bez potrzeby. UWAGA: klientka CELOWO nie nazwała projektu ("jeden
    // z naszych projektów specjalnych") — nie dopisywać obok nazwy kampanii
    // ani "F1", bo to niweczy jej dyskrecję wobec NDA.
    content:
      "Łukasz odpowiadał za materiały tworzone z użyciem AI przy jednym z naszych projektów specjalnych i była to współpraca, którą z pełnym przekonaniem polecam. Celnie zinterpretował brief, trafiając nie tylko w treść, ale i w intencję oraz vibe, na którym nam zależało. Pracowaliśmy zespołowo i na każdym etapie widać było zaangażowanie, dobrą komunikację i realne poczucie odpowiedzialności za efekt. Co najważniejsze, mimo bardzo napiętego terminu dowiózł materiał na świetnym poziomie, bez kompromisów po stronie jakości.",
    rating: 5,
  },
  {
    id: "review-3",
    author: "Sebastian Majchrzak",
    role: "CEO Football Mat",
    content:
      "Polecam współpracę z Łukaszem. Ma cechy, które w szczególności sobie cenię, kreatywność i proaktywność. W realizacji wykonanej dla nas czuć pasję Łukasza i otwartość na doskonalenie każdego szczegółu.",
    rating: 5,
  },
  {
    id: "review-2",
    author: "Jacek Goszczyński",
    role: "CEO JG-Marine",
    content:
      "Łukasz zrozumiał naszą wizję od razu. Komunikacja mega klarowna. Mogliśmy spać spokojnie.",
    // ⬇️ NOWA WERSJA — PODMIENIĆ dopiero po "ok" od Jacka (zapytanie 2026-07-20).
    // Tekst napisany przez Łukasza na bazie danych z projektu, NIE cytat
    // z wiadomości klienta. Liczby do potwierdzenia u niego (10h/tydz na osobę,
    // 3 biura na jednych danych). Do publikacji potrzebna jego zgoda.
    //
    // "Łukasz zrozumiał naszą wizję od razu i wdrożył system dokładnie tam,
    //  gdzie traciliśmy najwięcej czasu. Trzy biura pracują dziś na jednych
    //  danych. Odzyskaliśmy średnio 10 godzin tygodniowo na osobę, które idą
    //  teraz na realną pracę, a nie na administrację."
    rating: 5,
  },
];
