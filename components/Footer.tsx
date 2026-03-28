import Link from "next/link"
import { InstagramLogo, LinkedinLogo, TwitterLogo } from "phosphor-react";
import vfLogo from './../public/vflogo.png'
import Image from "next/image";


export function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 w-full mx-auto">
            <div className="mx-auto max-w-7xl space-y-8 px-4 py-12 sm:px-6 lg:space-y-16 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href={"/"} className="-m-1.5 p-1.5 font-bold text-yellow-500">
                        <Image
                            src={vfLogo}
                            alt="Mockup Demonstrativa - MacBook Pro 16" />
                    </Link>
                    <ul className="mt-8 flex justify-start gap-6 sm:mt-0 sm:justify-end">
                        <li>
                            <Link
                                href="https://www.linkedin.com/company/vf-do-brasil-ltda/"
                                rel="noreferrer"
                                target="_blank"
                                className="text-yellow-700 transition hover:opacity-75"
                            >
                                <span className="sr-only">LinkedIn</span>
                                <LinkedinLogo className="h-8 w-8 fill-transparent stroke-yellow-700 hover:stroke-white hover:fill-yellow-700"/>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/"
                                rel="noreferrer"
                                target="_blank"
                                className="text-yellow-700 transition hover:opacity-75"
                            >
                                <span className="sr-only">Instagram</span>
                                <InstagramLogo className="h-8 w-8 fill-transparent stroke-yellow-700 hover:stroke-white hover:fill-yellow-700" />
                            </Link>
                        </li>

                        <li>
                            <Link
                                href="/"
                                rel="noreferrer"
                                target="_blank"
                                className="text-yellow-700 transition hover:opacity-75"
                            >
                                <span className="sr-only">Twitter</span>
                                <TwitterLogo className="h-8 w-8 stroke-none outline-yellow-700 fill-yellow-700 transition hover:opacity-90" />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="grid grid-cols-1 gap-8 border-t border-gray-100 pt-8 sm:grid-cols-2 lg:grid-cols-3 lg:pt-16 dark:border-gray-700">

                    <div>
                        <p className="font-medium text-yellow-700">Institucional</p>
                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <Link href="/sobre" className="text-gray-700 transition hover:opacity-75 dark:text-gray-300">
                                    Sobre nós
                                </Link>
                            </li>
                            <li>
                                <Link href="/sobre" className="text-gray-700 transition hover:opacity-75 dark:text-gray-300">
                                    #TimeLutea
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-medium text-yellow-700">Contato</p>
                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-300">
                                    Fale Conosco
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-300">
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-300">
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-700 transition hover:opacity-75 dark:text-gray-300">
                                    Twitter
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-medium text-yellow-700">Ajuda</p>
                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <Link href="/help" className="text-gray-700 transition hover:opacity-75 dark:text-gray-300">
                                    Perguntas Frequentes
                                </Link>
                            </li>
                        </ul>
                    </div>

                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    &copy; 2026. VF Brasil Comercio e Serviços Ltda - ME - Várzea Paulista SP. Todos os direitos reservados. Av. Rio Jundiaí, 300 - Várzea Paulista - SP
                </p>
            </div>
        </footer>
    )
}