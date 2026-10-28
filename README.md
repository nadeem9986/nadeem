# NADEEM

Personal portfolio of Nadeem, a software engineer in Bengaluru. A single-page, monochrome HUD-style site with an interactive terminal, built with plain HTML, CSS and JavaScript.

**Live site:** [n4deem.site](https://n4deem.site)

## Features

- **Monochrome HUD design.** Black, white and grey only, with sharp edges, scan-line details and Departure Mono as the typeface.
- **Dark and light themes.** One-click toggle in the header. The choice is saved in the browser and applied before first paint, so there is no flash.
- **Boot loading animation.** A short segmented loader and boot log plays on every page load. Press any key or click to skip it.
- **Interactive terminal.** A working command line in the page. Type `help` to see what it can do.
- **Self-updating repo count.** The public repository count comes from the GitHub API, so it stays current without any manual edit or redeploy.
- **Responsive layout.** The hero and status panel sit side by side on desktop. On small screens the status panel is hidden and the content stacks.

## Self-updating repo count

The hero shows a live count of public repositories.

1. On load, the page requests `https://api.github.com/users/nadeem9986`. The endpoint is public and needs no token or backend.
2. The `public_repos` value is written into the page.
3. The result is cached in `localStorage` with a timestamp. While the cache is under 24 hours old, the page uses it and makes no request. So each visitor triggers at most one API call per day.
4. If the request fails (offline, rate limited, API down), the number already in the HTML stays on screen. The stat never shows up empty.

GitHub allows 60 unauthenticated requests per hour per IP address. The limit applies to each visitor, not to the site, and the 24 hour cache keeps usage far below it.

The fallback number in `index.html` (the `statRepos` element) is only used when no cached or live value is available. Update it now and then if you want the offline view to be close to current.

## Terminal commands

| Command | What it does |
| :--- | :--- |
| `help` | List the available commands |
| `about` | Short introduction |
| `experience` | Work history |
| `projects` | Selected builds |
| `skills` | Tech stack |
| `contact` | Email, GitHub, LinkedIn, location |
| `resume` | Open the resume PDF in a new tab |
| `github` | Open the GitHub profile in a new tab |
| `linkedin` | Open the LinkedIn profile in a new tab |
| `clear` | Clear the terminal |

There are a few easter eggs too. Arrow up and down step through command history.

## Tech

- Single file: HTML, CSS and JavaScript all live in `index.html`
- No frameworks, no build step, no dependencies
- Departure Mono, self-hosted as WOFF2 in `assets/webfonts/`
- Hosted on GitHub Pages and Cloudflare Pages, custom domain `n4deem.site`

## Structure

```
.
|-- index.html        page markup, styles and scripts
|-- assets/           fonts and static assets
|-- images/           project images
|-- resume/           resume PDF
|-- CNAME             custom domain
|-- ARCHITECTURE.md   design notes
`-- LICENSE.txt       license for bundled assets
```

## Run locally

No install is needed. Serve the folder with any static server:

```bash
git clone https://github.com/nadeem9986/nadeem.git
cd nadeem
python -m http.server 8000
```

Open `http://localhost:8000`.

## Deploy

Pushing to `main` publishes the site. Keep `index.html` at the repository root. For a custom domain, point the DNS record at the host and keep the domain in `CNAME`.

## Contact

- Email: nadeemise2025@gmail.com
- GitHub: [nadeem9986](https://github.com/nadeem9986)
- LinkedIn: [Nadeem](https://www.linkedin.com/in/nadeem-233a46256)

Open to software engineer roles.
