'use server'

export default async function getApiUrl(endpoint: string): Promise<string> {
  const url = new URL(endpoint, process.env.API_URL || 'https://krfx.ru/')
  return url.toString()
}
