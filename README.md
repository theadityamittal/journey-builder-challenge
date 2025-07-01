# Journey Builder React Coding Challenge

A React + TypeScript application that fetches a journey’s form blueprint, displays forms in a list, and provides a flexible UI for mapping form fields to sources (direct parents, transitive parents, or global data).

---

## 🚀 Project Overview

This challenge implements a form prefill mapping UI based on a directed acyclic graph (DAG) of forms. Key features:

* **Fetch & display forms**: Retrieves the blueprint from a mock server and lists forms as responsive cards.
* **Prefill Mapping**: Click a form to view its fields and add/edit/clear mappings via a modal.
* **Data sources**:

  1. **Direct parent form fields**
  2. **Transitive parent form fields**
  3. **Global data** (mocked values)

Code is organized for easy extension, allowing new data-source adapters or UI panels to be added with minimal changes.

### Submission Video Link
YouTube: https://youtu.be/_2QJB1_yfYY?si=ps9zxrnEm2Gj02RM

---

## 🔧 Prerequisites

* **Node.js** v16 or higher
* **npm** (bundled with Node.js)

---

## 🏗️ Setup & Run Mock API

```bash
# Clone mock server
git clone https://github.com/mosaic-avantos/frontendchallengeserver mock-server
cd mock-server
npm install
npm start   # launches at http://localhost:3000
```

---

## 💻 Install & Run the App

From the project root:

```bash
npm install
npm run dev   # starts Vite dev server
```

Visit `http://localhost:3000` in your browser.

---

## 🧪 Testing & Coverage

```bash
npm test             # run unit tests
npm run test:coverage  # generate coverage report (coverage/lcov-report)
```

> Coverage thresholds are enforced at 70%+ for statements, branches, functions, and lines.

---

## 📈 CI Status

![CI](https://github.com/theadityamittal/journey-builder-challenge/actions/workflows/ci.yml/badge.svg)

This badge indicates passing tests and coverage on every push/PR via GitHub Actions.

---

## 🏛️ Architecture & Extensibility

```
src/
├── api/              # HTTP client & blueprint fetch logic
├── components/       # Reusable UI components (NodeList, EdgeList, PrefillMapping, Modal)
├── types/            # Shared TypeScript interfaces
└── App.tsx           # Application entry and composition
```

* **Data-source adapters** live in the PrefillMapping component; to add a new source, create a new section and pass its data as props.
* **CSS modules** ensure scoped styles without collisions.
* **Tests** cover components in `src/components/__tests__` using Jest and React Testing Library.

---

## ✍️ Submission

Use the following cURL command, replacing placeholders with your details:

```bash
TOKEN="fbmd_yourtokenhere"
REPO="https://github.com/your-handle/journey-builder-challenge"
VIDEO="https://youtu.be/your-video-id"

curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "repoLink":"'$REPO'",
    "recordingLink":"'$VIDEO'"
  }' \
  https://makefizz.buzz/api/challenges/cmbmgaa4n0001kd7yuf4ohhlw/submissions
```

Submit within **4 business days** of starting the challenge to ensure your solution is reviewed.

---

Good luck, and thanks for reviewing!
