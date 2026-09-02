import { defineConfig } from 'vite';
import reactThe issue is that your `base` evaluates to `'///'`, which creates broken asset paths on deployment.

Since `REPO_NAME` already contains `'/'`, wrapping it in `/${REPO_NAME}/` produces multiple consecutive slashes.

### Recommended Fix

Set `REPO_NAME` to just the repository name (without slashes), or default to `'/'` cleanly:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set to your GitHub repository name (e.g. 'my-repo'), 
// or set to an empty string '' if deploying to a custom domain / root page.
const REPO_NAME = ''; 

export default defineConfig({
  plugins: [react()],
  base: REPO_NAME ? `/${REPO_NAME}/` : '/',
});
