# Market Lens

Market Lens is a fintech AI suite that combines a browser-based stock analysis experience with a multi-agent research backend and a separate web dashboard frontend.[1]

The repository is organized around three major products:

- A **Chrome/Chromium extension** that detects supported stock pages, extracts context from the page, and surfaces analysis for the company or ticker currently being viewed.[1]
- A **Python backend** that appears to orchestrate multiple agents for ingestion, analysis, decision-making, and output generation.[1]
- A **frontend web app** built as a Vite application and described in its current README as a “Stock Market Analysis App,” based on an original Figma design.[1]

## Repository overview

```text
market-lens/
├── backend/
├── extension/
└── frontend/
```

This separation suggests a modular architecture where the browser extension and the web dashboard act as different client surfaces, while the backend handles the heavier reasoning and financial analysis workflow.[1]

## Features

### 1. Browser-based stock analysis

The extension is described as a Stock Analyzer that detects stock pages and scrapes context from them, which makes it suitable for in-browser company research workflows.[1]

Likely responsibilities include:

- Detecting supported finance or stock-information pages.[1]
- Extracting the ticker, company name, and relevant page context from the DOM.[1]
- Sending structured data to a backend analysis service.[1]
- Rendering a concise AI-assisted analysis result back in the extension UI.[1]

### 2. Portfolio risk research

The repository description also states that Market Lens includes a Portfolio Risk Manager that scores and explains portfolio risk using fundamental and news context.[1]

That suggests the platform is designed not only for single-stock page analysis but also for broader portfolio-level reasoning, potentially including:

- Risk scoring.[1]
- Narrative explanations of risk drivers.[1]
- Use of fundamentals and market/news context in the final output.[1]

### 3. Multi-agent analysis pipeline

The backend agent structure indicates a staged pipeline rather than a single monolithic script.[1]

Visible agent files suggest the following workflow:

- `ingest_agent.py` for normalizing raw input.[1]
- `analyst_agent.py` for evaluating the structured data.[1]
- `decision_agent.py` for converting evidence into a score, stance, or recommendation layer.[1]
- `output_agent.py` for formatting final results for downstream consumers.[1]
- `agent_main.py` for wiring the agent sequence together.[1]

## Architecture

## High-level flow

```text
User / Analyst
   │
   ├── Frontend dashboard (frontend/)
   │
   ├── Chrome extension (extension/)
   │        │
   │        └── Scraped stock page context / ticker
   │
   └──────────────► Backend coordinator + agents (backend/)
                           │
                           ├── Ingest
                           ├── Analyze
                           ├── Decide
                           └── Format output
                                   │
                                   └── Results returned to UI / saved to outputs
```

The architecture appears to use different interfaces for different user journeys while keeping the analysis engine centralized in the backend.[1]

## Component breakdown

### `extension/`

The extension folder includes `manifest.json`, `src/`, `index.html`, `vite.config.js`, `package.json`, `package-lock.json`, `dist/`, and `node_modules/`, indicating a JavaScript-based extension project bundled with Vite.[1]

Based on that structure, the extension likely uses:

- Chrome Extension APIs through Manifest V3 configuration.[1]
- Content scripts for stock-page detection and DOM extraction.[1]
- A popup or embedded UI built with a modern frontend stack.[1]
- A build step that outputs a loadable extension bundle in `dist/`.[1]

### `backend/`

The backend folder includes `coordinator.py`, `agents/`, `configs/`, `outputs/`, and `requirements.txt`, which points to a Python orchestration layer for multi-step analysis.[1]

The structure does not visibly expose a standard API server entrypoint such as `app.py` or `main.py` at the top level, so the backend may currently be arranged as a script-oriented or orchestration-first system that can later be wrapped in an API layer if needed.[1]

### `backend/agents/`

The agents folder includes `ingest_agent.py`, `analyst_agent.py`, `decision_agent.py`, `output_agent.py`, `agent_main.py`, and a shared `core/` folder.[1]

This suggests clear responsibility boundaries:

| File | Purpose |
|---|---|
| `ingest_agent.py` | Standardize raw ticker, portfolio, page, or research inputs.[1] |
| `analyst_agent.py` | Perform financial or contextual analysis over normalized data.[1] |
| `decision_agent.py` | Turn analysis into a final score, stance, or risk judgment.[1] |
| `output_agent.py` | Shape the result for reports, UI rendering, or serialized output.[1] |
| `agent_main.py` | Execute and connect the staged pipeline.[1] |
| `core/` | Shared primitives such as clients, schemas, utilities, or prompt helpers.[1] |

### `frontend/`

The frontend folder contains `src/`, `index.html`, `package.json`, `postcss.config.mjs`, and `vite.config.ts`, and its included README describes it as a code bundle for a Stock Market Analysis App based on a Figma design.[1]

That implies:

- A standalone web application separate from the browser extension.[1]
- Vite-powered local development and build tooling.[1]
- PostCSS-based styling configuration, potentially for utility CSS or modern CSS transforms.[1]
- A UI intended for a dashboard or richer analysis surface beyond the extension popup.[1]

## Tech stack

The current visible structure points to the following likely stack components:[1]

| Layer | Likely technologies |
|---|---|
| Extension | Chrome Extension APIs, JavaScript, Vite, npm.[1] |
| Backend | Python, agent orchestration scripts, pip dependencies via `requirements.txt`.[1] |
| Frontend | Vite, TypeScript-based config, PostCSS, npm.[1] |

The exact frameworks and external providers should be confirmed by inspecting `package.json` files, `requirements.txt`, and the source code in each `src/` or `agents/` directory.[1]

## Suggested local setup

Because the repository is split into separate projects, local setup is easiest when handled per folder.[1]

### Prerequisites

- Node.js and npm for `frontend/` and `extension/`.[1]
- Python 3.x and `pip` for `backend/`.[1]
- A Chromium-based browser for loading the unpacked extension.[1]

### Frontend

The frontend’s existing README explicitly states the following steps:[1]

```bash
cd frontend
npm i
npm run dev
```

### Extension

A reasonable development flow for the extension is:[1]

```bash
cd extension
npm install
npm run dev
# or build the extension bundle
npm run build
```

After building, load the unpacked extension from the generated `dist/` directory in Chrome’s extensions page.[1]

### Backend

A conventional Python setup would look like this:[1]

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # macOS/Linux
# .venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

The exact run command depends on how `coordinator.py` or `agents/agent_main.py` is intended to be invoked in this repository.[1]

## Environment and configuration

The visible folder structure suggests that configuration is probably centralized under `backend/configs/` and package-specific files such as `manifest.json`, `vite.config.js`, and `vite.config.ts`.[1]

A production-ready deployment would typically need:

- API keys for financial data providers.[1]
- API keys or credentials for any LLM or AI orchestration layer.[1]
- Allowed origins and networking configuration between frontend, extension, and backend.[1]
- Browser extension permissions configured in the extension manifest.[1]

## Example use cases

### Researching a single stock from the browser

1. Open a supported stock or financial information page.[1]
2. Let the extension detect the page and extract context.[1]
3. Submit the data to the backend analysis pipeline.[1]
4. Receive a summarized AI-assisted company analysis.[1]

### Evaluating portfolio risk

1. Provide a set of holdings or portfolio context through the app or backend flow.[1]
2. Trigger the backend coordinator and agents.[1]
3. Aggregate fundamentals and news-informed reasoning.[1]
4. Return a risk score and an explanation of the major drivers.[1]

## Roadmap ideas

Based on the current repository organization, useful next improvements could include:[1]

- Add a root-level README with architecture diagrams and setup steps for all three subprojects.[1]
- Add a formal API layer, such as FastAPI or Flask, to expose the backend cleanly to the frontend and extension.[1]
- Add `.env.example` files for each relevant subproject.[1]
- Document supported stock websites for the extension.[1]
- Add example payloads and response formats for backend analysis results.[1]
- Add tests for agent flow, parsing, and frontend/extension integration paths.[1]

## Current known source details

The frontend README currently says the frontend is a code bundle for “Stock Market Analysis App” and points to its original Figma design, while the repository listing shows the top-level project folders `backend/`, `extension/`, and `frontend/` and the backend agents listed above.[1]

## Disclaimer

This README is based on the repository structure and the visible folder/file listings currently available from GitHub, rather than a full line-by-line audit of every source file.[1]

For a production README, the next step should be validating the exact commands, dependencies, external APIs, and supported workflows by opening the following files directly:

- `frontend/package.json`
- `extension/package.json`
- `extension/manifest.json`
- `backend/requirements.txt`
- `backend/coordinator.py`
- `backend/agents/*.py`
