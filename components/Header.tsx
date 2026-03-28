"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavbarItemsLarge } from "./Navbar";
import { Menu, X } from "lucide-react";
import vfLogo from './../public/vflogo.png'
import usaFlag from './../public/usaflag.svg'
import spainFlag from './../public/spainflag.svg'

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="absolute inset-x-0 top-0 z-50 max-w-7xl mx-auto">
            <nav className="flex items-center justify-between px-6 pb-6 pt-2 lg:px-8 " aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href={"/"} className="-m-1.5 p-1.5 font-bold text-2xl size-40 h-min object-contain text-yellow-500">
                        <Image
                            src={vfLogo}
                            alt="Mockup Demonstrativa - MacBook Pro 16" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-yellow-700"
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="h-6 w-6 " aria-hidden="true" />
                    </button>
                </div>
                <NavbarItemsLarge />
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href={"/login"} className="hidden text-sm font-semibold leading-6 text-white px-4 py-1 rounded-md bg-yellow-700">
                        Fazer login
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
                <section className="flex gap-x-2">
                    <Image
                        src={usaFlag}
                        alt="United States flag"
                        className="h-6 w-6"
                    />
                    <Image
                        src={spainFlag}
                        alt="Spain flag"
                        className="h-6 w-6"
                    />
                </section>

            </nav>
            <dialog className="lg:hidden absolute -right-1/3" role="dialog" aria-modal="true" open={mobileMenuOpen}>
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-yellow-900/10 dark:bg-gray-900">
                    <div className="flex items-center justify-between">
                        <Link href={"#"} className="-m-1.5 p-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="50" viewBox="0 0 187 63" fill="none">
                                <path d="M78.08 45V16.8H83.2V40.64H96.72V45H78.08ZM107.95 45.4C103.15 45.4 100.75 42.7067 100.75 37.32V25.44H105.75V37.4C105.75 38.7867 106.03 39.8133 106.59 40.48C107.15 41.1467 108.044 41.48 109.27 41.48C110.604 41.48 111.697 41.0267 112.55 40.12C113.404 39.1867 113.83 37.96 113.83 36.44V25.44H118.83V45H113.95V42.08C112.644 44.2933 110.644 45.4 107.95 45.4ZM134.194 45.4C129.021 45.4 126.434 42.84 126.434 37.72V29.2H122.674V25.44H126.434V19.6H131.434V25.44H137.354V29.2H131.434V37.44C131.434 38.72 131.714 39.68 132.274 40.32C132.834 40.96 133.741 41.28 134.994 41.28C135.368 41.28 135.754 41.24 136.154 41.16C136.554 41.0533 136.968 40.9467 137.394 40.84L138.154 44.52C137.674 44.7867 137.061 45 136.314 45.16C135.594 45.32 134.888 45.4 134.194 45.4ZM151.231 45.4C149.017 45.4 147.111 44.9867 145.511 44.16C143.911 43.3333 142.671 42.16 141.791 40.64C140.937 39.12 140.511 37.32 140.511 35.24C140.511 33.2133 140.924 31.44 141.751 29.92C142.604 28.4 143.764 27.2133 145.231 26.36C146.724 25.48 148.417 25.04 150.311 25.04C153.084 25.04 155.271 25.92 156.871 27.68C158.497 29.44 159.311 31.84 159.311 34.88V36.36H145.311C145.684 39.8533 147.684 41.6 151.311 41.6C152.404 41.6 153.497 41.44 154.591 41.12C155.684 40.7733 156.684 40.24 157.591 39.52L158.991 42.88C158.057 43.6533 156.884 44.2667 155.471 44.72C154.057 45.1733 152.644 45.4 151.231 45.4ZM150.511 28.44C149.044 28.44 147.857 28.8933 146.951 29.8C146.044 30.7067 145.497 31.9333 145.311 33.48H155.151C155.044 31.8533 154.591 30.6133 153.791 29.76C153.017 28.88 151.924 28.44 150.511 28.44ZM170.91 45.4C169.497 45.4 168.23 45.1333 167.11 44.6C166.017 44.04 165.15 43.2933 164.51 42.36C163.897 41.4267 163.59 40.3733 163.59 39.2C163.59 37.76 163.964 36.6267 164.71 35.8C165.457 34.9467 166.67 34.3333 168.35 33.96C170.03 33.5867 172.284 33.4 175.11 33.4H176.51V32.56C176.51 31.2267 176.217 30.2667 175.63 29.68C175.044 29.0933 174.057 28.8 172.67 28.8C171.577 28.8 170.457 28.9733 169.31 29.32C168.164 29.64 167.004 30.1467 165.83 30.84L164.39 27.44C165.084 26.96 165.897 26.5467 166.83 26.2C167.79 25.8267 168.79 25.5467 169.83 25.36C170.897 25.1467 171.897 25.04 172.83 25.04C175.684 25.04 177.804 25.7067 179.19 27.04C180.577 28.3467 181.27 30.3867 181.27 33.16V45H176.59V41.88C176.137 42.9733 175.417 43.84 174.43 44.48C173.444 45.0933 172.27 45.4 170.91 45.4ZM171.95 41.96C173.257 41.96 174.337 41.5067 175.19 40.6C176.07 39.6933 176.51 38.5467 176.51 37.16V36.28H175.15C172.644 36.28 170.897 36.48 169.91 36.88C168.95 37.2533 168.47 37.9467 168.47 38.96C168.47 39.84 168.777 40.56 169.39 41.12C170.004 41.68 170.857 41.96 171.95 41.96Z" fill="#be185d"></path>
                                <path d="M53.3288 37.5533C49.4635 38.6372 45.3794 38.6727 41.4958 37.6562C37.6122 36.6397 34.0692 34.6078 31.2305 31.7692C28.3919 28.9306 26.36 25.3876 25.3435 21.504C24.327 17.6204 24.3625 13.5362 25.4464 9.6709C21.6356 10.7316 18.1691 12.7722 15.3924 15.5895C12.6156 18.4068 10.6254 21.9025 9.62011 25.7283C8.61477 29.5542 8.62935 33.5766 9.66239 37.3951C10.6954 41.2135 12.7109 44.6946 15.508 47.4917C18.3051 50.2889 21.7862 52.3043 25.6047 53.3373C29.4231 54.3704 33.4456 54.385 37.2714 53.3796C41.0972 52.3743 44.5929 50.3841 47.4102 47.6074C50.2275 44.8306 52.2681 41.3642 53.3288 37.5533Z" fill="#be185d"></path>
                            </svg>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-yellow-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    {/* <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <NavbarItemsStandard />
                            <div className="py-6">
                                <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Fazer Login</a>
                            </div>
                        </div>
                    </div> */}
                </div>
            </dialog>
        </header>
    )
}