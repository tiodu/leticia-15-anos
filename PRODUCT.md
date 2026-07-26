# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Guests invited to Letícia's 15th birthday party, in two groups:

- **Letícia's friends (teens).** Modern phones, high tolerance for motion and expressive visuals.
- **Adult social circle** — parents' friends and family. Formal register expected, moderate tech comfort.

All users are Brazilian, read pt-BR, and arrive by tapping a link shared in WhatsApp. Mobile is the real
device; desktop is a secondary case. The guest's job is to learn when and where the party is and confirm
they are coming — usually in a single sitting, one-handed, immediately after receiving the link.

## Product Purpose

A digital invitation for Letícia's XV anos (debutante) party on 26 September 2026. It replaces a static
invitation image previously shared over WhatsApp. Success is a guest who understands the date, time,
venue, and dress code, and then confirms presence — the confirmation tap is the single conversion event.

## Positioning

A shared image cannot hold a live countdown, a tappable route to the venue, or a one-tap confirmation
that opens WhatsApp with the message already written. The page keeps the invitation's visual identity
while making every detail actionable rather than something the guest must transcribe.

## Operating Context

- Opened from a WhatsApp link on a phone, frequently on mobile data rather than Wi-Fi.
- Read once, acted on once. Guests are unlikely to return, so the first viewport carries the invitation.
- Confirmation leaves the site: the RSVP button hands off to WhatsApp at +55 11 99538-3027, where the
  host tallies guests manually. There is no attendee list inside the product.
- Route lookup also leaves the site, to Google Maps.

## Capabilities and Constraints

- Static site: HTML, CSS, and vanilla JS with no build step and no backend. Deployed on the owner's Vercel.
- **No audio.** The owner explicitly ruled out music or any sound.
- No RSVP storage, no guest database, no admin view. WhatsApp is the system of record.
- **Link-only distribution.** The page names a minor alongside a date and a physical address, so it must
  not be indexed by search engines.
- New imagery is scarce: the owner has no paid image-generation account, so assets must be reused,
  transformed in CSS, or drawn in code rather than newly generated.
- A video introduction is planned but not built. It will be produced outside this repo and added later as
  a gate ahead of the current first viewport. Undecided: its length, format, and whether it is skippable.
- Undecided: whether an RSVP deadline exists. Today there is none and confirmations arrive over WhatsApp
  with no cutoff.

## Brand Commitments

- The name is rendered **Letícia**, the occasion **XV anos**.
- The original invitation image is the binding visual reference: deep navy satin, silver filigree
  butterflies, a script name over spaced small-caps supporting type. This identity is inherited, not
  open for reinvention.
- **Butterflies are the motif** and carry through the whole product.
- Voice is warm, first-person from Letícia, and sincere rather than playful — the closing signature and
  the RSVP line speak as her.
- Reference the owner shared as a directional example of the format: `bruna15anos-eiq.pages.dev`.

## Evidence on Hand

- `assets/butterflies/borboleta-prata.png` — silver filigree butterfly, 200×200, transparent.
- `assets/butterflies/borboleta-azul.png` — blue morpho butterfly, 360×360, transparent.
- Confirmed party facts: 26/09/2026, 20:00; Espaço Mariah, Rua Dr. Mariano Jatathy Marcondes Ferraz 252,
  Centro, Osasco; traje esporte fino; RSVP to +55 11 99538-3027; venue map at `maps.app.goo.gl/5TCp8JBF74yCaeKz9`.
- The original invitation image exists but is **not committed to this repo** — it was shared in
  conversation only. Future work must not assume it is available on disk.
- There are no photographs of Letícia, no venue photography, and no other party assets. Do not fabricate
  them or design layouts that depend on imagery that does not exist.

## Product Principles

1. **The invitation is the product.** A guest who only sees the first viewport should still know whose
   party it is and feel invited.
2. **Every fact is actionable.** Address opens a route, confirmation opens a conversation. Nothing on the
   page should need to be copied by hand.
3. **Inherit the identity, do not restate it.** The satin-and-silver butterfly world is given; work
   deepens its craft rather than proposing a new look.
4. **Phone first, and on real connections.** Weight, motion, and asset budget are judged on a mid-range
   phone over mobile data, not on a desktop preview.
5. **Discretion by default.** A minor's name, date, and location travel only through the shared link.

## Accessibility & Inclusion

No formal standard was established for this project. Product-specific needs that do apply: the adult
guest segment makes comfortable type sizes and contrast a floor rather than a preference, and motion must
remain optional — `prefers-reduced-motion` is honored throughout.
