
// --------- Common interfaces -----------

export interface IComponent {
    render: (data: Object) => void;
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