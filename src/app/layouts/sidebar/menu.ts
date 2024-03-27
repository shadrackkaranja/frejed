import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'Dashboard',
        icon: 'ph-gauge',
        link: '/',
    },
    {
        id: 3,
        label: 'Finance',
        icon: 'ph-storefront',
        subItems: [
            {
                id: 4,
                label: 'Assets',
                link: '/finance/assets',
                parentId: 3
            },
            {
                id: 5,
                label: 'Cash & Cash Equivalent',
                link: '/ecommerce/products',
                parentId: 3
            },
            {
                id: 6,
                label: 'Employment Cost',
                link: '/finance/employmentcost',
                parentId: 3
            },
            {
                id: 7,
                label: 'Equity',
                link: '/finance/equity',
                parentId: 3
            },
            {
                id: 7,
                label: 'Expenses',
                link: '/finance/expenses',
                parentId: 3
            },
            {
                id: 8,
                label: 'Financial Reports',
                link: '/finance/financialreports',
                parentId: 3
            },
            {
                id: 9,
                label: 'Management Accounts',
                link: '/finance/managementaccounts',
                parentId: 3
            },
            {
                id: 10,
                label: 'Payables',
                link: '/finance/payables',
                parentId: 3
            },
            {
                id: 11,
                label: 'Projects',
                link: '/finance/projects',
                parentId: 3
            },
            {
                id: 12,
                label: 'Recievables',
                link: '/finance/recievables',
                parentId: 3
            },
            {
                id: 13,
                label: 'Revenue',
                link: '/finance/revenue',
                parentId: 3
            },
            {
                id: 14,
                label: 'Taxation',
                link: '/finance/taxation',
                parentId: 3
            },
        ]
    },
    
]