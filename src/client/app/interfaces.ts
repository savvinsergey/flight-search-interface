
// --------- Common interfaces -----------

export interface IParamsCommonCmp {
    id?: string;
    placeholder?: string;
    label?: string;
}

export interface IFormError {
    element: Element;
    message: string;
}

export interface IComponent {
    template: any;
    element: Element;
    render: (data: Object) => void;
    validate?: (data: Object) => IFormError[];
    destroy?: () => void;
}

export interface IApp {
    [key: string]: {
        instance: IComponent,
        children?: IApp
    };
}

// Special magic for require

interface IRequire {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

interface INodeRequire extends IRequire {}

declare var require: INodeRequire;