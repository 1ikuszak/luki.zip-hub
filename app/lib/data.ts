import { CommandItemData, ReviewData, SocialLink } from "@/app/types";

export const mainCommands: CommandItemData[] = [
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
];

export const reviews: ReviewData[] = [
  {
    id: "review-1",
    author: "Kirutika",
    role: "CEO Ambrosial",
    content:
      "Praca z Lukim to czysta przyjemność. Nasza Marka wygląda świetnie, a redesign już zbiera pozytywne opinie.",
    rating: 5,
  },
  {
    id: "review-2",
    author: "Jacek Goszczyński",
    role: "CEO JG-Marine",
    content:
      "Łukasz zrozumiał naszą wizję od razu. Komunikacja mega klarowna. Mogliśmy spać spokojnie.",
    rating: 5,
  },
];
