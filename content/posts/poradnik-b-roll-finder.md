---
title: "B-Roll Finder"
order: 3
tag: "poradnik"
description: "AI skill do Claude Code. Dajesz skrypt, dostajesz gotowy b-roll z taste scoringiem i timestampami."
problem: "Spędzasz godziny na YouTube szukając b-rolla. AI skill robi to za Ciebie w 5 minut."
dlaKogo: "Twórcy video, którzy nagrywają reelsy z b-rollem i tracą czas na ręczne wyszukiwanie klipów."
tools: ["broll-curator.skill"]
---

AI skill do Claude Code. Dajesz skrypt, dostajesz gotowy b-roll.

## Co robi

Analizuje twój skrypt scene po scenie, szuka klipów na YouTube i X, ocenia każdy pod kątem taste (czy to coś świeżego, czy ten sam klip co wszyscy), daje timestamp guide i ściąga wszystko do zorganizowanych folderów.

## Taste scoring

Każdy klip dostaje ocenę na bazie views i wielkości kanału:

- 🟢 **tasteful**: <500K views, mały kanał, nie stock. Gold.
- 🟡 **safe**: 500K-2M views. Można użyć, nie jest unikatowy.
- 🔴 **generic**: >5M views albo stock aggregator. Auto-filtrowany.

## Jak działa

1. Dajesz skrypt (paste albo plik)
2. AI rozbija na sceny z typem i energią
3. Szuka na YouTube, X, stock (ostateczność)
4. Taste scoring filtruje śmieci
5. Wybiera 8-15 najlepszych klipów
6. Timestamp guide (która sekunda wyciągnąć)
7. Ściąga i organizuje w foldery

## Instalacja

Wrzuć folder `broll-curator/` do `.claude/skills/` w swoim projekcie i napisz:

```
b-roll for [twoj skrypt]
```

## Pobierz

- 📦 [broll-curator.skill](https://drive.google.com/drive/folders/1SEsw-9rGLvv2sL64h0Gfc7eWtjMx0p3s?usp=sharing), zip, rozpakuj do `.claude/skills/`
