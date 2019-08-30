export interface Config {
    theme: string;
    sidebar: {
        mode: 'side' | 'over' | 'push',
        hasBackdrop: boolean,
        opened: boolean
    };
}

export const appConfig: Config = {
        theme: 'theme-default',
        sidebar: {
            mode: 'side',
            hasBackdrop: false,
            opened: true
        }
    };


