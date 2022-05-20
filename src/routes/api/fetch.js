export async function load({ fetch }) {
  const res = await fetch(
    'http://api.redgifs.com/v1/creators/search?page=1&order=recent&tags=Natural',
    {
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      }
    }
  )

  const data = await res.json()
  
  return {
    body: data,
  }
}
