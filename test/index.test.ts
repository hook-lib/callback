import Callback from '../src/index'

test('configGroup and getGroupConfig', () => {
  const cb = new Callback()

  cb.configGroup('foo', 3000, 3000)
  cb.configGroup('bar', 2000)
  cb.configGroup('baz')

  expect(cb.getGroupConfig('foo')).toEqual([3000, 3000])
  expect(cb.getGroupConfig('bar')).toEqual([2000, 1000])
  expect(cb.getGroupConfig('baz')).toEqual([1000, 1000])
})

test('add and getAll', () => {
  const cb = new Callback()
  cb.add({
    method: () => {},
  })

  console.log(cb.getAll())

  expect(cb.getAll().length).toEqual(1)
})
