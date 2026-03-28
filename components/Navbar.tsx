import Link from "next/link"

const navbarItems = [
    {
        name: 'Sobre nós',
        url: '/sobre'
    },
    // {
    //     name: 'Ajuda',
    //     url: '/help'
    // },
    /*{
        name: 'Extras',
        url: '/#'
    },*/
]

export function NavbarItemsLarge() {
    return (
        <ul className="hidden lg:flex lg:gap-x-12">
            <li>
                <Link href={'/'} className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50 hover:border-1 hover:border-b hover:border-b-yellow-700">Home</Link>
            </li>
            {
                navbarItems.map((item, acc) => {
                    return (
                        <li key={acc}>
                            <Link href={item.url} className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50 hover:border-1 hover:border-b hover:border-b-yellow-700">{item.name}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export function NavbarItemsStandard() {
    return (
        <ul className="gap-y-2 py-6">
            <li>
                <Link href={'/'} className="text-base font-semibold leading-7 py-2 text-gray-900 dark:text-gray-50">Home</Link>
            </li>
            {
                navbarItems.map((item, acc) => {
                    return (
                        <li key={acc} >
                            <Link href={item.url} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-50">{item.name}</Link>
                        </li>
                    )
                })
            }
        </ul >
    )
}