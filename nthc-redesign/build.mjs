// Build script for the NTHC website.
//   node build.mjs            -> dist/ (index.html + assets/app.js + assets/app.css)
//   node build.mjs --single   -> dist-single/index.html with JS and CSS inlined (for previews)
//   node build.mjs --serve    -> local dev server on http://localhost:5173 with rebuild on change
import * as esbuild from 'esbuild';
import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const args = new Set(process.argv.slice(2));
const single = args.has('--single');
const serve = args.has('--serve');
const outdir = single ? 'dist-single' : 'dist';

const common = {
  entryPoints: ['src/main.jsx'],
  bundle: true,
  minify: !serve,
  sourcemap: serve ? 'inline' : false,
  target: ['es2020'],
  jsx: 'automatic',
  loader: { '.js': 'jsx', '.svg': 'dataurl', '.png': 'dataurl', '.jpg': 'dataurl' },
  define: { 'process.env.NODE_ENV': serve ? '"development"' : '"production"' },
  logLevel: 'info',
};

async function writeHtml(js, css) {
  const tpl = await readFile('public/index.html', 'utf8');
  const html = single
    ? tpl.replace('<!--CSS-->', () => `<style>${css}</style>`).replace('<!--JS-->', () => `<script>${js.replace(/<\/script/gi, '<\\/script')}</script>`)
    : tpl.replace('<!--CSS-->', () => '<link rel="stylesheet" href="assets/app.css">').replace('<!--JS-->', () => '<script defer src="assets/app.js"></script>');
  await writeFile(`${outdir}/index.html`, html);
}

if (serve) {
  await mkdir('dist/assets', { recursive: true });
  const ctx = await esbuild.context({ ...common, outfile: 'dist/assets/app.js' });
  await ctx.watch();
  await writeHtml('', '');
  const { port } = await ctx.serve({ servedir: 'dist', port: 5173 });
  console.log(`NTHC site running at http://localhost:${port}`);
} else {
  if (existsSync(outdir)) await rm(outdir, { recursive: true });
  await mkdir(`${outdir}/assets`, { recursive: true });
  const result = await esbuild.build({ ...common, write: false, outdir: `${outdir}/assets`, entryNames: 'app' });
  let js = '', css = '';
  for (const f of result.outputFiles) {
    if (f.path.endsWith('.js')) js = f.text;
    if (f.path.endsWith('.css')) css = f.text;
  }
  if (!single) {
    await writeFile(`${outdir}/assets/app.js`, js);
    await writeFile(`${outdir}/assets/app.css`, css);
    if (existsSync('public/static')) await cp('public/static', `${outdir}/static`, { recursive: true });
  }
  await writeHtml(js, css);
  console.log(`Built ${outdir}/ (js ${(js.length / 1024).toFixed(0)} KB, css ${(css.length / 1024).toFixed(0)} KB)`);
}
