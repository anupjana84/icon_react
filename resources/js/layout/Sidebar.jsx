import {
    BarChart2,
    DollarSign,
    Menu,
    Settings,
    ShoppingBag,
    ShoppingCart,
    TrendingUp,
    Users,
    Trello,
    PackageSearch,
    ListChecks,
    Building2,
    UserCog,
    UserRoundPlus,
    Tag,
    Blocks,
    HandCoins,
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, usePage } from "@inertiajs/react";

const SIDEBAR_ITEMS = [
    {
        name: "Overview",
        icon: BarChart2,
        color: "#6366f1",
        href: "/",
    },
    {
        name: "Purchase",
        icon: PackageSearch,
        color: "#8B5CF6",
        href: "/purchase",
    },
    {
        name: "Products",
        icon: ShoppingBag,
        color: "#22d3ee",
        href: "/products",
    },
    {
        name: "Stocks",
        icon: Blocks,
        color: "#22d3ee",
        href: "/product-stocks",
    },
    { name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
    {
        name: "Expenses",
        icon: HandCoins,
        color: "#22d3ee",
        href: "/expenses",
    },
    { name: "Users", icon: Users, color: "#EC4899", href: "/users" },
    { name: "Managers", icon: UserCog, color: "#d946ef", href: "/users" },
    {
        name: "Salesmen",
        icon: UserRoundPlus,
        color: "#f43f5e",
        href: "/salesmans",
    },
    {
        name: "Customer",
        icon: Tag,
        color: "#f43f5e",
        href: "/customers",
    },
    { name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/" },
    { name: "Analytics", icon: TrendingUp, color: "#84cc16", href: "/about" },
    { name: "Items", icon: ListChecks, color: "#16a34a", href: "/items" },
    { name: "Brands", icon: Trello, color: "#be185d", href: "/brands" },
    {
        name: "Companies",
        icon: Building2,
        color: "#86198f",
        href: "/companies",
    },
    {
        name: "Settings",
        icon: Settings,
        color: "#a3a3a3",
        href: "/settings/profile",
    },
];

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { url } = usePage();

    // Handle window resize to keep sidebar open on xl screen and above
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1700) {
                setIsSidebarOpen(true); // Sidebar stays open on xl and above
            } else {
                setIsSidebarOpen(false); // Sidebar closes below xl
            }
        };

        window.addEventListener("resize", handleResize);

        // Call it once on mount to set the initial state
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
                isSidebarOpen ? "w-64" : "w-20"
            } xl:w-64`}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
            onMouseEnter={() =>
                window.innerWidth < 1700 && setIsSidebarOpen(true)
            }
            onMouseLeave={() =>
                window.innerWidth < 1700 && setIsSidebarOpen(false)
            }
        >
            <div
                className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md py-4 pl-4  flex flex-col border-r border-gray-700"
                style={{ maxHeight: "100vh" }}
            >
                <nav className="mt-8 flex-grow hover:overflow-y-auto custom-scrollbar pr-4">
                    {SIDEBAR_ITEMS.map((item) => {
                        const isActive = url === item.href;
                        return (
                            <Link key={item.name} href={item.href}>
                                <motion.div
                                    className={`flex items-center p-4 text-sm font-medium rounded-lg transition-colors mb-2 ${
                                        isActive
                                            ? "bg-gray-700 text-white"
                                            : "hover:bg-gray-700 text-gray-400"
                                    }`}
                                >
                                    <item.icon
                                        size={20}
                                        style={{
                                            color: item.color,
                                            minWidth: "20px",
                                        }}
                                    />
                                    <AnimatePresence>
                                        {isSidebarOpen && (
                                            <motion.span
                                                className="ml-4 whitespace-nowrap"
                                                initial={{
                                                    opacity: 0,
                                                    width: 0,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    width: "auto",
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    width: 0,
                                                }}
                                                transition={{
                                                    duration: 0.2,
                                                    delay: 0.3,
                                                }}
                                            >
                                                {item.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </motion.div>
    );
};

export default Sidebar;
