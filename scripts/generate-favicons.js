import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const sourceImage = join(__dirname, '../public/favicon.jpeg')
const publicDir = join(__dirname, '../public')

async function generateFavicons() {
  console.log('Generating favicons from source:', sourceImage)
  
  // Generate favicon-16x16.png
  await sharp(sourceImage)
    .resize(16, 16, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'favicon-16x16.png'))
  console.log('Created favicon-16x16.png')
  
  // Generate favicon-32x32.png
  await sharp(sourceImage)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'favicon-32x32.png'))
  console.log('Created favicon-32x32.png')
  
  // Generate apple-touch-icon.png (180x180)
  await sharp(sourceImage)
    .resize(180, 180, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'))
  console.log('Created apple-touch-icon.png')
  
  // Generate icon.png for Next.js App Router (32x32)
  await sharp(sourceImage)
    .resize(32, 32, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'icon.png'))
  console.log('Created icon.png')
  
  console.log('All favicons generated successfully!')
}

generateFavicons().catch(console.error)
