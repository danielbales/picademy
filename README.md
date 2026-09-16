# Picademy

A photography critique app with animal judge characters. Upload a phone photo and get scored on composition, light, technical quality, and editing - with personality-driven feedback from a panel of animal critics.

## The Cast

- **Curren** (lion) - judges light quality with regal authority
- **Harper** (cheetah) - obsesses over composition and framing
- **Kai** (octopus) - catches every technical and editing flaw
- **Guest judges** rotate each round: Mom (bear), Gramps (tortoise), Blitz (hummingbird), Professor (owl), Reef (crab)
- **Lida** (chameleon) - the host, provides photo-type tips

## Stack

- **Frontend**: React + Vite, deployed to Cloudflare Pages
- **API**: Cloudflare Worker proxying Gemini for AI-powered critiques
- **Scoring**: 1-10 per skill, letter grades (A+ through F), trophy tiers

## Development

```
npm install
npm run dev
```

## Deploy

```
npm run build
npx wrangler pages deploy dist --project-name the-crit --commit-dirty=true
```
