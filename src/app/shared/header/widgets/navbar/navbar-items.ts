export interface Menu {
    path?: string;
    title?: string;
    type?: string;
    megaMenu?: boolean;
    megaMenuType?: string; // small, medium, large
    image?: string;
    children?: Menu[];
}

export const MENUITEMS: Menu[] = [
    {
        title: 'home', type: 'link', path: '/home/shop'
    },
    {
        title: 'shop', type: 'sub', megaMenu: true, megaMenuType: 'large', children: [
            {
                title: 'men-fashion', type: 'link', children: [
                    { path: '/home/left-sidebar/collection/all', title: 'sports', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'top', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'bottom', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'ethic', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'sports', type: 'link' },
                    { path: '/home/left-sidebar/collection/all', title: 'shirts', type: 'link' }
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
            }
        ]
    },
]
