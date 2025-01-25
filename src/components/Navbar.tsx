"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import path from "path";

const navLinks = [
    {
        path: "/",
        name: "Início"
    },
    {
        path: "/empresas",
        name: "Empresas"
    }
];

function Navbar() {
    const pathName = usePathname() || "/";

    const [hoverLink, setHoverLink] = useState(pathName);

    return (
        <div className="mx-auto border w-[600px] border-blue-300/90 rounded-full mb-12 sticky top-2 z-[100] bg-gray-100/70 backdrop-blur-md">
            <nav className="flex items-center justify-center gap-2 w-full z-[100] rounded-lg">
                {
                    navLinks.map((item, index) => {
                        const isActive = item.path === pathName;

                        return (
                            <Link 
                                key={item.path} 
                                href={item.path} 
                                className={`px-4 py-2 rounded-full text-sm lg:text-base relative no-underline duration-300 ease-in ${isActive ? "text-blue-500" : "text-blue-400" }`}
                                
                                onMouseOver={() => setHoverLink(item.path)}

                                onMouseLeave={() => setHoverLink(pathName)}
                            >
                                <span>{item.name}</span>
                                {
                                    item.path === hoverLink && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-full bg-blue-300/20 rounded-full -z-10" 
                                            layoutId="navbar" 
                                            aria-hidden="true"
                                            style={{
                                                width: "100%"
                                            }}
                                            transition={{
                                                type: "spring",
                                                bounce: 0.25,
                                                stiffness: 100,
                                                damping: 5,
                                                duration: 0.8,
                                            }}
                                            >
                                            
                                        </motion.div>
                                    )
                                }
                            </Link>
                        );
                    })
                }
            </nav>
        </div>
    )
}

export default Navbar;