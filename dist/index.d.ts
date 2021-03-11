export declare type groups = {
    [group: string]: number;
};
export interface options {
    defaultOrder?: number;
    defaultGroup?: string;
    initDefaultGroup?: boolean;
}
export declare type item = {
    method: (...items: any[]) => any;
    group?: string;
    [key: string]: any;
};
export declare type filter = (item: item) => boolean;
export default class Callback {
    groups: groups;
    items: item[];
    private defaultOrder;
    private defaultGroup;
    constructor(options?: options);
    hasGroup(group: string): boolean;
    getGroupOrder(group?: string): number;
    setGroup(group: string, order?: number): this;
    setGroups(groups: {
        [group: string]: number;
    }): this;
    push(item: item): this;
    unshift(item: item): this;
    private _add;
    getItems(filter: filter): item[];
    getByGroup(group?: string): item[];
    getAll(): item[];
    removeItems(filter: filter): this;
    removeByGroup(group?: string): this;
    removeAll(): this;
    sort(items: item[]): item[];
}
