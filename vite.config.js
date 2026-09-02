import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// IMPORTANT for GitHub Pages:
// If you deploy to https://<user>.github.io/<repo-name>/, set `base` to
// '/<repo-name>/' below (e.g. '/tp/'). If you deploy to a user/org page
// (https://<user>.github.io/) or a custom domain, set base to '/'.
const REPO_NAME = 'blck-iris.github.io';

export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
});

3
