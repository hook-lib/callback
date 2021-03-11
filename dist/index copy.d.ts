interface groups {
    [key: string]: any;
}
declare type options = {
    defaultOrder?: number;
    defaultExtra?: number;
};
export interface method {
    (...items: any[]): any;
}
export interface item {
    method: method;
    group?: string;
    extra?: number;
    id?: string;
    [key: string]: any;
}
export interface filter {
    (item: item): boolean;
}
export default class Callback {
    private defaultOrder;
    private defaultExtra;
    items: any[];
    readonly groups: groups;
    constructor(options?: options);
    configGroup(name: string, order?: number, defaultExtra?: number): this;
    getGroupConfig(name?: string): any;
    add({ method, group, extra, id, ...other }: item): this;
    getAll(): item[];
    getById(id: string, group?: string): any;
    getByGroup(name: string): item[];
    removeAll(): this;
    getItems(filter: filter): any[];
    removeItems(filter: filter): Callback;
    removeByGroup(name: string, extra: number): Callback;
    removeById(id: string, group?: string): Callback;
    sort(arr: item[]): item[];
    private _getItemExtra;
}
export {};
