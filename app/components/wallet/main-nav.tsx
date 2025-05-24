import { Zap } from "lucide-react"
import { Link } from "react-router"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink} from "../ui/navigation-menu"
import { cn } from "~/lib/utils"
import React from "react"

export function MainNav() {
    return (
        <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
                <div className="relative size-8 overflow-hidden rounded-full bg-gradient-to-br from-cyan-400 to-purple-600">
                    <Zap className="absolute inset-0 m-auto size-5 text-white" />
                </div>
                <span className="hidden font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent sm:inline-block">
                    Buy to me coffee 
                </span>
            </Link>
            <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                    {/* <NavigationMenuItem>
                        <Link to="/">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem> */}

                    {/* <NavigationMenuItem>
                        <NavigationMenuTrigger>Markets</NavigationMenuTrigger>
                        <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {markets.map((market) => (
                            <ListItem key={market.title} title={market.title} href={market.href}>
                                {market.description}
                            </ListItem>
                            ))}
                        </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>More</NavigationMenuTrigger>
                        <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {resources.map((resource) => (
                            <ListItem key={resource.title} title={resource.title} href={resource.href}>
                                {resource.description}
                            </ListItem>
                            ))}
                        </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem> */}

                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-800 hover:text-slate-50 focus:bg-slate-800 focus:text-slate-50",
                    className,
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-slate-400">{children}</p>
                </a>
                </NavigationMenuLink>
            </li>
        )
    },
)
ListItem.displayName = "ListItem"

const markets = [
    {
        title: "Core Instance",
        href: "/markets/core",
        description: "Main Ethereum market with the largest selection of assets and yield options.",
    },
    {
        title: "Polygon Market",
        href: "/markets/polygon",
        description: "Fast and low-cost transactions on the Polygon network with competitive yields.",
    },
    {
        title: "Avalanche Market",
        href: "/markets/avalanche",
        description: "High-performance blockchain with quick finality and growing ecosystem.",
    },
    {
        title: "Arbitrum Market",
        href: "/markets/arbitrum",
        description: "Layer 2 scaling solution with Ethereum security and lower gas fees.",
    },
]

const resources = [
    {
        title: "Analytics",
        href: "/analytics",
        description: "Comprehensive data insights and market performance metrics.",
    },
    {
        title: "Developers",
        href: "/developers",
        description: "Documentation, SDKs, and resources for building on our protocol.",
    },
    {
        title: "Security",
        href: "/security",
        description: "Audit reports, bug bounty program, and security practices.",
    },
    {
        title: "Community",
        href: "/community",
        description: "Join our Discord, forum discussions, and community events.",
    },
]
