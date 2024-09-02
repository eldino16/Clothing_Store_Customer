export interface Menu {
    path?: string;
    title?: string;
    type?: string;
    megaMenu?: boolean;
    children?: Menu[];
}

export const MENUITEMS: Menu[] = [
    {
        title: 'clothing', type: 'sub', megaMenu: true, children: [
            {
                title: 'men-fashion', type: 'link', children: [
                    { path: '/home/left-sidebar/collection/all', title: 'sports', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'top', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'ethic', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'sports', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'shirts', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'bottom', type: 'link' }
                ]
            },
            {
                title: 'women-fashion', type: 'link', children: [
                    { path: '/home/left-sidebar/collection/all', title: 'dresses', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'skirts', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'western', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'ethic', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'sports', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'top', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'bottom', type: 'link' }
                ]
            },
        ]
    }
]
