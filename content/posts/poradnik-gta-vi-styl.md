---
title: "GTA VI Styl"
order: 5
tag: "poradnik"
description: "Jak generować zdjęcia i wideo w stylu GTA VI. JSON prompty do Nano Banana Pro i Veo 3.1."
problem: "Generatory AI domyślnie idą w loading screen art zamiast in-game screenshot. JSON zmusza je do RAGE engine quality."
dlaKogo: "Twórcy video robiący content w stylu GTA na Nano Banana Pro, Veo 3.1 i innych generatorach AI."
tools: []
---

## Problem
GTA ma dwa style:
- **Loading screen art**, ilustrowany, cell-shaded
- **In-game screenshot**, 3D rendered, RAGE engine

Generatory AI domyślnie idą w loading screen. Musisz je zmusić do in-game.

## Image Generation
### Struktura JSON która działa
```plain text
prompt → subject → environment → style → lighting → camera → composition → mood → color_palette → technical → critical_game_style → reference_notes

```
Każda sekcja ma zadanie. Pomiń jedną wynik gorszy.

### Prompt:  Winter Crash Scene
![GTA VI gameplay screenshot, winter crash scene wygenerowany w Nano Banana Pro](/posts/gta-vi-styl/winter-crash.png)
Ten prompt wygenerował screenshot GTA VI quality w Nano Banana Pro:
```json
{
  "prompt": "Grand Theft Auto VI gameplay screenshot, winter mountain crash site scene, RAGE engine graphics, stylized video game realism (not photorealistic), GTA VI promotional screenshot, eye-level wide shot, two GTA VI NPCs stranded in snowy wilderness wearing summer clothes, freezing, crashed private jet in background",

  "subject": {
    "male_npc_phone": {
      "description": "GTA VI male NPC character model, Black male, red bandana tied on head, cream/beige baseball jersey with red trim and stripes, no jacket - summer clothes in freezing winter, holding phone to ear, shivering slightly, breath visible in cold air",
      "pose": "Standing in snow, phone pressed to ear, other hand gesturing or hugging body for warmth, weight shifting",
      "expression": "Fake calm masking panic, eyes wide with stress, mouth trying to sound chill, clearly lying about the situation"
    },
    "male_npc_pacing": {
      "description": "GTA VI male NPC character model, Black male, black durag on head, black tank top exposing arms - summer clothes in freezing winter, gold chain necklace, visibly freezing, arms sometimes crossed rubbing for warmth",
      "pose": "Pacing around in background, picking up scattered clothes from snow then putting them down, looking around lost, achieving nothing",
      "expression": "Stressed, confused, freezing cold, trying to help but completely clueless"
    },
    "interaction": "Phone guy trying to handle situation while lying about how bad it is, pacing guy uselessly moving around trying to look helpful, both equally dumb, both freezing in wrong clothes, comedy of errors energy"
  },

  "environment": {
    "location": "Remote winter mountainside, Alaska or Alps wilderness, plane crash site",
    "structures": "Damaged private jet tail section crashed in snow - bent metal panels, visible damage, smoke residue marks",
    "debris": "Scattered damaged cargo boxes broken open, designer clothes spilled onto white snow - jackets, shoes, fabric pieces visible",
    "terrain": "Snow-covered hillside, pristine white snow with footprints around crash site, undisturbed snow in distance",
    "background": "Snow-capped mountains in distance, bare winter trees with no leaves, small wooden hut/cabin visible to side, crisp blue winter sky"
  },

  "style": "Grand Theft Auto VI gameplay screenshot NOT real film NOT photorealistic. RAGE engine graphics throughout. GTA VI NPC character models with stylized video game skin shaders and fabric textures. Stylized video game realism with slight cinematic softness. Rockstar promotional quality. NO realistic cinematography - VIDEO GAME screenshot only.",

  "lighting": {
    "primary": "Crisp winter daylight, bright sun casting cold blue-white light across snow",
    "shadows": "Soft GTA VI game shadows from characters and debris on snow",
    "highlights": "RAGE engine bloom on snow surfaces, jet metal catching sunlight with game reflections",
    "atmosphere": "Cold winter air, visible breath vapor from both NPCs, slight atmospheric haze on distant mountains",
    "skin_lighting": "GTA VI stylized skin shaders, skin appearing slightly pale/cold from freezing temperatures"
  },

  "camera": {
    "angle": "Eye-level wide shot",
    "distance": "Medium-wide - both NPCs visible full body, crash site and jet visible in background",
    "depth_of_field": "Medium - subjects sharp, background slightly soft but crash debris readable",
    "focus": "Phone guy primary focus left-center, pacing guy secondary right side",
    "perspective": "Ground-level in snow, like standing at crash site with them"
  },

  "composition": {
    "framing": "16:9 cinematic wide, GTA VI screenshot composition",
    "subject_placement": "Phone guy left-center of frame, pacing guy right side, jet tail and boxes behind them",
    "foreground": "Snow at their feet, maybe scattered clothing item or box edge",
    "midground": "Two NPCs, scattered cargo boxes and clothes debris",
    "background": "Damaged jet tail section, mountains, bare trees, wooden hut, winter sky",
    "negative_space": "Beautiful mountain vista fills upper third, contrasting serene landscape with chaotic scene below"
  },

  "mood": "GTA VI mission gone wrong comedy, beautiful winter chaos, two freezing idiots in summer clothes stranded in wilderness, fake calm masking panic, stunning environment contrasting with dumb situation, Rockstar dark humor energy",

  "color_palette": [
    "pristine white snow",
    "crisp winter blue sky",
    "cream/beige jersey with red trim",
    "red bandana",
    "black tank top and durag",
    "gold chain catching cold light",
    "silver-white damaged jet metal",
    "brown broken cargo boxes",
    "colorful designer clothes scattered on snow",
    "bare brown tree branches",
    "grey weathered wooden hut"
  ],

  "technical": {
    "render_type": "GTA VI digital game-render screenshot",
    "resolution": "High resolution, 4K quality",
    "aspect_ratio": "16:9",
    "post_processing": [
      "Subtle film grain for game screenshot feel",
      "Soft vignette",
      "Color grading for cold winter tones",
      "RAGE engine bloom on snow and metal surfaces",
      "Stylized GTA VI atmosphere rendering"
    ]
  },

  "critical_game_style": {
    "NOT_allowed": "Photorealistic rendering, real film look, realistic skin pores, ray-traced realism, movie lighting, real photography",
    "REQUIRED": "RAGE engine graphics, GTA VI NPC models, stylized video game skin shaders, game lighting with bloom, Rockstar promotional screenshot quality, video game fabric textures, visible breath vapor"
  },

  "reference_notes": "Based on GTA VI trailer aesthetic, winter wilderness environment, comedy crash aftermath scene, two NPCs dressed completely wrong for the weather, scattered luxury goods creating visual contrast against pristine snow"
}

```

### Dlaczego zadziałał
- `"GTA VI gameplay screenshot"` w pierwszej linii, ustawia kontekst
- `"RAGE engine graphics"`, magic words
- `"stylized video game realism (not photorealistic)"`, blokuje hyperrealizm
- Każdy NPC ma osobny blok z description + pose + expression
- `critical_game_style` ma NOT_allowed i REQUIRED, jasne granice

## Video Generation (Veo 3.1)
**Dlaczego JSON?**
Prosty tekst działa. Do momentu gdy przestaje.
Testowałem 50+ shotów. Wzorzec:
- Proste sceny → tekst wystarczy
- Złożone sceny → tekst się sypie
JSON nie.
Veo czyta strukturę inaczej niż prozę. Nie zgaduje. Każdy element ma miejsce.

### Core JSON Template
```json
{
  "prompt": "[Główny opis sceny - CO się dzieje]",

  "style": "[Styl wizualny + czego UNIKAĆ]",

  "camera_movement": "[STATIC lub konkretny ruch]",

  "lighting": "[Źródła światła, mood]",

  "duration": "10 seconds",

  "aspect_ratio": "16:9",

  "mood": "[Emocja, energia sceny]",

  "additional_parameters (optional)": {

    "timeline": {
      "0-2.5s": "[Pierwsza akcja]",
      "2.5-5s": "[Druga akcja]",
      "5-7.5s": "[Trzecia akcja]",
      "7.5-10s": "[Końcowa akcja]"
    },

    "character": {
      "face": "[Wyraz twarzy - NEUTRAL]",
      "hair": "[Styl + typ PHYSICS]",
      "outfit": "[Dokładny opis]"
    },

    "gta_physics": {
      "cloth": "[GTA V style - nie realistic]",
      "hair": "[Chunky sections]"
    },

    "movement": {
      "CRITICAL": "[Co MUSI się wydarzyć lub NIE]",
      "allowed": "[Dozwolone]",
      "forbidden": "[Zakazane]"
    },

    "critical_style": {
      "NOT": "[Czego unikać]",
      "REQUIRED": "[Co wymagane]"
    }
  }
}

```

### Prompt Character Girl Taking selfie
to zdjęcie poniżej to “first frame” klatka wideo (korzystam z tej metody dla 99% wideo) 
![First frame klatka, trzy dziewczyny robią selfie w stylu GTA VI Photo Mode](/posts/gta-vi-styl/selfie-girls.png)
```json
{
  "prompt": "Grand Theft Auto VI in-engine Photo Mode scene. Three GTA VI female NPC models taking group selfie at upscale gallery party. RIGHT GIRL holds colorful sticker-bomb phone taking selfie - dark purple-tinted hair, coin headband, pink bandage on cheek, white top with brown plaid ruffle collar, beaded bracelets, decorated nails, main character energy. CENTER GIRL in white hoodie with black tentacle stripes hood up, wet platinum blonde hair, freckles, effortlessly cool chill expression. LEFT GIRL platinum blonde straight bangs, navy checker cropped sweater, fingerless gloves, moody but present resting face. All three subtly shifting poses finding perfect angles - micro-adjustments, model confidence, zero cringe pure class. At 2.5 SECONDS GTA VI TARGETING SCAN activates on CENTER GIRL - thin crosshair outline, FAST scan line ZIPS head to toe in half second, UI glow traces striped hoodie, locks briefly then fades. Girls continue posing unbothered - scan is visual layer only. At 6.5 SECONDS RIGHT GIRL takes shot - subtle shutter sound, GTA VI UI popup appears: PHOTO SAVED with small thumbnail icon, fades after 1 second. Terracotta red walls, gold baroque trim, crystal chandeliers with string lights and game bloom, classical sculptures on pedestals, party guests in background. VIDEO GAME FOOTAGE NOT FILM.",
  "style": "Grand Theft Auto VI gameplay footage NOT real film NOT photorealistic. RAGE engine graphics throughout. GTA VI NPC character models with stylized video game skin shaders and hair rendering. GTA VI Photo Mode aesthetic with native UI elements. Video game interior RAGE engine textures. Rockstar promotional quality. NO realistic cinematography - VIDEO GAME footage only.",
  "camera_movement": "STATIC medium shot. LOCKED FRAME. CAMERA DOES NOT MOVE. NO ZOOM NO PUSH NO DRIFT. Fixed third-person angle facing three girls. All movement comes from characters finding angles within frame. Camera perfectly still entire 8 seconds.",
  "lighting": "GTA VI RAGE engine interior lighting. Warm coral pink ambient from terracotta walls. Crystal chandeliers with string lights creating soft game bloom effect. Mixed warm gold and cool accent lighting from deeper room. At 2.5 SEC quick glow sweep during scan on center girl. At 6.5 SEC subtle flash pulse when photo taken. Stylized video game light rendering throughout.",
  "duration": "8 seconds",
  "aspect_ratio": "16:9",
  "mood": "Squad selfie vibes, model confidence finding angles, feeling themselves in their fits, unbothered cool energy, satisfying scan moment, clean photo save payoff",
  "additional_parameters": {
    "motion_intensity": "Subtle - micro-adjustments only, model-tier precision movements, no exaggerated poses",
    "color_palette": [
      "terracotta coral red",
      "gold baroque trim",
      "white marble floor",
      "platinum blonde hair",
      "navy checker pattern",
      "black tentacle stripes on white",
      "purple hair tint",
      "pink bandage accent",
      "colorful sticker-bomb phone",
      "warm amber chandeliers",
      "cool party accents"
    ],
    "character_action_timeline": {
      "0.0-2.0s": "Three girls vibing, subtle shifts finding angles - RIGHT adjusts phone framing, CENTER slight head tilt, LEFT shifts weight",
      "2.0-2.5s": "Continue posing - scan activates on CENTER GIRL unnoticed by characters",
      "2.5-3.0s": "FAST scan ZIPS head to toe on CENTER, UI glow traces hoodie stripes, locks then fades",
      "3.0-6.0s": "Girls continue finding angles unbothered - RIGHT checks screen, CENTER micro-adjusts hood, LEFT subtle pose shift, pure class energy",
      "6.0-6.5s": "RIGHT GIRL takes the shot - subtle shutter click",
      "6.5-7.5s": "GTA UI popup: PHOTO SAVED with thumbnail, girls hold winning pose",
      "7.5-8.0s": "UI fades, squad energy sustained, satisfied moment"
    },
    "ui_elements": {
      "targeting_scan": {
        "target": "CENTER GIRL ONLY",
        "trigger_time": "2.5 SECONDS",
        "crosshair": "Thin outline around center girl silhouette",
        "scan_line": "FAST horizontal zip DOWN head to toe - 0.5 seconds",
        "glow_trace": "Quick UI glow traces tentacle stripe hoodie pattern",
        "fade": "Locks briefly, fades by 3 sec",
        "color": "Subtle white soft glow",
        "sound": "Quick scan chirp"
      },
      "photo_save": {
        "trigger_time": "6.5 SECONDS",
        "text": "PHOTO SAVED",
        "style": "GTA VI native UI font, white text, small thumbnail preview",
        "position": "Lower right or center screen",
        "duration": "Visible for 1 second then fades",
        "sound": "Shutter click + subtle UI confirmation blip"
      },
      "photo_mode_hud": {
        "position": "Bottom right corner",
        "text": "Photo Mode ⊗ | Options ☰ | Back ⓐ",
        "style": "Subtle white GTA UI font, persistent throughout"
      }
    },
    "character_rendering": {
      "all_models": "GTA VI female NPCs with stylized video game skin shaders NOT realistic",
      "right_girl": {
        "role": "Phone holder, main character energy, takes the shot",
        "hair": "Dark with purple/burgundy tint",
        "headwear": "Coin/braided headband",
        "face": "Pink bandage on left cheek, confident expression",
        "outfit": "White top with brown plaid ruffle collar, pink sleeve accent",
        "accessories": "Colorful beaded bracelets, decorated pink nails",
        "phone": "Colorful cartoon sticker-bomb case, arm extended",
        "movement": "Adjusting phone angle, checking framing, takes shot at 6.5s"
      },
      "center_girl": {
        "role": "SCAN TARGET, chill vibing energy, unbothered by scan",
        "hair": "Platinum blonde wet/slicked under hood",
        "face": "Freckles across nose and cheeks, relaxed expression",
        "outfit": "White hoodie with black tentacle stripe pattern, hood up",
        "movement": "Subtle head tilts, micro-adjustments, effortlessly finding angles"
      },
      "left_girl": {
        "role": "Moody but present, doing her own thing",
        "hair": "Platinum blonde, straight bangs, shoulder-length",
        "outfit": "Navy blue white checker cropped sweater, fingerless gloves, black belt, jean shorts",
        "expression": "Resting face, slightly moody but in the moment",
        "movement": "Subtle weight shifts, knows her angles, model confidence"
      }
    },
    "environment_rendering": {
      "walls": "Terracotta coral red with gold baroque trim and moldings",
      "ceiling": "Crystal chandeliers with string lights, game bloom",
      "floor": "White marble",
      "props": "Classical sculptures on white pedestals",
      "background": "Party guests mingling softly out of focus",
      "atmosphere": "Upscale gallery party vibes"
    },
    "critical_game_style": {
      "NOT_allowed": "Photorealistic rendering, real film look, cinema camera, realistic skin pores, camera movement, zoom, realistic fabric physics",
      "REQUIRED": "RAGE engine graphics, GTA VI NPC models, stylized game textures, FAST targeting scan, STATIC locked camera, Photo Mode UI elements, PHOTO SAVED popup"
    },
    "sfx": {
      "ambient": "Gallery party chatter murmur, distant muffled bass",
      "actions": "Subtle fabric rustle, jewelry jingle from bracelets",
      "scan": "Quick digital CHIRP at 2.5 sec",
      "shutter": "Camera shutter click at 6.5 sec",
      "ui_confirm": "Subtle blip when PHOTO SAVED appears",
      "music": "Lo-fi chill party beat, upbeat but relaxed"
    }
  }
}
```

### Pattern
Każdy prompt ma:
1. **Explicit GTA V/VI reference**, Veo wie jaki styl
1. **"NOT realistic"**, blokuje photorealistic
1. **Movement rules 3-4x**, redundancja = pewność
1. **Timeline z konkretami**, żadnego "jakiegoś ruchu"
1. **Physics defined**, cloth, hair, fire spelled out

## Cheat sheet
### Magic Words (używaj zawsze)
```plain text
RAGE engine graphics
GTA VI NPC character model
stylized video game skin shaders
GTA V/VI STYLIZED physics - NOT realistic
VIDEO GAME FOOTAGE NOT FILM
Rockstar promotional quality

```

### Kill Words (blokuj zawsze)
```plain text
NOT photorealistic
NOT real film
NOT realistic physics
NOT loading screen art
NOT illustrated
NOT cell-shaded
NO exaggerated expressions
NO cartoonish faces

```

### Expression Control
Zapobiega weird face morphing:
```json
"facial_animation_rules": {
  "all_characters": "NEUTRAL AND SUBTLE - standard GTA VI NPC expressions",
  "prohibited": "NO wide eyes, NO stretching mouth, NO head expanding, NO exaggerated emotion"
}

```

### GTA Physics
Game engine, nie realistic:
```json
"gta_game_physics": {
  "type": "GTA V / GTA VI STYLIZED - NOT realistic",
  "cloth": "Video game cloth physics - slightly stiff, game engine movement",
  "hair": "GTA style hair - moves as chunks not individual strands",
  "body": "GTA VI idle animation loops, video game weight distribution"
}

```

### Style Lock
```json
"critical_game_style": {
  "NOT_allowed": "Photorealistic, real film, realistic physics, exaggerated expressions, cartoonish faces",
  "REQUIRED": "RAGE engine graphics, GTA VI NPC models, stylized shaders, game engine physics, neutral expressions"
}

```

## Contact
Created by **Luki Zip**
Moja misja to tworzyć to the fullest, a najbliższa to pokazywać, że AI video może być cool.
