export interface NavigationItem {
    id: string;
    title: string;
    type: 'item' | 'group' | 'collapsable';
    translate?: string;
    icon?: string;
    hidden?: boolean;
    url?: string;
    classes?: string;
    exactMatch?: boolean;
    externalUrl?: boolean;
    openInNewTab?: boolean;
    function?: any;
    badge?: {
        title?: string;
        translate?: string;
        bg?: string;
        fg?: string;
    };
    children?: NavigationItem[];
}

export interface Navigation extends NavigationItem{
    children?: NavigationItem[];
}

export const navigation: Navigation[] = [
    {
        id       : 'pages',
        title    : 'Pages',
        type     : 'collapsable',
        children : [
            {
                id       : 'page1',
                title    : 'Page 1',
                type     : 'item',
                icon     : 'email',
                url      : '/page1',
            },
            {
                id       : 'page2',
                title    : 'Page 2',
                type     : 'item',
                icon     : 'email',
                url      : '/page2'
            }
        ]
    },
    {
        id       : 'form',
        title    : 'Forms',
        type     : 'group',
        children : [
            {
                id: 'stepper',
                title: 'Stepper',
                type: 'item',
                icon: 'dashboard',
                url: '/candidature'
            },
        ]
    },
    {
        id       : 'others',
        title    : 'Others',
        type     : 'group',
        children : [
            {
                id: 'Movies',
                title: 'Movies',
                type: 'item',
                icon: 'movie',
                url: '/movies'
            }
        ]
    }
];
