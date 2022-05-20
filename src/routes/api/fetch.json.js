export async function get() {
  const res = await fetch('http://api.redgifs.com/v1/creators/search?page=1&order=recent&tags=Natural')

  const data = await res.json()
  
  return {
    body: data,
  }
}
