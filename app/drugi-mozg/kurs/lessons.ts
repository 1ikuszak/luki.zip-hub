/**
 * Treść kursu Drugi Mózg. Podmień placeholdery na realne linki:
 *  - videoUrl: URL do EMBEDU (YouTube/Vimeo). Dla prywatności filmów użyj
 *    "unlisted" + ogranicz domenę osadzania (patrz EASYCART_INTEGRATION.md).
 *  - pdfUrl:   bezpośredni link do PDF (zostaw pusty żeby ukryć przycisk).
 *
 * To zwykłe dane — zero sekretów. Strona /drugi-mozg/kurs jest bramkowana
 * podpisanym tokenem, więc lista nie jest publicznie dostępna bez ważnego linku.
 */

export type Lesson = {
  day: number;
  title: string;
  description: string;
  videoUrl: string;
  pdfUrl?: string;
};

export const COURSE_INTRO_VIDEO = ""; // film powitalny na górze — wklej embed URL

export const LESSONS: Lesson[] = [
  {
    day: 1,
    title: "Fundament — plik-mózg, który mówi AI kim jesteś",
    description:
      "Stawiasz rdzeń systemu. Po tej lekcji twoje AI wie, z kim rozmawia, zanim o cokolwiek zapytasz.",
    videoUrl: "",
    pdfUrl: "",
  },
  {
    day: 2,
    title: "Wciąganie wiedzy — automat, który karmi system",
    description:
      "Pierwszy automat: bierze twoje notatki, rozmowy, materiały i sadza je tam, gdzie mają usiąść.",
    videoUrl: "",
    pdfUrl: "",
  },
  {
    day: 3,
    title: "Produkcja — pisanie twoim głosem, nie średnią internetu",
    description:
      "Drugi automat pisze z twojej wiedzy w twoim głosie. Gotowe prompty do wklejenia.",
    videoUrl: "",
    pdfUrl: "",
  },
  {
    day: 4,
    title: "Proces do skilla — zamykasz powtarzalną robotę w narzędzie",
    description:
      "Zamieniasz swój sposób pracy w skill, którego system używa sam, za każdym razem tak samo.",
    videoUrl: "",
    pdfUrl: "",
  },
  {
    day: 5,
    title: "Żywy System — sam się sprząta i aktualizuje",
    description:
      "Trzeci automat utrzymuje system w formie. Drugi Mózg żyje zamiast gnić w martwych notatkach.",
    videoUrl: "",
    pdfUrl: "",
  },
];

export const BONUS = {
  title: "Pakiet startowy + bonus",
  description:
    "Gotowy szkielet do skopiowania i bonusowy zestaw promptów. Wklejasz i ruszasz.",
  url: "",
};
