# The NBA League — Website MVP

A responsive browser-based MVP for a fantasy league where members draft NBA teams in a snake draft.

## Run it

Open `index.html` in a modern browser, or publish this folder with GitHub Pages.

## Included

- Choose 2–30 league members before the draft starts
- Edit member names before starting
- Randomizable snake draft order; order reverses every round
- All 30 NBA teams, each draftable exactly once
- Team distribution is as even as possible; when 30 does not divide evenly, some members receive one extra team
- Pick history and undo-last-pick
- Manual NBA team wins/losses entry
- Standings calculated as combined wins minus combined losses, tied by combined wins
- Responsive desktop and mobile layout
- Browser-local persistence using `localStorage`

## Publish with GitHub Pages

1. Sign in to GitHub and create a new **public** repository named `the-nba-league`.
2. In the repository, choose **Add file → Upload files**.
3. Upload `index.html` and `README.md` from this folder (upload the files themselves, not the containing folder).
4. Commit the files to the `main` branch.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Choose branch `main` and folder `/(root)`, then click **Save**.
8. Wait a minute or two. GitHub will show the published website URL in the Pages section, usually `https://YOUR-USERNAME.github.io/the-nba-league/`.

## Important limitations

This is a functional single-browser MVP, not yet a shared multi-user service. Data is saved only in the browser that opened the site, so different users/devices will not share league data. NBA records are entered manually; live NBA data, accounts, invite links, a cloud database, and real-time synchronization are not connected yet.
