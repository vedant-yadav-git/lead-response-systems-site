# Public Website

Public-facing site for Lead Response Systems.

This folder is intentionally separate from the internal dashboard and pipeline data. Deploy only this folder to public Vercel projects.

Production URL:

https://lead-response-systems.vercel.app

Public website repo:

https://github.com/vedant-yadav-git/lead-response-systems-site

Primary money page:

https://lead-response-systems.vercel.app/paid-diagnostic.html

Deploy manually:

```bash
cd public_site
npx vercel@latest deploy --prod --yes
```

The public website repo also deploys to Vercel automatically through GitHub Actions on push to `main`.
