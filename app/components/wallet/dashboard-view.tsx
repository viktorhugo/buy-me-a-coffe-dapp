import { Info, Wallet } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { MarketCard } from "./market-card";
import { AssetTable } from "./asset-table";
import { Loader } from "../ui/loading";
import { ConnectWalletDialog } from "./connect-wallet-dialog";
import { useWalletStore } from "~/store/wallet-store";
import { coffeAbi, contractAddress } from "./constants";
import { defineChain, type PublicClient } from "viem";

// Make sure the component is exported as default
export const DashboardView = () => {
    
    const { isWalletConnected } = useWalletStore((state) => state);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
            {   isWalletConnected 
                ? <ConnectedView /> 
                : <NotConnectedView />
            }
        </div>
    )
}

function ConnectedView() {
    return (
        <>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-2">
                <CardDescription>Net Worth</CardDescription>
                <CardTitle className="text-2xl">$12,345.67</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-slate-500">+2.5% (24h)</div>
            </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-2">
                <CardDescription>Supplied</CardDescription>
                <CardTitle className="text-2xl">$8,765.43</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-slate-500">Across 4 assets</div>
            </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-2">
                <CardDescription>Borrowed</CardDescription>
                <CardTitle className="text-2xl">$3,210.98</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-slate-500">Across 2 assets</div>
            </CardContent>
            </Card>
            <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader className="pb-2">
                <CardDescription>Health Factor</CardDescription>
                <CardTitle className="text-2xl text-emerald-500">1.87</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-xs text-slate-500">{"Safe (>1.0)"}</div>
            </CardContent>
            </Card>
        </div>

        <Tabs defaultValue="your-assets" className="space-y-4">
            <TabsList className="bg-slate-900/50 border border-slate-800">
                <TabsTrigger value="your-assets">Your Assets</TabsTrigger>
                <TabsTrigger value="markets">Markets</TabsTrigger>
            </TabsList>
            <TabsContent value="your-assets" className="space-y-4">
                <AssetTable />
            </TabsContent>
            <TabsContent value="markets" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <MarketCard
                    name="Core Instance"
                    network="Ethereum"
                    tvl="$4.2B"
                    assets={12}
                    apy="Up to 5.8% APY"
                    iconPath="/placeholder.svg?height=24&width=24"
                    />
                    <MarketCard
                    name="Polygon Market"
                    network="Polygon"
                    tvl="$1.8B"
                    assets={10}
                    apy="Up to 7.2% APY"
                    iconPath="/placeholder.svg?height=24&width=24"
                    />
                    <MarketCard
                    name="Avalanche Market"
                    network="Avalanche"
                    tvl="$950M"
                    assets={8}
                    apy="Up to 6.5% APY"
                    iconPath="/placeholder.svg?height=24&width=24"
                    />
                    <MarketCard
                    name="Arbitrum Market"
                    network="Arbitrum"
                    tvl="$780M"
                    assets={8}
                    apy="Up to 8.1% APY"
                    iconPath="/placeholder.svg?height=24&width=24"
                    />
                    <MarketCard
                    name="Optimism Market"
                    network="Optimism"
                    tvl="$620M"
                    assets={7}
                    apy="Up to 7.8% APY"
                    iconPath="/placeholder.svg?height=24&width=24"
                    />
                    <MarketCard
                    name="Base Market"
                    network="Base"
                    tvl="$410M"
                    assets={6}
                    apy="Up to 9.2% APY"
                    iconPath="/placeholder.svg?height=24&width=24"
                    />
                </div>
            </TabsContent>
        </Tabs>
        </>
    )
}

function NotConnectedView() {

    const { publicClient, mainAccount, walletClient } = useWalletStore((state) => state);
    
    async function getWalletBalance() {
        if (!publicClient || !mainAccount) {
            console.error('No wallet client found');
            return;
        };
        const balance = await publicClient.getBalance({
            address: mainAccount as `0x${string}`,
        });
        return balance;
    }

    async function fund() {
        if (!publicClient || !walletClient) {
            console.error('No wallet client found');
            return;
        };
        const [connectedAccount] = await walletClient.requestAddresses();
        const balance = await publicClient.simulateContract({
            address: contractAddress,
            abi: coffeAbi,
            functionName: 'fund',
            args: [connectedAccount],
        });
        return balance;
    }

    async function getCurrentChain(publicClient: PublicClient) {
        const chainId = await publicClient.getChainId()
        const currentChain = defineChain({
            id: chainId,
            name: "Custom Chain",
            nativeCurrency: {
                name: "Ether",
                symbol: "ETH",
                decimals: 18,
            },
            rpcUrls: {
                default: {
                http: ["http://localhost:8545"],
                },
            },
        })
        return currentChain
    }

    const [showConnectDialog, setShowConnectDialog] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70dvh] text-center">
            
            <Loader />

            <h2 className="text-2xl font-bold mb-2 text-white">Please, connect your wallet</h2>
            <p className="text-slate-400 max-w-md mb-8">
                Please connect your wallet to see your supplies, borrowings, and open positions.
            </p>
            <Button
                onClick={ () => setShowConnectDialog(true) }
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
            >
                <Wallet className="mr-2 size-4" />
                Connect Wallet
            </Button>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                        <Info className="mr-2 size-5 text-cyan-400" />
                        What is NexusFi?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-400">
                        NexusFi is a decentralized, non-custodial liquidity protocol where users can participate as suppliers or
                        borrowers.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                        <Info className="mr-2 size-5 text-cyan-400" />
                        Supply Assets
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-400">
                        Supply your crypto assets to earn interest and use them as collateral for borrowing.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                        <Info className="mr-2 size-5 text-cyan-400" />
                        Borrow Assets
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-400">
                        Borrow against your supplied collateral in a secure and efficient manner.
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Connect Wallet Dialog */}
            <ConnectWalletDialog open={showConnectDialog} onOpenChange={setShowConnectDialog} />
        </div>        
    )
}
