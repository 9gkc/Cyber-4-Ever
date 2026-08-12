# Verification Notes

## Local build and automated checks

On 2026-08-12, the production build completed successfully and the Vitest suite passed all eight assertions. The tests cover learning-progress calculations, completed study-time aggregation, HTTPS-only portfolio evidence, and allowlisted training-resource URLs.

## Browser preview

The first browser-preview attempt reached the Vite host-protection page rather than the application. The development configuration was then updated to allow the temporary preview host explicitly before the next visual check. This change is limited to local development-server behavior and does not affect the static GitHub Pages build.

The browser review confirmed that the English left-to-right dashboard renders the sidebar, privacy status, overall progress display, learning statistics, primary calls to action, and responsible-practice statement. The learning-roadmaps navigation was then opened successfully; the Web Application Security track displayed its five ordered modules, durations, local completion controls, and defensive-learning rule.

The local-completion control for the first Web Application Security module was toggled in the browser. The track and progress-ring indicators updated from 0% to 20%, then returned to 0% when toggled back. The browser’s temporary local state was therefore left clean after this verification.

The Portfolio view was reviewed. It clearly states that the page displays evidence rather than unsupported claims, explains the HTTPS evidence requirement for the evidence-linked label, and states that it does not issue certificates or verify identity. Submitting the empty form triggers the browser’s required-field validation, preventing a blank achievement from being saved.

## Curriculum expansion verification

The Roadmaps page now opens a detailed lesson panel before completion can be recorded. The verified lesson included stated objectives, two core concepts, a bounded safe-practice activity, a review prompt with explanation, authorization limits, and official references.

Completion was verified from the in-lesson button only: the selected Web Security lesson moved the track from 0% to 20%, and then returned to 0% when the state was reset.

Safe Labs displays nine approved learning resources with a visible “Best fit” description for each. The verified categories cover web application security, guided foundations, SOC/DFIR, and cloud security.

The expanded curriculum passed all ten Vitest assertions and completed a production build successfully. Twenty-eight official learning and lab links were checked; the accessible destinations responded successfully, while selected providers returned anti-automation responses during command-line validation. Those providers had already been reviewed from their official pages during curriculum research and remain linked only as their official destinations.

## Published deployment

GitHub Pages was enabled with the GitHub Actions source and the deployment workflow subsequently completed successfully. The published application was opened and verified at **https://9gkc.github.io/Cyber-4-Ever/**. The live page served the dashboard, visible navigation, privacy statement, learning statistics, roadmap cards, and responsible-practice notice.
