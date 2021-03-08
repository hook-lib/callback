import { sortBy } from 'lodash'

interface groups {
  [key: string]: any
}

interface func {
  (...items: any[]): any
}

interface arg {
  defaultOrder?: number
  defaultExtra?: number
}

type args = arg | undefined

interface item {
  method: func
  group?: string
  extra?: number
  id?: string
  [key: string]: any
}
export default class Callback {
  private defaultOrder: number
  private defaultExtra: number
  public items: any[] = []
  public readonly groups: groups = {}
  constructor(options: args) {
    const config = Object.assign(
      {
        defaultOrder: 1000,
        defaultExtra: 1000
      },
      options
    )

    this.defaultOrder = config.defaultOrder
    this.defaultExtra = config.defaultExtra
  }

  configGroup(
    name: string,
    order = this.defaultOrder,
    defaultExtra = this.defaultExtra
  ) {
    this.groups[name] = [order, defaultExtra]
    return this
  }

  getGroupConfig(name = '') {
    const { groups } = this
    if (groups[name]) {
      return groups[name]
    }
    return [1000, 1000]
  }

  add({ method = () => {}, group = 'default', extra, id, ...other }: item) {
    const item = { ...other, group, extra, id, method }

    if (!item.extra) {
      if (item.extra !== 0) {
        const config = this.getGroupConfig(group)
        item.extra = config[1]
      }
    }
    this.items.push(item)
    return this
  }

  getAll() {
    return this._sort(this.items)
  }

  getItems(filter: (item: item) => boolean) {
    return this.items.filter(filter)
  }

  getById(id: string, group?: string) {
    const filter = group
      ? (item: item) => item.group === group && item.id === id
      : (item: item) => item.id === id
    const arr = this.items.filter(filter)
    return arr[0]
  }

  getByGroup(name: string, extra?: number) {
    const filter =
      typeof extra === 'undefined'
        ? (item: item) => item.group === name
        : (item: item) => item.group === name && item.extra === extra
    const arr = this.items.filter(filter)
    return this._sort(arr)
  }

  removeAll() {
    this.items = []
    return this
  }

  removeItems(filter: (item: item) => boolean) {
    this.items = this.items.filter(item => !filter(item))
    return this
  }

  removeByGroup(name: string, extra: number) {
    const filter =
      typeof extra === 'undefined'
        ? (item: item) => item.group !== name
        : (item: item) => !(item.group === name && item.extra === extra)
    this.items = this.items.filter(filter)
    return this
  }

  removeById(id: string, group: string) {
    const filter = group
      ? (item: item) => !(item.group === group && item.id === id)
      : (item: item) => item.id !== id
    this.items = this.items.filter(filter)
    return this
  }

  private _sort(arr: item[] = []) {
    return sortBy(arr, [
      (item: item) => {
        const { group } = item
        const [order] = this.getGroupConfig(group)
        return order
      },
      (item: item) => item.extra
    ])
  }
}
