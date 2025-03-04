// app/fonts.ts
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400','500', '700'],
  variable: '--font-poppins',
})

export const fonts = {
  poppins,
}