export async function get() {
  try {
    const res = await fetch('https://api.redgifs.com/v2/home/feeds')
    const data = await res.json()

    return {
      body: data
    }
  }
  catch (error) {
    return {
      error: error
    }
  }
}
