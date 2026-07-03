# FettleFix — landing page

Static site, no build step: `index.html`, `styles.css`, `app.js`.

## Wire up the waitlist (once, ~2 minutes)

1. Create a free account at [formspree.io](https://formspree.io) and add a new form.
2. Copy the form ID it gives you (looks like `mqkrzabc`).
3. In `index.html`, replace `YOUR_FORM_ID` in the waitlist form's `action`
   attribute: `https://formspree.io/f/mqkrzabc`.

Submissions arrive in your email; Formspree's free tier covers 50/month.

## Deploy to Cloudflare Pages

The repo is already pushed to GitHub. To connect it:

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up or log in.
2. **Workers & Pages** → **Create application** → **Pages** tab → **Connect to Git**.
3. Authorize Cloudflare's GitHub app and select this repo.
4. Build settings: Framework preset **None**, Build command *(empty)*, Build output
   directory `/`.
5. **Save and Deploy.**

Every `git push` to `main` auto-redeploys. It's pure CDN, so there's no cold
start or sleep state to wait through.

To use a custom domain, add it under the Pages project's **Custom domains** tab
once you own one.
