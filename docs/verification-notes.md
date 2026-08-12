# Verification Notes

## Local build and automated checks

On 2026-08-12, the production build completed successfully and the Vitest suite passed all eight assertions. The tests cover learning-progress calculations, completed study-time aggregation, HTTPS-only portfolio evidence, and allowlisted training-resource URLs.

## Browser preview

The first browser-preview attempt reached the Vite host-protection page rather than the application. The development configuration was then updated to allow the temporary preview host explicitly before the next visual check. This change is limited to local development-server behavior and does not affect the static GitHub Pages build.

The subsequent browser review confirmed that the Arabic right-to-left dashboard renders the sidebar, privacy status, overall progress display, learning statistics, primary calls to action, and the responsible-practice statement. The learning-roadmaps navigation was then opened successfully; the Web Application Security track displayed its five ordered modules, durations, local completion controls, and its defensive-learning rule.

The local-completion control for the first Web Application Security module was toggled in the browser. The track and progress-ring indicators updated from 0% to 20%, then returned to 0% when toggled back. The browser’s temporary local state was therefore left clean after this verification.

The Portfolio view was reviewed in Arabic RTL mode. It clearly states that the page displays evidence rather than unsupported claims, explains the HTTPS evidence condition for the visible «مدعوم بدليل» label, and states that it does not issue certificates or verify identity. Submitting the empty form triggers the browser’s required-field validation, preventing a blank achievement from being saved.

## Published deployment

GitHub Pages was enabled with the GitHub Actions source and the deployment workflow subsequently completed successfully. The published application was opened and verified at **https://9gkc.github.io/Cyber-4-Ever/**. The live page served the Arabic dashboard, visible navigation, privacy statement, learning statistics, route cards, and responsible-practice notice.
