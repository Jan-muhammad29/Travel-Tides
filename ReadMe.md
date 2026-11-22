# Trail & Tide



- GitHub repository: `https://github.com/Jan-muhammad29/Travel-Tides.git`
- Vercel deployment: `https://travel-tides-fayyaz10.vercel.app/`

Trail & Tide is a fictional day-trip booking frontend for university students and young professionals in Islamabad. Browse 12 experiences, filter and sort departures, and build a plan before completing a simulated booking.

## Run locally

Use Node.js 22.12 or later. From the folder containing `package.json`, run:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Test and build

```bash
node --test
npm run build
npm run preview
```

The booking-rule tests cover attendee limits, age eligibility, pricing, and unavailable experiences. The production build is written to `dist/`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Browse, search, filter, and sort experiences |
| `/experiences/:id` | View departure details and add an experience to the plan |
| `/plan` | Adjust quantities, enter booking details, and review the total |
| `/confirmation` | View the simulated booking confirmation |

The plan and confirmation reset on a full page reload. The About and Demo links currently lead to the fallback page.

## Booking rules

- Each experience allows one to six attendees, subject to its remaining capacity.
- The youngest attendee must meet the highest minimum age across the selected experiences.
- The experience subtotal must reach PKR 1,500 before transfer fees. Meeting at the departure location is free. The optional F-6 transfer costs PKR 600 once per plan.
- The booking is a simulation with no payment, email confirmation, or live inventory.

## Deploy on Vercel

Import the GitHub repository into Vercel and select the Vite preset. Use `npm run build` as# Trail & Tide — React Business Website


A fictional day-trip booking frontend for university students and young professionals in Islamabad. Users can browse experiences, combine search and filters, inspect departure details, build a saved plan, correct booking-form errors, review calculated charges, and complete a clearly labelled **simulated booking**.





## Business profile

| Element | Definition |
|---|---|
| Offering | Twelve fictional guided experiences: hiking, water outings, heritage walks, creative sessions, and nature walks |
| Primary audience | University students and young professionals seeking short local experiences |
| Operating area | Islamabad and nearby destinations, including Khanpur, Taxila, and Galiyat |
| Main customer task | Discover a suitable departure, select attendees, provide details, review the total, and reach confirmation |
| Business goal | Support a complete, understandable booking journey with clear suitability, availability, and charges |

The reference dataset uses fixed demonstration departures in December 2026. If you change the dates or business rules, update the related UI text, tests, and report as well.

## Technology

- React function components and JavaScript modules.
- Vite for local development and production builds.
- `react-router-dom` for navigation and parameterized routes.
- Lucide icons and original SVG landscape illustrations.
- Authored CSS with responsive layouts and visible keyboard focus.
- Local data, an asynchronous mock loader, and browser local storage.
- Node.js built-in test runner: `node:test` and `node:assert/strict`.

Use `package.json` and `package-lock.json` as the authority for the dependency versions in your current checkout. The application is a frontend simulation; no database or application backend is required for the documented implementation.

## Installation and local development

Use Node.js **22.12+ or a compatible newer version**. Node 24 was used for the original build checks. Install Git if you will clone or publish the repository.

1. Clone your actual repository or extract the source ZIP.
2. Open the folder containing `package.json` in VS Code.
3. Open **Terminal → New Terminal**.
4. Run:

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. Keep the terminal running while developing. Do not double-click `index.html` or use plain HTML Live Server to run this Vite application.

`npm ci` requires the committed lockfile and installs its locked dependency tree. For an intentionally new project without a lockfile, run `npm install` first and commit the generated `package-lock.json`.

On Windows, if PowerShell blocks `npm.ps1`, select the **Command Prompt** terminal profile or use:

```bat
npm.cmd ci
npm.cmd run dev
```

### Available commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm test` | Run the Node business-rule tests |
| `node --test` | Run the same tests directly with the assignment-required command |
| `npm run build` | Generate production output in `dist/` |
| `npm run preview` | Serve the existing production build locally |

Build before previewing:

```bash
npm test
npm run build
npm run preview
```

Use the preview URL Vite prints. A successful local preview does not by itself verify the production host's nested-route configuration.

## Main routes and features

| Route | Purpose |
|---|---|
| `/` | Browse records, search relevant fields, filter by category/availability, and sort by price or duration |
| `/experiences/:id` | Inspect a departure's price, date/time, suitability, stock, inclusions, and preparation guidance |
| `/plan` | Add/remove selections, adjust attendees, complete the controlled form, and review charges |
| `/confirmation` | Show the session-only final result; explain direct access or refresh without an active confirmation |
| `/about` | Explain the audience, operating area, model, and operating rules |
| `/demo` | Reproduce loading, availability, empty-data, and missing-content scenarios |
| Unknown page or experience ID | Explain the problem and provide navigation back to discovery |

### Responsive verification page

When `public/responsive-check.html` is included in your checkout, open it through the running app at:

- `/responsive-check.html?width=390`
- `/responsive-check.html?width=1280`

These URLs intentionally omit `public/`: Vite serves files from that folder at the site root. The page embeds the same application at exact viewport widths; it is a verification aid, not a separate mobile implementation.

## Operating rules

| Category | Exact condition and response | Boundary examples |
|---|---|---|
| Availability/capacity | Each selected departure accepts 1–6 whole-number attendees, never more than its remaining spots. Add/quantity controls enforce the limit; review and confirmation revalidate it. | Quantity 6 passes if 6 spots remain; 7 fails; quantity 3 fails if only 2 remain. |
| Eligibility | The youngest attendee must meet every selected departure's minimum age. The reference implementation accepts integer ages up to 100. Errors preserve other valid form values. | Margalla minimum 12: age 12 passes and age 11 fails. Adding a trip with minimum 16 raises the plan's required age to 16. |
| Pricing/fulfilment | Experience subtotal must be at least PKR 1,500 **before transfer fees**. Meet at location is free. Optional F-6 transfer costs PKR 600 once per plan. | Subtotal 1,500 passes; 1,499 fails even with transfer. One Margalla attendee plus transfer costs 1,800 + 600 = 2,400. |

Any transport explicitly included in an experience's price remains part of that inclusion. The optional F-6 transfer connects F-6 to the starting meeting point. All charges and availability are fictional.

The form additionally validates name length, email format, supported meeting options, and acknowledgement of the simulation.

## State, persistence, and simulated completion

- `App` owns shared records, cart, form, loading state, and the session confirmation.
- Selection updates use immutable arrays/objects and functional state updates where the next value depends on previous state.
- Summaries are derived from the current selection and meeting option.
- Local storage key `trail-tide-plan-v1` contains versioned selection IDs and quantities only.
- Restored selections are checked against current data; unavailable or removed entries remain visible with correction actions and prevent completion.
- Contact details and confirmations are not persisted across a full reload.
- Demo scenarios reset on reload. Tabs have independent React state; saved selections synchronize on reload rather than through live cross-tab updates.
- Completing a simulation clears the current plan but does not reserve real seats, decrement shared inventory, charge a payment, or send an email.

## Reproduce edge cases

| Check | Actions and expected outcome |
|---|---|
| Loading failure and retry | `/demo` → Loading failure → Explore → loading then clear error → Retry loading → normal dataset |
| Availability changed after selection | Add Margalla sunrise → `/demo` → Changed availability → Your plan → retained sold-out conflict; review blocked until corrected |
| Removed record | `/demo` → Add a removed item → Inspect saved plan → unavailable fallback with a Remove action and explanatory message |
| Malformed saved JSON | `/demo` → Demonstrate malformed saved data → safe empty plan and explanation |
| Empty dataset | `/demo` → Empty dataset → Explore → no published departures message with a recovery link |
| No search matches | Normal data → search `no-such-escape` → no-results guidance → Clear search & filters restores the list |
| Lengthy/missing content | `/demo` → Lengthy title & missing artwork / description → inspect wrapped title, labelled artwork fallback, and detail-description fallback |
| Invalid detail route | `/experiences/not-a-real-id` → useful not-found feedback |
| Invalid page | `/not-a-page` → page-not-found message and recovery navigation |
| Persistence | Add a trip → reload `/plan` → selection restored and rechecked against loaded data |
| Invalid form recovery | Enter a valid name, invalid email, and age 11 for Margalla; leave acknowledgement off → Review → specific errors while valid input remains |
| Minimum spend | Add only Saidpur at PKR 1,200; select transfer → Review still fails the experience minimum; add another attendee to reach PKR 2,400 before fees |
| Keyboard | Use Tab/Shift+Tab, Enter, and Space through the main journey; check visible focus and error-summary links |

Use fictional form details, such as `explorer@example.com`, when demonstrating the project.

## Testing and verification status

**Documentation reviewed: 22 November 2026.** This review checked the uploaded README and the previously supplied implementation details. It did not inspect your current repository, rerun the application, or verify your current Vercel deployment.

The original reference build was checked on **15 November 2026**:

- `node --test`: **9 passed, 0 failed**.
- `npm run build`: passed.
- Local Chrome journeys at exact 390 px and 1280 px viewports, including booking completion and selected recovery cases.
- Keyboard focus/order and core Enter/Space interactions were checked.
- No page-wide horizontal overflow was found on the checked journey screens.
- The original public homepage loaded, but subsequent production navigation checks were blocked by the verification browser's policy.

These are historical results for the reference build, not fresh evidence for later edits. Before submission, run the tests/build again, repeat the journey on your current production deployment, and record your actual results and screenshots in `docs/VERIFICATION.md` and the report.

### Automated rule-test scope

`src/rules/booking.test.js` imports the same exported rule functions used by the application. The reference suite includes:

1. An ordinary valid quantity.
2. A quantity exactly at the six-attendee limit.
3. A quantity above the limit.
4. Invalid zero, negative, fractional, and nonnumeric quantities.
5. Exact available capacity and over-capacity/sold-out rejection.
6. Inclusive minimum-age boundaries.
7. The minimum experience subtotal before transfer fees.
8. A single transfer fee across a multi-item plan.
9. Removed or sold-out selections preventing completion.

The Node suite tests rule logic. Manual browser checks cover the UI and recovery scenarios; they do not certify every accessibility, device, or browser combination.

## React / JavaScript concept map

| Concept | File | Component/function |
|---|---|---|
| Function components, JSX, imports | `src/components/TripCard.jsx` | `TripCard` |
| Props and callback props | `src/pages/Explore.jsx` | `Explore` passes `item`, `quantity`, and `onAdd` to `TripCard` |
| Shared state | `src/App.jsx` | `App` owns related data, selections, and form values |
| Functional updates and immutable arrays/objects | `src/App.jsx`, `src/pages/Plan.jsx` | `add`, `quantity`, `remove`, `change` |
| Controlled input and submission events | `src/pages/Plan.jsx` | `change`, `submit`, `e.preventDefault()` |
| Derived values and array methods | `src/rules/booking.js`, `src/pages/Explore.jsx` | `calculateSummary`; `filter`, `sort`, `map`, `reduce` |
| Async code and failure handling | `src/services/loader.js` | `loadExperiences` |
| Effect dependencies and cleanup | `src/App.jsx` | Loader effect `[mode, attempt]` with `AbortController` cleanup |
| Browser synchronization | `src/App.jsx` | Storage effect `[cart]`; `readSavedPlan` |
| Routes, URL parameters, and history | `src/App.jsx`, `src/pages/Details.jsx`, `src/pages/Explore.jsx` | `Routes`, `useParams`, `useSearchParams` |
| Conditional rendering | `src/App.jsx`, `src/pages/Info.jsx` | Loading/error wrapper and `Confirmation` fallback |
| Independent rule tests | `src/rules/booking.test.js` | `node:test` and `node:assert/strict` |
| Semantic layout and responsive access | `src/styles/main.css`, `src/components/Layout.jsx` | Authored CSS, media queries, labels, skip link, focus, and text status feedback |

## GitHub development workflow

Use a public repository and commit genuine working increments while developing. The assignment requires public GitHub use from the beginning; uploading a finished project later does not retroactively satisfy that history requirement. Preserve existing real history and accurately describe your own work.

For a repository already connected to GitHub:

```bash
git status
git remote -v
git diff
git add README.md
git commit -m "Update project documentation and verification status"
git push
```

Stage other files when they are part of the actual change. Keep `node_modules/`, `dist/`, `.env`, and credentials out of commits and the source ZIP.

If you are using the previously supplied Git history bundle, follow its accompanying `docs/START_HERE.md` instructions. The bundle is an optional package artifact, not a required file inside this repository.

## Deployment

### Vercel

Import your actual GitHub repository. Confirm these settings against the project structure:

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Root directory | Directory containing `package.json` |
| Build command | `npm run build` |
| Output directory | `dist` |

Keep the project's SPA rewrite in root-level `vercel.json` so direct application routes can serve `index.html`. The original source includes a rewrite configuration; verify it is committed in your current checkout before deploying.

Use a working production `.vercel.app` URL if your optional custom domain is not ready. A custom domain needs ownership, correct DNS records, and HTTPS; adding its name to the dashboard alone does not connect it. Follow the exact DNS values shown by Vercel for your domain rather than assuming an old example IP is still applicable.

### Netlify alternative

Build with `npm run build`, publish `dist`, and commit the SPA fallback file `public/_redirects`:

```text
/* /index.html 200
```

### Production checklist

- [ ] The URL opens in a signed-out/private window without requesting access.
- [ ] Assets load and the main booking journey completes.
- [ ] Direct access and refresh work on `/experiences/margalla-sunrise` and `/plan`.
- [ ] Search, selection, validation, totals, recovery controls, and confirmation behave as documented.
- [ ] The deployment corresponds to the final submitted Git commit.
- [ ] The actual public repository and production URLs are entered at the top of this README and in the report.

## Report, source ZIP, and final commit

The report should contain student/project details, business profile, operating rules, reference-site investigation, frontend decisions, implemented application, verification, and limitations, in the prescribed order.

After the final source and documentation edits are committed and pushed:

```bash
git status
git rev-parse HEAD
git archive --format=zip --output="RollNo_Name_Section_A#02.zip" HEAD
```

Replace the filename with your real roll number, name without spaces, and section. Ensure the working tree is clean. Record the full final SHA in the report and confirm the deployment uses that commit. Keep the final report outside the source repository if it records the final source hash, avoiding a self-referential report/commit update cycle.

If a supplied PDF or `SUBMISSION_STATUS.txt` still describes the original reference snapshot, update it for your actual submission. Do not treat old package metadata as evidence of a later deployment.

Submit the PDF report, public GitHub repository URL, public deployment URL, and clean source ZIP. Prepare to explain the implementation and make a relevant change in the individual viva.

## Originality, assets, and known limitations

- The reference implementation uses original business copy, authored CSS, SVG landscape scenery, and a local mark. No complete page template or UI component kit is used.
- Reference screenshots document academic critique; they are not application assets or endorsements. Sources and capture details belong in `docs/INVESTIGATION.md`.
- Dependency and font license notices apply: React/Vite/React Router use MIT licenses, Lucide uses ISC, and the DM Sans/Manrope fonts use SIL Open Font Licenses. Retain applicable notices when redistributing assets/dependencies.
- Google Fonts are optional enhancements; system fonts provide a fallback if those requests are blocked.
- No real payment, user account, email delivery, backend, live weather, reservation, or multi-user inventory lock is implemented.
- The reference dataset uses different fixed dates; there is no same-day scheduling-conflict engine.
- Full reload clears the confirmation and form details; the selection persists locally.
- No exhaustive screen-reader audit, real-device touch test, cross-browser certification, or Lighthouse score is claimed.

## Supporting documents

When included in your checkout, consult:

- `DECISIONS.md` — three frontend decisions, alternatives, tradeoffs, code locations, and evidence.
- `docs/INVESTIGATION.md` — the three reference-site problems.
- `docs/VERIFICATION.md` — actual actions, expected/observed results, and screenshots.
- `docs/REQUIREMENTS.md` — assignment coverage and outstanding items.
- `docs/START_HERE.md` — setup and submission guidance.
- `docs/VIVA_GUIDE.md` — explanations and practice questions.

## Official setup references

- [GitHub: add locally hosted code](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github?platform=windows)
- [Vercel: Vite applications and SPA routes](https://vercel.com/docs/frameworks/frontend/vite)
- [Vercel: custom domains](https://vercel.com/docs/domains/working-with-domains/add-a-domain)
- [Netlify: Vite deployment](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/)
 the build command and `dist` as the output directory. The included `vercel.json` rewrites client-side routes to the application entry point. After deployment, check that `/plan` and `/experiences/margalla-sunrise` open directly.
