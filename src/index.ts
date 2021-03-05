export async function init(timeout: number = 2000) {
  await new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
  console.log('hahah!')
}
init(1000)
