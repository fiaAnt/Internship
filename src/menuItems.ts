import { MenuItem } from "./components/Menu";

export const menuItems: MenuItem[] = [
    {
        name: "Home",
        link: "/",
        items: []
    },
    {
        name: "News",
        items: [
            {
                name: "Breaking news",
                link: "/news/breaking",
                items: []
            },
            {
                name: "World news",
                link: "/news/world",
                items: []
            },
        ]
    },
    {
        name: "About",
        items: [
            {
                name: "Company",
                link: "/about/company",
                items: []
            },
            {
                name: "Team",
                link: "/about/team",
                items: []
            }
        ]
    },
    {
        name: "Contact",
        link: "/contact",
        items: []
    }
];