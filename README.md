# Mainspring — landing page

Static site, no build step: `index.html`, `styles.css`, `app.js`.

## Wire up the waitlist (once, ~2 minutes)

1. Create a free account at [formspree.io](https://formspree.io) and add a new form.
2. Copy the form ID it gives you (looks like `mqkrzabc`).
3. In `index.html`, replace `YOUR_FORM_ID` in the waitlist form's `action`
   attribute: `https://formspree.io/f/mqkrzabc`.

Submissions arrive in your email; Formspree's free tier covers 50/month.

## Deploy to GitHub Pages

```
git init
git add .
git commit -m "Mainspring landing page"
gh repo create mainspring --public --source . --push
```

(Or create the repo on github.com and `git remote add origin … && git push -u origin main`.)

Then on GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root) → Save.**
The site goes live at `https://<your-username>.github.io/mainspring/` within a minute or two.

All asset paths are relative, so the repo-subpath URL works without changes.
To use a custom domain later, add it under Settings → Pages and create the
DNS records GitHub shows you.
