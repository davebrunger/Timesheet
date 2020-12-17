export interface MenuItem {
    label : string;
    path : string;
    component : () => JSX.Element;
    exact? : boolean;
    excludeFromMenu? : boolean;
}