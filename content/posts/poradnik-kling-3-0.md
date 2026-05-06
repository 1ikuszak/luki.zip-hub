---
title: "Kling 3.0"
order: 6
tag: "poradnik"
description: "Wrzuć ten plik jako kontekst do Claude, Gemini, ChatGPT lub dowolnego AI, i poproś o napisanie promptu do Klinga 3.0. AI użyje tych zasad żeby dać Ci lepszy ou"
problem: ""
dlaKogo: ""
tools: []
---
**by @luki_zip**

Wrzuć ten plik jako kontekst do Claude, Gemini, ChatGPT lub dowolnego AI, i poproś o napisanie promptu do Klinga 3.0. AI użyje tych zasad żeby dać Ci lepszy output.

## Jak używać tego guide'a
**Opcja 1, Jako system prompt:**
Skopiuj cały plik, wklej na początku konwersacji z AI, potem napisz:
"Napisz mi prompt do Klinga 3.0 na [opis sceny]"
**Opcja 2, Jako ściąga:**
Czytaj zasady, kopiuj keywords i templates, pisz własne prompty.

## 5-Layer Prompt Formula
Każdy dobry prompt składa się z 5 warstw, zawsze w tej kolejności:
1. **SCENE** → Gdzie jesteśmy? Pora dnia, światło, atmosfera.
1. **CHARACTERS** → Kto jest w kadrze? Materiały, nie ogólniki.
1. **ACTION** → Co się dzieje? Jedna główna akcja na ujęcie.
1. **CAMERA** → Jak to filmujemy? Ruch kamery + obiektyw.
1. **AUDIO** → Co słyszymy? Dialog, dźwięk otoczenia, cisza.
Kling przetwarza prompt sekwencyjnie. Bez sceny, nie wie gdzie umieścić postać. Bez kamery, statyczny kadr. Każda warstwa buduje na poprzedniej.

## Keyword Library, Kopiuj Wklej do Promptów
### Ruchy Kamery
| Keyword | Efekt |
| --- | --- |
| slow dolly push-in | Zbliżenie do postaci, intymność |
| dolly pull-out | Odsunięcie, reveal otoczenia |
| dolly zoom | Efekt vertigo, tło się zmienia, postać stoi |
| tracking shot | Kamera jedzie obok postaci |
| arc shot | Łuk wokół postaci |
| crane shot | Ruch pionowy, wielkie reveale |
| crane reveal | Podniesienie kamery odkrywające krajobraz |
| slow pan | Kontrolowany obrót w poziomie |
| whip-pan | Szybki obrót, energia, przejście |
| orbit | Pełne lub częściowe okrążenie postaci |
| handheld drift | Organiczny sway, dokument, autentyczność |
| shoulder-cam sway | Cięższy handheld, surowa energia |
| FPV drone | Pierwsza osoba z drona, immersyjne |
| crash zoom | Agresywne zbliżenie, moment uderzenia |
| steadicam | Płynny, unoszący się ruch, walk-and-talk |
| rack focus | Przeniesienie ostrości z przodu na tył |
| static tripod | Zablokowana, stabilna, kontrola kompozycji |
| Dutch angle | Przechylona kamera, napięcie, niepokój |
| low-angle tracking | Postać wygląda heroicznie |
| macro push-in | Extreme close-up z ruchem do przodu |
### Typy Ujęć
| Keyword | Kiedy użyć |
| --- | --- |
| extreme wide / establishing | Kontekst, otwarcie sceny |
| wide shot | Całe ciało + otoczenie |
| medium shot | Od pasa w górę, rozmowa |
| medium close-up | Od klatki piersiowej, emocja z kontekstem |
| close-up | Sama twarz, max emocja |
| extreme close-up | Jeden detal (oko, dłoń, przedmiot) |
| macro | Mikroskopijny detal, jedzenie, tekstura |
| over-the-shoulder | Dialog, zakotwiczenie perspektywy |
| low-angle | Patrzenie w górę, siła, heroizm |
| high-angle | Patrzenie w dół, bezbronność |
| bird's eye | Z góry, wzór, skala |
| shot-reverse-shot | Naprzemienne ujęcia dwóch postaci w dialogu |
### Oświetlenie
**Naturalne:**
| Keyword | Efekt |
| --- | --- |
| golden hour | Ciepłe, niskie słońce |
| blue hour | Chłodne, przed świtem / po zachodzie |
| overcast soft light | Równe, bez ostrych cieni |
| dappled sunlight | Światło przez liście |
| moonlight | Chłodne, niebiesko-srebrne |
**Sztuczne:**
| Keyword | Efekt |
| --- | --- |
| neon signs | Kolorowe, miejskie, refleksy |
| flickering fluorescent tubes | Niepokojące, szpitalne |
| candlelight | Ciepłe, intymne, migoczące |
| practical lights | Widoczne źródła światła w kadrze |
| amber nightclub strobe | Pulsujące, energetyczne |
**Kinowe:**
| Keyword | Efekt |
| --- | --- |
| cinematic rim lighting | Separacja postaci od tła |
| volumetric god rays | Smugi światła przez mgłę/dym |
| lens flare | Anamorficzny rozbłysk |
| backlighting | Sylwetka lub podświetlone krawędzie |
| chiaroscuro | Wysoki kontrast, głębokie cienie |
**Kolor jako kierunek:**
Nie pisz "dramatic lighting", pisz konkretnie:
- `cool blue haze filling the corridor`
- `amber nightclub strobe cutting through smoke`
- `magenta neon reflecting off wet asphalt`
- `golden hour light catching dust particles`
### Fizyka Ciała i Materiałów
**Ruch ciała:**
- `natural body mechanics`
- `realistic weight distribution`
- `rhythmic walking gait`
- `gentle head tilt`
- `shoulders rotate naturally`
- `muscles tensed`
- `weight shifts`
- `spine compression and release`
- `visible breath in cold air`
- `sweat spray catches light`
- `hair catching the light`
- `fabric billows in wind`
**Fizyka zderzenia:**
- `grass bends, flattens, and snaps back under impact`
- `dirt and small debris kick up naturally`
- `sparks flying from metal contact`
- `splinters flying`
- `glass shattering`
- `water splashes`
- `crumbs eject, micro oil droplets flick outward`
### Anchory Spójności
Dodawaj do KAŻDEGO prompta:
- `stable background`
- `no morphing`
- `consistent features`
- `exact outfit maintained`
- `no background warping`
- `facial features and outfit details remain identical between scenes`
### Realizm i Obiektyw
- `barrel distortion`, dodaje fizyczność
- `filmic grain`, organic texture
- `shallow depth of field`, separacja
- `glowing bokeh`, kinowe tło
- `chromatic aberration`, edge distortion
- `motion blur`, prędkość
- `photorealistic`, anchor realizmu
**Film stock references (Kling je rozumie):**
- `shot on 35mm film`, ciepły grain
- `VHS camcorder aesthetic`, surowy retro
- `desaturated teal grade, crushed blacks`, moody editorial
### Sprzęt Filmowy, Nazwy Zamiast Ogólników
| ✗ Nie pisz | ✓ Pisz |
| --- | --- |
| cinematic camera | Arri Alexa 35 with 35mm prime |
| nice lens | RED V-Raptor with anamorphic lens |
| good camera | Sony Venice with 85mm Zeiss Master Prime |
| close-up lens | macro 85mm lens |
| smooth camera | wide-angle steadicam |
### Audio, Dźwięki Otoczenia
- `soft jazz hum in background`
- `rain tapping softly on the roof`
- `faint traffic noise`
- `birds chirping, wind through trees`
- `muffled howling of wind`
- `crowd chatter`
- `footsteps echo softly`
- `ceramic clinks sharply`
- `chair scraping back`
### Audio, Głos (Voice Tone Descriptors)
Kopiuj te deskryptory do dialogu:
- `calm, low voice`
- `raspy, deep voice`
- `sharp, fast-paced, angry tone`
- `voice cracking`
- `whispering`
- `shouting loudly`
- `hesitant voice`
- `warm nostalgic voice`
- `controlled serious voice`
- `sleepy amused voice`
- `exhausted voice`
- `crying voice`
- `annoyed sarcastic tone`
### Audio, Muzyka
- `sad piano chord enters quietly`
- `music tightens with a rising pulse`
- `low atmospheric suspense music with deep bass drones`
- `soft acoustic guitar music`

## Materiały vs Ogólniki
To jest NAJWAŻNIEJSZA zasada. Kling odpowiada na tekstury, nie na ogólne opisy.
| ✗ Ogólnik | ✓ Materiał |
| --- | --- |
| white robot | opaque matte white vinyl entity with streamlined athletic build |
| armor | medieval leather armor with brass rivets and worn straps |
| car | matte black futuristic motorcycle with carbon fiber body panels |
| dress | light linen dress, wind-catching fabric, natural weave texture |
| table | worn oak butcher's block with deep knife marks |
| bottle | crystal glass perfume bottle with gold accents and engraved serif lettering |
| suit | navy blue tailored suit, wool texture, subtle pinstripe |
| coffee machine | matte black coffee machine with clean engraved lettering |
| nice car | matte black 1967 Mustang with chrome bumpers and patina paint |

## 7 Typów Promptów, Zasady + Templates
### Typ 1: T2V (Text-to-Video)
**Template:**
```plain text
[Camera + lens spec]. [Shot type], [camera movement].
[Subject with full material/physical description]
[performs specific action with body mechanics].
[Environment with architectural detail and atmosphere].
[Lighting setup with named sources].
[Texture details: grain, reflections, condensation].
[Realism anchors: film stock, color grade].
```
**Przykład:**
```plain text
Static tripod camera in narrow neon-lit ramen shop,
condensation fogs the window, couple sits side by side
under flickering magenta sign, steam rising from bowls
as they eat noodles in slow synchronized rhythm, broth
splattering gently, their faces softly illuminated by
red neon glow, shot on 35mm film with shallow focus
and glowing bokeh behind them.
```
### Typ 2: I2V (Image-to-Video)
**Template:**
```plain text
Use the uploaded image as the exact first frame.
[Duration]-second [camera movement description].
[How the scene evolves from the static image].
[Reactive elements: hair, cloth, particles, steam].
[Consistency anchors: maintaining exact appearance,
stable background, no morphing].
[Audio cues if needed].
```
**Zasada:** Zdjęcie BLOKUJE tożsamość. Prompt opisuje TYLKO ruch i ewolucję.
### Typ 3: Sekwencja Akcji
**Template:**
```plain text
[Camera spec + movement], [character with material-specific
outfit] [explosive action with impact physics].
[Debris, particles, reactive elements].
[Environment remains stable].
[Lighting that serves the energy].
[Technical: motion blur, high contrast, 4K].
```
**Zasada:** Opisuj FIZYKĘ ZDERZENIA: "splinters flying, blade catching lantern light", nie "cuts the wood."
### Typ 4: Emocjonalny Close-Up
**Template:**
```plain text
[Shot type], [slow camera movement].
[Character's face with physical details]
[subtle emotional action: eyes, lips, breathing].
[Lighting for mood with named source].
[Material textures on skin, fabric, jewelry].
[Audio: silence, breathing, ambient].
```
**Zasada:** MIKRO-AKCJE, nie makro-emocje. "Jaw clenched so hard muscles twitch, nostrils flare, eyes glassy but refusing to blink", nie "sad face."
### Typ 5: FPV / Reveal Środowiskowy
**Template:**
```plain text
[FPV drone / crane / steadicam movement path].
[Journey through space with architectural details].
[Atmospheric elements: dust, particles, light shafts, fog].
[Stable geometry, no morphing].
[Named lighting conditions].
[Lens characteristics: barrel distortion, wide-angle].
```
**Zasada:** Jedna linia prosta, do przodu. Każdy zakręt = ryzyko warpingu. Zawsze: "stable forward motion, no jitter, controlled speed."
### Typ 6: Multi-Shot (bez dialogu)
**Template:**
```plain text
Shot 1: [Shot type + camera]. [Subject action].
[Environment and lighting].

Shot 2: [Nowy kąt/kadr]. [Akcja kontynuuje lub eskaluje].

Shot 3: [Kulminacja]. [Wizualny payoff].

[Atmosfera, color grade, specs na końcu, dotyczą całości].
```
**Zasada:** Definiuj postać RAZ na górze. Inna kamera na każde ujęcie. Max 4-6 shotów na 10-15s.
**Przykład, Samurai Training (6 shotów):**
```plain text
Shot 1: Extreme close-up of a young woman's mouth, teeth
clenched on a wooden toothpick.

Shot 2: Medium shot in a Japanese courtyard at night,
illuminated by paper lanterns. She holds a katana in
defensive stance, bare feet on wet stone.

Shot 3: Low-angle action, she jumps high, raising her
katana to strike a wooden training dummy.

Shot 4: High-speed impact, katana slicing through wood,
splinters flying, blade catching lantern light.

Shot 5: Tracking shot of her landing smoothly and
immediately pivoting to strike another target,
bare feet splashing.

Shot 6: Medium close-up of her face, slightly breathless,
sharp focused gaze, sweat on her brow.

Cinematic, warm amber lighting from lanterns,
photorealistic, motion blur on action shots, 4K.
```
### Typ 7: Dialog z Audio
**4 zasady dialogu:**
**P1: Etykiety postaci**, konsekwentne, pełne, nigdy zamienniki:
```plain text
✓ [Character A: Black-suited Agent, raspy deep voice]
✗ [Agent] says... Then, he says...
```
**P2: Akcja PRZED dialogiem**, opisz co postać ROBI, potem co mówi:
```plain text
✓ The agent slams his hand on the table.
  [Black-suited Agent, angrily shouting]: "Where is the truth?"

✗ [Black-suited Agent]: "Where is the truth?"
```
**P3: Voice descriptors**, każda postać ma unikalny głos:
```plain text
✓ [Agent, raspy deep voice]: "Don't move."
  [Assistant, clear fearful voice]: "I'm scared."

✗ [Man] says... [Woman] says...
```
**P4: Temporal control**, słowa kontrolujące rytm między mówcami:
| Słowo | Efekt |
| --- | --- |
| "Immediately," | Szybka odpowiedź, rapid back-and-forth |
| "Pause." / "Silence." | Cisza między liniami |
| "After a moment," | Naturalna pauza na myślenie |
| "[Character] sighs/exhales." | Fizyczny beat między dialogiem |
Bez temporal control Kling skleja głosy w jednoczesne mówienie.
**Template dialogu:**
```plain text
[Opis sceny: lokacja, pora, atmosfera.]
[Dźwięk otoczenia.]

[Postać A, fizyczna akcja.]
[Character A: Pełna Etykieta, ton głosu]: "Dialog."

Immediately, [Postać B, fizyczna reakcja.]
[Character B: Pełna Etykieta, ton głosu]: "Odpowiedź."

[Beat, akcja fizyczna, dźwięk, lub cisza.]

[Postać A, zmiana w zachowaniu.]
[Character A, zaktualizowany ton]: "Kolejna linia."

[Rozwiązanie lub końcowy beat.]
```
**Przykład, Kitchen Argument:**
```plain text
A dim kitchen late at night. Only the refrigerator hum
fills the silence.

A plate is set down too hard. Ceramic clinks sharply.
[Character A: Exhausted Partner, trembling frustrated voice]:
"You never listen to me."

Immediately, the other partner turns around, eyes wide.
[Character B: Defensive Partner, shouting loudly]:
"Because you never stop blaming!"

The exhausted partner exhales shakily.
[Exhausted Partner, voice cracking]:
"I'm not blaming… I'm begging."

Silence.

The defensive partner sighs heavily.
[Defensive Partner, softly, regretful]:
"I don't know how to fix this."

A sad piano chord enters quietly.
```

## Negative Prompts, Kopiuj Per Scenariusz
**Standard (do każdej generacji):**
```plain text
Smiling, laughing, cartoonish, bright saturated colors,
low resolution, morphing, blurry text, disfigured hands,
extra fingers, anime style
```
**Poważne / mroczne sceny, dodaj:**
```plain text
Cheerful, optimistic, clean aesthetic, overlit
```
**Product shoty, dodaj:**
```plain text
Distorted text, unreadable labels, morphing product,
changing colors
```

## Camera Cheat Sheet, Emocja → Ruch
| Cel | Ruch kamery |
| --- | --- |
| Intymność | slow dolly push-in |
| Reveal | crane reveal / dolly pull-out |
| Dokument | handheld drift |
| Heroizm | low-angle tracking shot |
| Napięcie | Dutch angle + crash zoom |
| Produkt | slow orbit with rack focus |
| Akcja | tracking shot / whip-pan |
| POV | FPV drone / POV |
| Spokój | static tripod |
| Vertigo | dolly zoom |
| Western | extreme close-up, slow push-in |
| Fantasy | crane reveal / steadicam |

## Troubleshooting, Quick Fixes
| Problem | Przyczyna | Fix |
| --- | --- | --- |
| Tło faluje / warping | Za szybka kamera | "slow, steady, controlled" |
| Obiekt morphuje | Za dużo akcji naraz | Jedna akcja na ujęcie |
| Ubranie się zmienia | Brak anchorów | "exact outfit maintained, consistent features" |
| Ręce wyglądają dziwnie | Brak opisu pozycji | Opisz pozycję dłoni konkretnie |
| Za CGI / plastikowe | Brak lens artifacts | "filmic grain, barrel distortion" + nazwa sprzętu |
| Zbyt jasne i wesołe | Brak negative prompt | Dodaj negative + desaturated color grade |
| Tekst nieczytelny | Brak zakotwiczenia | "spray-painted on concrete wall, text remains crisp" |
| Głosy się sklejają | Brak temporal control | "Pause." / "Silence." / "Immediately," |
| Lip sync drift | Dialog przed akcją | Akcja PRZED dialogiem, nie po |
| Statyczny kadr | Brak camera direction | Zawsze otwieraj shot typem + ruchem kamery |
| Scena nie trzyma się kupy | Brak spatial anchors | Dodaj ściany, podłogę, landmarks |
| Rushed pacing | Za dużo shotów | Max 4-6 na 15s, 2-3 na 8s |
| Generyczny output | Abstrakcyjne przymiotniki | Zamień "beautiful" na konkretne detale |

## Elements 3.0, Spójność Postaci
1. Utwórz Element → wrzuć 2-3 zdjęcia z różnych kątów
1. Nadaj imię (np. "Agent")
1. W prompcie: `@Agent` zamiast opisywania postaci
1. Kling blokuje twarz, ciało, proporcje, styl
**Minimum 2 kąty** (przód + profil). Jedno zdjęcie = Kling improwizuje.

## Duration Guide
| Czas | Shoty | Najlepsze do |
| --- | --- | --- |
| 5-6s | 1-2 | Jeden ruch kamery, close-up, product shot |
| 8s | 2-3 | Pojedyncza sekwencja, I2V animacja |
| 10s | 3-4 | Multi-shot z narracją |
| 12s | 4-5 | Dialog, commercial spot |
| 15s | 5-6 | Pełne arki, complex dialogue, mini-film |

## Ranking, Gdzie Kling 3.0 Jest Najlepszy
1. **FPV / reveale środowiskowe**, prawie zawsze perfekcyjne
1. **Multi-shot (bez dialogu)**, mini-filmy z jednego prompta
1. **Sekwencje akcji**, fizyka i dynamika
1. **Image-to-Video**, ożywianie gotowych kadrów
1. **T2V single shot**, wymaga precyzji ale solidne
1. **Emocjonalne close-upy**, trafność ~50/50, generuj warianty
1. **Dialog z audio**, najtrudniejszy, ale wow kiedy działa

## Prompt po angielsku, zawsze.
Kling najlepiej rozumie angielski. Dialogi mogą być w dowolnym języku (PL, EN, JP, ES, KR, CN), ale opis sceny, kamery i akcji ZAWSZE po angielsku.

## Instrukcje dla AI (system prompt)
Jeśli użytkownik prosi o prompt do Klinga 3.0:
1. Zastosuj 5-Layer Formula: Scene → Characters → Action → Camera → Audio/Style
1. Użyj material specificity, opisuj tekstury i materiały, nie ogólniki
1. Zawsze dołącz konkretny ruch kamery i nazwę sprzętu (Arri Alexa, RED V-Raptor, Sony Venice)
1. Użyj keywords z biblioteki powyżej, kopiuj dosłownie, Kling je rozumie
1. Dla multi-shot: definiuj postać przed ujęciami, inna kamera na każde ujęcie
1. Dla dialogu: etykiety postaci, akcja przed dialogiem, temporal control (Immediately / Pause / Silence)
1. Dodaj negative prompt do każdej generacji (Standard + wariant per scenariusz)
1. Opisuj fizykę materiałów, co się dzieje z obiektami w momencie akcji
1. Jedna główna akcja na ujęcie, nie kompresuj wielu akcji
1. Prompt po angielsku, dialogi w dowolnym języku
1. Dołącz specs: Duration, Aspect Ratio, Mode (I2V/T2V/Multi-Shot), Audio (On/Off)
1. Dodaj anchory spójności: "stable background, no morphing, consistent features"
1. Nazywaj źródła światła konkretnie, "golden hour sunlight" nie "dramatic lighting"
1. Front-load najważniejsze informacje, scena i postać pierwsze, detale techniczne na końcu

*Stworzył:  @luki.zip*
