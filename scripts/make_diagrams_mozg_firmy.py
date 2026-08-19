#!/usr/bin/env python3
"""Figury do artykulu "Jak zbudowalem firmowa baze wiedzy".

Jezyk wizualny zdjety 1:1 z figur Cerebrasa, w akcencie luki.zip.
Ich system, po obejrzeniu wszystkich jedenastu figur, ma DOKLADNIE tyle:

  - jasne cieple tlo, rzadka siatka pustych kolek,
  - piec do dziewieciu DUZYCH skrzynek i bardzo duzo powietrza,
  - skrzynka = prostokat, w srodku nazwa (mono, wersaliki, akcent),
    a pod nia jedna linijka szczegolu (szarosc, wersaliki, myslniki),
  - wypelnienie tintem = to, o czym mowi sekcja; biale = reszta,
  - proste strzalki z trojkatnym grotem i kwadratowe klamry do grupowania,
  - para etykiet z boku (nazwa + szczegol) tam, gdzie skrzynka jest obrazkiem.

Czego u nich NIE MA i czego tu tez nie ma: paneli z paskiem naglowka, tabel
z danymi, kart z trzema liniami tekstu, prozy szeryfowej, macierzy plusow.
Znaczenie niesie TEKST w skrzynce, nie gestosc rysunku.

Animacja: figura jest cala widoczna od pierwszej klatki. Rusza sie tylko
jedna kreskowana strzalka, jedna kropka jadaca sciezka i powolny oddech
tintu na skrzynce, o ktorej mowi sekcja.

UWAGA: nazwy plikow trzymamy w ASCII - siedza w tresci artykulu i w URL.
"""
import pathlib

OUT = pathlib.Path(__file__).resolve().parents[1] / "public/posts/mozg-firmy"

BG = "#FCFBFA"
ACC = "#2656d9"
MUT = "#9A9895"
INK = "#2b2b2b"

MONO = ("ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "
        "'Liberation Mono', monospace")

W, H = 1600, 900


def head(title):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="{title}">
<defs>
  <pattern id="g" width="80" height="80" patternUnits="userSpaceOnUse">
    <circle cx="40" cy="40" r="3.2" fill="none" stroke="{ACC}" stroke-opacity="0.15" stroke-width="1.1"/>
  </pattern>
  <marker id="a" viewBox="0 0 12 12" refX="11" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
    <path d="M 1 1 L 11 6 L 1 11 z" fill="{ACC}"/>
  </marker>
</defs>
<style>
  .flow{{stroke-dasharray:8 10;animation:f 1.7s linear infinite}}
  @keyframes f{{to{{stroke-dashoffset:-36}}}}
  .breathe{{animation:b 4s ease-in-out infinite}}
  @keyframes b{{0%,100%{{fill-opacity:.10}}50%{{fill-opacity:.20}}}}
  @media (prefers-reduced-motion: reduce){{
    .flow,.breathe{{animation:none}}
    .mover{{display:none}}
  }}
</style>
<rect width="{W}" height="{H}" fill="{BG}"/>
<rect width="{W}" height="{H}" fill="url(#g)"/>
'''



# Diakrytyki: slownik nakladany wylacznie na tekst renderowany do SVG.
# Zrodlo trzymamy w ASCII, wiec nazwy plikow i sciezki sa bezpieczne.
PL = {
    "ZRODLO": "ŹRÓDŁO", "ZRODLA": "ŹRÓDŁA", "ZRODEL": "ŹRÓDEŁ",
    "ZGLOSZEN": "ZGŁOSZEŃ", "WLASNE": "WŁASNE", "LACZNIK": "ŁĄCZNIK",
    "TRESC": "TREŚĆ", "SKAD": "SKĄD", "CZLOWIEK": "CZŁOWIEK",
    "ROZNE": "RÓŻNE", "WATEK": "WĄTEK", "ORYGINAL": "ORYGINAŁ",
    "SIEDZI": "SIEDZI", "DOLOZENIE": "DOŁOŻENIE", "PIATEGO": "PIĄTEGO",
    "SPROBUJE": "SPRÓBUJE", "BLAD": "BŁĄD", "PLIKOW": "PLIKÓW",
    "SLOWA": "SŁOWA", "SLOW": "SŁÓW", "SLOWO": "SŁOWO",
    "DOKLADNIE": "DOKŁADNIE", "DOKLADNY": "DOKŁADNY", "RZADKOSC": "RZADKOŚĆ",
    "SWIEZOSC": "ŚWIEŻOŚĆ", "KANDYDATOW": "KANDYDATÓW",
    "WYCIAG": "WYCIĄG", "SUROWY": "SUROWY", "WIADOMOSCI": "WIADOMOŚCI",
    "SKONCZYLO": "SKOŃCZYŁO", "CALA": "CAŁA", "ZEBY": "ŻEBY",
    "DALO": "DAŁO", "SIE": "SIĘ", "ZEBRALEM": "ZEBRAŁEM",
    "ZNAKOW": "ZNAKÓW", "KROTKIE": "KRÓTKIE", "PLACISZ": "PŁACISZ",
    "PROG": "PRÓG", "MIESCI": "MIEŚCI", "DUZA": "DUŻA", "OGOLU": "OGÓLU",
    "SZCZEGOLU": "SZCZEGÓŁU", "KAWALEK": "KAWAŁEK", "SKLADNI": "SKŁADNI",
    "TNIESZ": "TNIESZ", "LACZENIE": "ŁĄCZENIE", "BILA": "BIŁA",
    "GLOS": "GŁOS", "ODPOWIEDZ": "ODPOWIEDŹ", "ODPOWIEDZI": "ODPOWIEDZI",
    "ZMYSLIC": "ZMYŚLIĆ", "SA": "SĄ", "BYLO": "BYŁO", "WIDAC": "WIDAĆ",
    "KTORY": "KTÓRY", "ZEPSUL": "ZEPSUŁ", "OBSLUGA": "OBSŁUGA",
    "DOMYSLNY": "DOMYŚLNY", "KANAL": "KANAŁ", "ZAMOWIEN": "ZAMÓWIEŃ",
    "SPRZEDAZ": "SPRZEDAŻ", "NALEZY": "NALEŻY", "ZADNEGO": "ŻADNEGO",
    "DWOCH": "DWÓCH", "TRESCI": "TREŚCI", "GDZIE": "GDZIE",
    "MIEJSCU": "MIEJSCU", "WSZYSTKICH": "WSZYSTKICH", "BIJE": "BIJE",
    "KTOS": "KTOŚ", "USTALENIE": "USTALENIE", "POSPOLITE": "POSPOLITE",
    "PRZELICZASZ": "PRZELICZASZ", "GRANICACH": "GRANICACH",
    "NIEISTNIEJE": "NIE ISTNIEJE", "ISTNIEJE": "ISTNIEJE",
    "OCENIONA": "OCENIONA", "ZDAJE": "ZDAJE", "WYGRYWA": "WYGRYWA",
    "MIELENIE": "MIELENIE", "POTWIERDZEN": "POTWIERDZEŃ",
    "NAJPIERW": "NAJPIERW", "WPISOW": "WPISÓW",
    "WYCIAGIEM": "WYCIĄGIEM", "TESTOW": "TESTÓW",
    "PROBUJESZ": "PRÓBUJESZ", "SZUKAC": "SZUKAĆ",
    "WEJSCIE": "WEJŚCIE", "KSZTALT": "KSZTAŁT",
}


def pl(s):
    """Nakłada polskie znaki na napis renderowany do SVG."""
    import re as _re
    return _re.sub(r"[A-Za-z]+", lambda w: PL.get(w.group(0), w.group(0)), s)


def t(x, y, s, size=19, fill=ACC, anchor="middle", track=0.08, weight=400):
    return (f'<text x="{x}" y="{y}" font-family="{MONO}" font-size="{size}" '
            f'fill="{fill}" text-anchor="{anchor}" font-weight="{weight}" '
            f'letter-spacing="{track}em">{pl(s)}</text>\n')


def box(x, y, w, h, title, sub=None, tint=False, breathe=False, size=19):
    """Skrzynka: nazwa w srodku, pod nia jedna linijka szczegolu."""
    r = ""
    if tint:
        cl = ' class="breathe"' if breathe else ""
        op = "0.20" if not breathe else "0.14"
        r += (f'<rect{cl} x="{x}" y="{y}" width="{w}" height="{h}" fill="{ACC}" '
              f'fill-opacity="{op}"/>\n')
    r += (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="none" '
          f'stroke="{ACC}" stroke-width="2"/>\n')
    cx = x + w / 2
    if sub:
        r += t(cx, y + h / 2 - 6, title, size=size)
        r += t(cx, y + h / 2 + 26, sub, size=15, fill=MUT, track=0.1)
    else:
        r += t(cx, y + h / 2 + 7, title, size=size)
    return r


def side(x, y, title, sub, anchor="start"):
    """Para etykiet obok elementu: nazwa i szczegol."""
    return (t(x, y, title, size=19, anchor=anchor, track=0.09) +
            t(x, y + 30, sub, size=15, fill=MUT, anchor=anchor, track=0.1))


def path(d, arrow=False, flow=False, wd=2):
    c = ' class="flow"' if flow else ""
    a = ' marker-end="url(#a)"' if arrow else ""
    return (f'<path{c} d="{d}" fill="none" stroke="{ACC}" stroke-width="{wd}"'
            f'{a}/>\n')


def arrow(x1, y1, x2, y2, flow=False):
    return path(f"M {x1} {y1} L {x2} {y2}", arrow=True, flow=flow)


def brace(x, y1, y2, out_x):
    """Kwadratowa klamra grupujaca skrzynki przed strzalka."""
    return path(f"M {x} {y1} L {out_x} {y1} L {out_x} {y2} L {x} {y2}")


def mover(d, dur=3.2, begin="0s"):
    return (f'<circle class="mover" r="6" fill="{ACC}" opacity="0">'
            f'<set attributeName="opacity" to="1" begin="{begin}"/>'
            f'<animateMotion dur="{dur}s" begin="{begin}" repeatCount="indefinite" '
            f'path="{d}"/></circle>\n')


def cap(x, y, s):
    return t(x, y, s, size=15, fill=MUT, anchor="start", track=0.12)


def save(name, body):
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / name).write_text(body + "</svg>\n", encoding="utf-8")
    print(f"  {name}  {len((OUT / name).read_text(encoding='utf-8')):>6} B")


# ---------------------------------------------------------------- fig 01
def fig01():
    """Zrodla zostaja u siebie, jedna tabela, jedno wejscie."""
    s = head("Anatomia bazy wiedzy")
    src = ["CZAT FIRMOWY", "DYSK I DOKUMENTY", "SKRZYNKA MAILOWA",
           "SYSTEM ZGLOSZEN", "WLASNE BAZY"]
    for i, n in enumerate(src):
        y = 160 + i * 120
        s += box(150, y, 340, 88, n)
    s += brace(490, 204, 684, 560)
    s += arrow(560, 444, 700, 444, flow=True)
    s += mover("M 490 204 L 560 204 L 560 444 L 700 444")
    s += mover("M 490 684 L 560 684 L 560 444 L 700 444", begin="1.6s")
    s += cap(150, 790, "JEDEN LACZNIK NA ZRODLO")

    s += box(700, 380, 420, 128, "JEDNA TABELA",
             "TRESC - WEKTOR - SKAD - KTO WIDZI", tint=True, breathe=True,
             size=22)
    s += cap(700, 550, "TEN SAM KSZTALT WIERSZA, ZAWSZE")

    s += arrow(1120, 444, 1220, 444)
    s += box(1220, 380, 300, 128, "PYTANIE", "CZLOWIEK - AGENT - AUTOMAT")
    s += cap(1220, 550, "JEDNO WEJSCIE DLA WSZYSTKICH")
    return s


# ---------------------------------------------------------------- fig 02
def fig02():
    """Rozne wejscia, jeden ksztalt wiersza."""
    s = head("Jeden wspolny wiersz")
    s += box(120, 330, 380, 150, "ROZNE ZRODLA",
             "WATEK - UMOWA - KOD - TABELA")
    s += arrow(500, 405, 620, 405, flow=True)
    s += mover("M 500 405 L 620 405", dur=2.4)
    s += box(620, 330, 400, 150, "TEN SAM WIERSZ",
             "ZAWSZE OSIEM TYCH SAMYCH POL", tint=True, breathe=True, size=22)
    s += arrow(1020, 405, 1140, 405)
    s += box(1140, 330, 340, 150, "JEDEN INTERFEJS",
             "SZUKANIE - ODPOWIEDZI - UPRAWNIENIA")

    s += side(120, 570, "CO SIEDZI W WIERSZU",
              "ZRODLO - LINK - TRESC - ORYGINAL")
    s += side(120, 640, "", "WEKTOR - DATA - ZAKRES - KTO WIDZI")
    s += side(1140, 570, "DOLOZENIE PIATEGO ZRODLA",
              "TO JEDEN NOWY PLIK, RESZTA BEZ ZMIAN")
    s += cap(120, 780, "WIERSZ BEZ DATY, LINKU ALBO ZAKRESU NIE WCHODZI DO BAZY")
    return s


# ---------------------------------------------------------------- fig 03
def fig03():
    """Cztery kandydaci na jedno pytanie: dwoch wchodzi, dwoch odpada."""
    s = head("Cztery sposoby szukania")
    s += side(120, 130, "PYTANIE",
              "„PRZYWRACANIE STAJE PO WCZYTANIU LISTY PLIKOW”")

    rows = [("STAJE NA DYSKU SIECIOWYM", "INNE SLOWA, TA SAMA RZECZ", True),
            ("BLAD: LIMIT LISTY PLIKOW", "DOKLADNIE TE SLOWA", True),
            ("NO DOBRA, SPOKO, SPROBUJE", "ZERO RZADKICH SLOW", False),
            ("TO SAMO, ALE SPRZED ROKU", "ZA STARE, PROCEDURA NIE ISTNIEJE",
             False)]
    for i, (ttl, sub, hit) in enumerate(rows):
        y = 220 + i * 140
        s += box(120, y, 700, 112, ttl, sub, tint=hit, breathe=(i == 1))
    s += cap(120, 810, "TA SAMA LISTA KANDYDATOW, OCENIONA CZTERY RAZY")

    s += brace(820, 276, 416, 900)
    s += arrow(900, 346, 1000, 346, flow=True)
    s += mover("M 820 276 L 900 276 L 900 346 L 1000 346", dur=2.8)
    s += box(1000, 282, 480, 128, "WCHODZI DO ODPOWIEDZI",
             "ZDAJE KILKA TESTOW NARAZ", tint=True)

    s += brace(820, 556, 696, 900)
    s += arrow(900, 626, 1000, 626)
    s += box(1000, 562, 480, 128, "ODPADA", "WYGRYWA TYLKO U JEDNEGO TESTU")

    s += side(1000, 760, "CZTERY TESTY",
              "DOKLADNY TEKST - ZNACZENIE - RZADKOSC - SWIEZOSC")
    return s


# ---------------------------------------------------------------- fig 04
def fig04():
    """Watek -> wyciag -> wiersz."""
    s = head("Wyciag z watku")
    s += box(110, 340, 400, 150, "SUROWY WATEK",
             "CZTERY WIADOMOSCI, JEDNA BEZ TRESCI")
    s += t(600, 396, "WYCIAG", size=15, fill=MUT, track=0.12)
    s += t(600, 420, "ROBI MODEL", size=15, fill=MUT, track=0.12)
    s += arrow(510, 440, 690, 440, flow=True)
    s += mover("M 510 440 L 690 440", dur=2.4)

    s += box(690, 340, 400, 150, "WYCIAG", "PYTANIE - USTALENIE - CZEGO DOTYCZY",
             tint=True, breathe=True, size=22)
    s += t(1180, 396, "ZAPIS", size=15, fill=MUT, track=0.12)
    s += t(1180, 420, "DO BAZY", size=15, fill=MUT, track=0.12)
    s += arrow(1090, 440, 1270, 440)
    s += box(1270, 340, 300, 150, "WIERSZ", "TO IDZIE DO SZUKANIA")

    s += side(110, 600, "CO WCHODZI",
              "PYTANIE, KTORE KTOS REALNIE ZADAL")
    s += side(690, 600, "CO ZOSTAJE",
              "USTALENIE, CZYLI JAK SIE SKONCZYLO")
    s += side(1270, 600, "CO OBOK",
              "CALA ROZMOWA I LINK")
    s += cap(110, 760, "ORYGINALU NIE WEKTORYZUJESZ. ZOSTAJE, ZEBY DALO SIE W NIEGO KLIKNAC")
    return s


# ---------------------------------------------------------------- fig 05
def fig05():
    """Prog wejscia: dwie wiadomosci wchodza, jedna odpada."""
    s = head("Prog wejscia")
    s += box(150, 150, 620, 120, "USTAW POBIERANIE NA 4",
             "RZADKIE SLOWO - KONKRET - 62 ZNAKI")
    s += box(150, 300, 620, 120, "ZEBRALEM TO W JEDNO MIEJSCE...",
             "PONAD 200 ZNAKOW - REAKCJA POD SPODEM")
    s += brace(770, 210, 360, 850)
    s += arrow(850, 285, 990, 285, flow=True)
    s += mover("M 770 210 L 850 210 L 850 285 L 990 285", dur=2.8)
    s += box(990, 220, 460, 130, "WCHODZI DO BAZY",
             "ZDAJE PRZYNAJMNIEJ JEDEN TEST", tint=True, breathe=True)

    s += box(150, 500, 620, 120, "NO DOBRA, SPOKO",
             "KROTKIE - POSPOLITE SLOWA - BEZ REAKCJI")
    s += arrow(770, 560, 990, 560)
    s += box(990, 495, 460, 130, "ODPADA", "ZERO Z TRZECH TESTOW")

    s += side(150, 700, "TRZY TESTY, WYSTARCZY JEDEN",
              "RZADKIE SLOWO - 200 ZNAKOW - REAKCJA")
    s += cap(150, 810, "PROG STOI PRZED WYCIAGIEM. INACZEJ PLACISZ ZA MIELENIE POTWIERDZEN")
    return s


# ---------------------------------------------------------------- fig 06
def fig06():
    """Ciecie kodu: probujesz po kolei, az sie zmiesci."""
    s = head("Ciecie kodu")
    steps = [("CALA KLASA", "PROBUJESZ NAJPIERW TEGO", True),
             ("POJEDYNCZE METODY", "GDY KLASA SIE NIE MIESCI", False),
             ("MNIEJSZE BLOKI", "GDY METODA DALEJ JEST ZA DUZA", False)]
    for i, (ttl, sub, tint) in enumerate(steps):
        y = 180 + i * 200
        s += box(420, y, 620, 140, ttl, sub, tint=tint, breathe=(i == 0),
                 size=22)
        if i < 2:
            s += arrow(730, y + 140, 730, y + 200, flow=(i == 0))
    s += mover("M 730 320 L 730 380", dur=2.0)

    s += side(120, 250, "OD OGOLU", "DO SZCZEGOLU")
    s += side(1100, 250, "JEDEN PLIK", "KILKA WPISOW")
    s += side(1100, 650, "PRZY ZMIANIE", "PRZELICZASZ TYLKO TEN KAWALEK")
    s += cap(120, 810, "TNIESZ PO GRANICACH SKLADNI, NIE CO TYLE A TYLE ZNAKOW")
    return s


# ---------------------------------------------------------------- fig 07
def fig07():
    """Trzy listy schodza sie w jedna."""
    s = head("Laczenie list")
    lists = [("DOKLADNY TEKST", "TEN WATEK NA 1. MIEJSCU"),
             ("ZNACZENIE", "TEN WATEK NA 2. MIEJSCU"),
             ("RZADKIE SLOWO", "TEN WATEK NA 2. MIEJSCU")]
    for i, (ttl, sub) in enumerate(lists):
        y = 170 + i * 180
        s += box(120, y, 480, 130, ttl, sub)
    s += brace(600, 235, 605, 700)
    s += arrow(700, 420, 840, 420, flow=True)
    s += mover("M 600 235 L 700 235 L 700 420 L 840 420", dur=3.0)
    s += mover("M 600 605 L 700 605 L 700 420 L 840 420", dur=3.0, begin="1.5s")

    s += box(840, 355, 520, 130, "JEDNA LISTA",
             "SUMUJESZ MIEJSCA, NIE OCENY", tint=True, breathe=True, size=22)
    s += side(840, 560, "WZOR", "WAGA / (60 + POZYCJA)")
    s += side(840, 660, "DLACZEGO 60",
              "ZEBY ZGODNOSC BILA JEDEN MOCNY GLOS")
    s += cap(120, 810, "DOKUMENT WYSOKI U WSZYSTKICH TRZECH BIJE TEGO, KTORY JEST PIERWSZY U JEDNEJ")
    return s


# ---------------------------------------------------------------- fig 08
def fig08():
    """Pytanie -> planista -> narzedzia -> odpowiedz. Wzor: ich figura 08."""
    s = head("Trzy kroki odpowiedzi")
    s += box(80, 400, 300, 120, "PYTANIE")
    s += arrow(380, 460, 480, 460)
    s += box(480, 400, 300, 120, "PLANISTA", "WYBIERA, GDZIE SZUKAC",
             tint=True, breathe=True)

    tools = ["SZUKAJ", "SZUKAJ W ROZMOWACH", "SZUKAJ W KODZIE", "KTO SIE ZNA"]
    for i, n in enumerate(tools):
        y = 150 + i * 160
        s += box(900, y, 380, 110, n)
        s += path(f"M 840 460 L 840 {y+55} L 900 {y+55}", arrow=True,
                  flow=(i == 1))
        s += path(f"M 1280 {y+55} L 1340 {y+55} L 1340 460")
    s += path("M 780 460 L 840 460")
    s += mover("M 780 460 L 840 460 L 840 205 L 900 205", dur=3.0)
    s += mover("M 780 460 L 840 460 L 840 645 L 900 645", dur=3.0, begin="1.5s")

    s += arrow(1340, 460, 1380, 460)
    s += box(1380, 400, 200, 120, "ODPOWIEDZ", "Z LINKIEM", size=17)
    s += cap(80, 620, "PLANISTA NIE WIDZI TRESCI, WIEC NIE MA CZEGO ZMYSLIC")
    s += cap(80, 660, "GDY NIC NIE PASUJE, ODPOWIEDZ BRZMI: NIE MA TEGO W BAZIE")
    s += cap(80, 810, "KROKI SA OSOBNE PO TO, ZEBY BYLO WIDAC, KTORY SIE ZEPSUL")
    return s


# ---------------------------------------------------------------- fig 09
def fig09():
    """Dwa zakresy, wspolne zrodlo. Wzor: ich figura 11."""
    s = head("Zakresy")
    s += box(120, 220, 420, 150, "ZAKRES: OBSLUGA",
             "DOMYSLNY DLA TEGO ZESPOLU", tint=True, breathe=True)
    s += box(120, 530, 420, 150, "ZAKRES: PRODUKT", "DOMYSLNY DLA TEGO ZESPOLU",
             tint=True)

    src = ["KANAL AWARIE", "DYSK: UMOWY", "BAZA ZAMOWIEN", "REPOZYTORIUM",
           "KANAL SPRZEDAZ"]
    for i, n in enumerate(src):
        y = 130 + i * 140
        s += box(1000, y, 460, 106, n)

    # obsluga -> awarie, umowy, zamowienia
    for yy in (183, 323, 463):
        s += path(f"M 540 295 L 780 295 L 780 {yy} L 1000 {yy}", arrow=True)
    # produkt -> awarie (wspolne), repozytorium
    for yy in (183, 603):
        s += path(f"M 540 605 L 860 605 L 860 {yy} L 1000 {yy}", arrow=True)
    s += mover("M 540 605 L 860 605 L 860 183 L 1000 183", dur=3.4)

    s += side(120, 750, "KANAL AWARIE JEST W OBU ZAKRESACH",
              "I NIE JEST KOPIOWANY DRUGI RAZ")
    s += cap(120, 850, "KANAL SPRZEDAZ NIE NALEZY DO ZADNEGO Z TYCH DWOCH")
    return s


if __name__ == "__main__":
    print("figury ->", OUT)
    save("fig-01-anatomia.svg", fig01())
    save("fig-02-wiersz.svg", fig02())
    save("fig-03-szukanie.svg", fig03())
    save("fig-04-destylacja.svg", fig04())
    save("fig-05-prog.svg", fig05())
    save("fig-06-ciecie.svg", fig06())
    save("fig-07-fuzja.svg", fig07())
    save("fig-08-potok.svg", fig08())
    save("fig-09-zakresy.svg", fig09())
