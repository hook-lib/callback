import Callback from '../src/index'

test('constructor params', () => {
  const cb = new Callback({
    defaultGroup: 'default',
    defaultOrder: 1000,
    initDefaultGroup: true,
  })
  const cb2 = new Callback()
  expect(cb.groups).toEqual(cb2.groups)
})

test('groups property', () => {
  const cb = new Callback()
  expect(cb.groups).toHaveProperty('default', 1000)

  const cb2 = new Callback({ defaultGroup: 'foo', defaultOrder: 2000 })
  expect(cb2.groups).toHaveProperty('foo', 2000)

  const cb3 = new Callback({ defaultGroup: 'foo' })
  expect(cb3.groups).toHaveProperty('foo', 1000)

  const cb4 = new Callback({ defaultOrder: 2000 })
  expect(cb4.groups).toHaveProperty('default', 2000)
})

test('hasGroup method', () => {
  const cb = new Callback()
  expect(cb.hasGroup('default')).toEqual(true)
  expect(cb.hasGroup('foo')).toEqual(false)
})
test('getGroupOrder method', () => {
  const cb = new Callback()
  expect(cb.getGroupOrder('default')).toEqual(1000)

  const cb2 = new Callback({ defaultOrder: 2000 })
  expect(cb2.getGroupOrder('default')).toEqual(2000)
})

test('setGroup method', () => {
  const cb = new Callback()

  cb.setGroup('foo')
  expect(cb.groups).toHaveProperty('foo', 1000)

  cb.setGroup('foo', 2000)
  expect(cb.groups).toHaveProperty('foo', 2000)
})

test('setGroups method', () => {
  const cb = new Callback()

  cb.setGroups({
    foo: 2000,
    bar: 3000,
  })
  expect(cb.groups).toHaveProperty('foo', 2000)
  expect(cb.groups).toHaveProperty('bar', 3000)
  expect(cb.groups).toHaveProperty('default', 1000)
})

test('push method', () => {
  const cb = new Callback()

  cb.push({ method() {}, flag: 'first' })
    .push({ method() {}, flag: 'second' })
    .push({ method() {}, flag: 'third' })

  expect(cb.getAll().map((item) => item.flag)).toEqual([
    'first',
    'second',
    'third',
  ])
})

test('unshift method', () => {
  const cb = new Callback()

  cb.push({ method() {}, flag: 'second' })
    .push({ method() {}, flag: 'third' })
    .unshift({
      method() {},
      flag: 'first',
    })

  expect(cb.getAll().map((item) => item.flag)).toEqual([
    'first',
    'second',
    'third',
  ])
})

test('getItems method', () => {
  const cb = new Callback()
  cb.push({ foo: 'foo', method() {} })
    .push({ foo: 'foo', method() {} })
    .push({ foo: 'bar', method() {} })
  expect(cb.getItems((item) => item.foo === 'foo').length).toEqual(2)
  expect(cb.getItems((item) => item.foo === 'bar').length).toEqual(1)
})

test('getByGroup method', () => {
  const cb = new Callback()
  cb.setGroup('foo', 2000)

  cb.push({ group: 'foo', method() {} }).push({ group: 'foo', method() {} })

  cb.push({ method() {} })

  expect(cb.getByGroup('foo').length).toEqual(2)
  expect(cb.getByGroup().length).toEqual(1)
  expect(cb.getAll().length).toEqual(3)
})

test('getAll method', () => {
  const cb = new Callback()
  cb.setGroup('foo', 2000)
  cb.push({ group: 'foo', method() {}, flag: 'third' }).push({
    group: 'foo',
    method() {},
    flag: 'fourth',
  })

  cb.push({ method() {}, flag: 'first' }).push({ method() {}, flag: 'second' })

  expect(cb.getAll().map((item) => item.flag)).toEqual([
    'first',
    'second',
    'third',
    'fourth',
  ])
})

test('removeItems method', () => {
  const cb = new Callback()

  cb.push({ method() {}, flag: 'foo' })
    .push({ method() {}, flag: 'bar' })
    .push({ method() {}, flag: 'baz' })

  cb.removeItems((item) => item.flag === 'bar')

  expect(cb.getAll().map((item) => item.flag)).toEqual(['foo', 'baz'])
})

test('removeByGroup method', () => {
  const cb = new Callback()
  cb.setGroup('foo')
  cb.push({ group: 'foo', method() {} }).push({ group: 'foo', method() {} })

  cb.push({ method() {} })

  cb.removeByGroup('foo')
  expect(cb.getAll().length).toEqual(1)
  cb.removeByGroup()
  expect(cb.getAll().length).toEqual(0)
})

test('removeAll method', () => {
  const cb = new Callback()
  cb.push({ method() {} }).push({ method() {} })
  expect(cb.getAll().length).toEqual(2)
  cb.removeAll()
  expect(cb.getAll().length).toEqual(0)
})

test('sort method', () => {
  const cb = new Callback()
  cb.setGroup('foo', 2000)
  cb.push({ group: 'foo', method() {}, flag: 'third' }).push({
    group: 'foo',
    method() {},
    flag: 'fourth',
  })

  cb.push({ method() {}, flag: 'first' }).push({ method() {}, flag: 'second' })

  expect(cb.items.map((item) => item.flag)).toEqual([
    'third',
    'fourth',
    'first',
    'second',
  ])
  expect(cb.sort(cb.items)).toEqual(cb.getAll())
})

test('two equal order groups', () => {
  const cb = new Callback()
  cb.setGroup('foo')
  cb.push({ group: 'foo', method() {}, flag: 'third' }).push({
    group: 'foo',
    method() {},
    flag: 'fourth',
  })

  cb.push({ method() {}, flag: 'first' }).push({ method() {}, flag: 'second' })

  expect(cb.items.map((item) => item.flag)).toEqual([
    'third',
    'fourth',
    'first',
    'second',
  ])

  cb.removeAll()

  cb.push({ method() {}, flag: 'first' }).push({ method() {}, flag: 'second' })

  cb.push({ group: 'foo', method() {}, flag: 'third' }).push({
    group: 'foo',
    method() {},
    flag: 'fourth',
  })
  expect(cb.items.map((item) => item.flag)).toEqual([
    'first',
    'second',
    'third',
    'fourth',
  ])
})
