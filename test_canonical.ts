import { generateMetadata } from './src/app/article/[id]/page';

async function main() {
  const meta = await generateMetadata({ params: Promise.resolve({ id: 'zBn9CcDu' }) });
  console.log(meta);
}
main();
