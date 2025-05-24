import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ArrowRight } from "lucide-react"
import { Button } from "../ui/button"

interface MarketCardProps {
    name: string
    network: string
    tvl: string
    assets: number
    apy: string
    iconPath: string
}

export function MarketCard({ name, network, tvl, assets, apy, iconPath }: MarketCardProps) {
    return (
        <Card className="overflow-hidden border-slate-800 bg-slate-900/50 transition-all hover:border-slate-700 hover:bg-slate-900/80">
        <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
            <div className="relative size-6">
                {/* <Image  src={iconPath || "/placeholder.svg"} alt={network} width={24} height={24} /> */}
            </div>
            <div>
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription>{network}</CardDescription>
            </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
                <div className="text-slate-500">Total Value Locked</div>
                <div className="font-medium">{tvl}</div>
            </div>
            <div>
                <div className="text-slate-500">Available Assets</div>
                <div className="font-medium">{assets}</div>
            </div>
            <div className="col-span-2">
                <div className="text-slate-500">Earn</div>
                <div className="font-medium text-emerald-500">{apy}</div>
            </div>
            </div>
        </CardContent>
        <CardFooter>
            <Button variant="ghost" className="w-full justify-between">
                <span>View Market</span>
                <ArrowRight className="size-4" />
            </Button>
        </CardFooter>
        </Card>
    )
}
