import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

import { Button } from "../ui/button"
import { Image } from "lucide-react"

export function AssetTable() {
    return (
        <div className="rounded-md border border-slate-800 bg-slate-950/50">
        <Table>
            <TableHeader>
            <TableRow className="hover:bg-transparent">
                <TableHead className="w-[250px]">Asset</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead className="text-right">APY</TableHead>
                <TableHead className="text-right">Collateral</TableHead>
                <TableHead></TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {assets.map((asset) => (
                <TableRow key={asset.name} className="hover:bg-slate-900/50">
                <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                    <div className="relative size-8">
                        <Image path={asset.icon} className="size-8" />

                        {/* <Image src={asset.icon || "/placeholder.svg"} alt={asset.name} width={32} height={32} /> */}
                    </div>
                    <div>
                        <div>{asset.name}</div>
                        <div className="text-xs text-slate-500">{asset.symbol}</div>
                    </div>
                    </div>
                </TableCell>
                <TableCell className="text-right">
                    <div>{asset.balance}</div>
                    <div className="text-xs text-slate-500">${asset.balanceUsd}</div>
                </TableCell>
                <TableCell className="text-right text-emerald-500">{asset.apy}</TableCell>
                <TableCell className="text-right">
                    {asset.isCollateral ? (
                    <div className="inline-flex h-6 items-center rounded-full border border-emerald-700/50 bg-emerald-500/10 px-2 text-xs font-medium text-emerald-500">
                        Yes
                    </div>
                    ) : (
                    <div className="inline-flex h-6 items-center rounded-full border border-slate-700 bg-slate-800/50 px-2 text-xs font-medium text-slate-400">
                        No
                    </div>
                    )}
                </TableCell>
                <TableCell>
                    <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                    >
                        Supply
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-slate-100"
                    >
                        Withdraw
                    </Button>
                    </div>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </div>
    )
}

const assets = [
    {
        name: "Ethereum",
        symbol: "ETH",
        icon: "/placeholder.svg?height=32&width=32",
        balance: "2.45 ETH",
        balanceUsd: "4,532.67",
        apy: "3.2%",
        isCollateral: true,
    },
    {
        name: "USD Coin",
        symbol: "USDC",
        icon: "/placeholder.svg?height=32&width=32",
        balance: "3,250.00 USDC",
        balanceUsd: "3,250.00",
        apy: "5.8%",
        isCollateral: true,
    },
    {
        name: "Wrapped Bitcoin",
        symbol: "WBTC",
        icon: "/placeholder.svg?height=32&width=32",
        balance: "0.12 WBTC",
        balanceUsd: "3,456.78",
        apy: "1.9%",
        isCollateral: true,
    },
    {
        name: "Dai Stablecoin",
        symbol: "DAI",
        icon: "/placeholder.svg?height=32&width=32",
        balance: "1,500.00 DAI",
        balanceUsd: "1,500.00",
        apy: "4.5%",
        isCollateral: false,
    },
]
