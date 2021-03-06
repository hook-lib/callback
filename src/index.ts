export type groups = {
  [group: string]: number
}

export interface options {
  defaultOrder?: number
  defaultGroup?: string
  initDefaultGroup?: boolean
}

export type item = {
  method: (...items: any[]) => any
  group?: string
  [key: string]: any
}

export type filter = (item: item) => boolean

export default class Callback {
  public groups: groups = {}
  public items: item[] = []
  private defaultOrder: number
  private defaultGroup: string
  constructor(options?: options) {
    const config = Object.assign(
      {
        defaultOrder: 1000,
        defaultGroup: 'default',
        initDefaultGroup: true,
      },
      options,
    )
    this.defaultOrder = config.defaultOrder
    this.defaultGroup = config.defaultGroup

    if (config.initDefaultGroup) {
      this.setGroup(this.defaultGroup)
    }
  }

  hasGroup(group: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.groups, group)
  }

  getGroupOrder(group: string = this.defaultGroup): number {
    if (this.hasGroup(group)) {
      return this.groups[group]
    }
    return this.defaultOrder
  }

  setGroup(group: string, order: number = this.defaultOrder): this {
    this.groups[group] = order
    return this
  }

  setGroups(groups: { [group: string]: number }): this {
    Object.assign(this.groups, groups)
    return this
  }

  push(item: item): this {
    return this._add(item, 'push')
  }

  unshift(item: item): this {
    return this._add(item, 'unshift')
  }

  private _add(
    { group = this.defaultGroup, ...other }: item,
    type: 'push' | 'unshift',
  ): this {
    const item = { ...other, group }
    this.items[type](item)
    return this
  }

  getItems(filter: filter): item[] {
    return this.items.filter(filter)
  }

  getByGroup(group: string = this.defaultGroup): item[] {
    return this.sort(this.getItems((item: item) => item.group === group))
  }

  getAll(): item[] {
    return this.sort(this.items)
  }

  removeItems(filter: filter): this {
    this.items = this.items.filter((item) => !filter(item))
    return this
  }

  removeByGroup(group: string = this.defaultGroup): this {
    return this.removeItems((item: item) => item.group === group)
  }

  removeAll(): this {
    this.items = []
    return this
  }

  sort(items: item[]): item[] {
    return items.sort(
      (a: item, b: item) =>
        this.getGroupOrder(a.group) - this.getGroupOrder(b.group),
    )
  }
}
