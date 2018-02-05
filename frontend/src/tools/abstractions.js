export function post (endpoint, payload) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest()
    x.onreadystatechange = () => {
      console.log(x)
      return (x.readyState !== 4)
        ? false
        : (x.status === 200)
          ? resolve(x.response)
          : reject(x.response)
    }
    x.open('POST', endpoint)
    x.setRequestHeader('Content-Type', 'application/json')
    x.send(JSON.stringify(payload))
  })
}
