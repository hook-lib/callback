export async function init(timeout = 2000) {
  await new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
  console.log('hahah!')
}
init(1000)
