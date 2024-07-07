import { randomInt } from 'crypto';

export const generateApiKey = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_()'
  let key = ''
    
  for (let i = 0; i < length; i++) {
    key += characters.charAt(Math.floor(randomInt(characters.length)))
  }

  return key
}
