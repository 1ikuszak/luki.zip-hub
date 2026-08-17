---
title: "5 pluginów do Claude Code, które koniecznie musisz zainstalować"
date: "2026-08-17"
order: -7
tag: "poradnik"
description: "Pięć wtyczek, bez których nie odpalam Claude Code: darmowe tokeny, pamięć między sesjami, książki zamienione w skille, oficjalny audyt bazy od Anthropica i skill, który uczy się twojego stylu. Linki i jeden prompt do instalacji."
---

Nie odpalaj Claude Code, dopóki nie masz tych pięciu wtyczek. Działają też w Codexie (ChatGPT).

Instalacja jest prostsza, niż myślisz. Kopiujesz link do repo, wklejasz swojemu Claude'owi i piszesz mniej więcej to:

```
Siema, chcę zacząć używać tego: [LINK DO REPO].
Zainstaluj mi to tak, żeby wszystko działało u mnie,
i powiedz, jak najlepiej tego używać.
```

I tyle. Nic więcej nie musisz robić, możesz zaczynać korzystać.

Takie rzeczy wrzucam najpierw na newsletter. Jeśli podoba ci się ten content i chcesz więcej praktycznych rzeczy, [zapisz się tutaj](https://www.lukaszglica.com). A ja już nie przedłużam. Poniżej pięć wtyczek.

---

## 1. OmniRoute

![OmniRoute](/posts/top-5-pluginow-claude-code/omniroute.png)

Podpinasz do niego darmowych dostawców API (jest ich ponad 200), więc w momencie, gdy kończy ci się limit, sam przełącza cię na kolejny najlepszy model. Do 1,6 mld darmowych tokenów możesz lecieć całkowicie za darmo. Działa z Claude Code, Codexem, Cursorem i OpenCode.

Repo: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)

---

## 2. Claude-Mem

![Claude-Mem](/posts/top-5-pluginow-claude-code/claude-mem.png)

Daje twojemu Claude'owi pamięć. Model pamięta twoje projekty, kliki, tematy i nie musisz mu tłumaczyć wszystkiego od nowa, gdy zaczynasz nową sesję. Wszystko dzieje się w tle, nic nie klikasz.

Repo: [github.com/thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)

```
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

---

## 3. Book-to-Skill

![Book-to-Skill](/posts/top-5-pluginow-claude-code/book-to-skill.png)

Wrzucasz dowolną książkę w jakimkolwiek formacie (PDF, EPUB, DOCX, Markdown), a skill przetwarza ją w konkretne instrukcje: frameworki, reguły decyzyjne, anty-wzorce, po jednym pliku na rozdział. Możesz zaaplikować książkę w swoje codzienne działania, czy to w biznesie, czy w życiu prywatnym, bez wrzucania 200 stron do kontekstu.

Repo: [github.com/virgiliojr94/book-to-skill](https://github.com/virgiliojr94/book-to-skill)

---

## 4. Claude Code Setup

![Claude Code Setup](/posts/top-5-pluginow-claude-code/claude-code-setup.png)

Oficjalny plugin Anthropica. Skanuje całą twoją bazę i sam podpowiada, które hooki, skille i agenci pasują do tego projektu, a które to po prostu śmiecik, który spowalnia twój setup.

Repo: [github.com/anthropics/claude-plugins-official (plugins/claude-code-setup)](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-code-setup)

```
/plugin install claude-code-setup@claude-plugins-official
```

---

## 5. Task Observer

![Task Observer](/posts/top-5-pluginow-claude-code/task-observer.png)

Patrzy na co dzień, jak korzystasz z AI, i analizuje twój styl. Łapie twoje korekty i preferencje, a potem poprawia skille i automatyzacje, żeby jeszcze bardziej optymalizować twoją pracę. Poprawia też sam siebie.

Repo: [github.com/rebelytics/one-skill-to-rule-them-all](https://github.com/rebelytics/one-skill-to-rule-them-all)

---

To wszystko. Pięć linków, jeden prompt i masz setup, na którym sam pracuję codziennie.

Co tydzień wysyłam ci jeden mail: konkretny system albo narzędzie, które u mnie działa, tak żebyś od razu mógł to zapiąć u siebie.

Dołączasz do 500+ osób, które rozwijają swój biznes przy pomocy AI. [Zapisz się tutaj](https://www.lukaszglica.com).
