# ipxs.digital

Main branch protection + Vercel deploy checks will be enforced via PR workflow.

## Updating Case Study Images

1. Add new files to `public/case-studies/<slug>/` using the same names:
   - `poster.(png|jpg|webp)`
   - `cover.(png|jpg|webp)`
2. Update the matching `poster` and `cover` paths in `content/case-studies.ts` for that slug.
3. If media entries use `src` or `poster`, update those paths in the same case study object.
4. Keep filenames consistent so cards, world tiles, and case study pages continue to load media without component refactors.
