import { Coffee, Handshake, Info, Loader2, Wallet } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Loader } from "../ui/loading";
import { ConnectWalletDialog } from "./connect-wallet-dialog";
import { getBalance, getCurrentChainAnvil,getCurrentChainGanache, useWalletStore } from "~/store/wallet-store";
import { abi, contractAddress } from "./constants";
import { ContractFunctionRevertedError, BaseError, parseEther, formatEther, type Abi, type SimulateContractParameters, type Address } from "viem";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Form } from "react-router";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

function getPlainBalance(convertBalance: BigInt | undefined) {
    if (convertBalance) {
        return Number(formatEther(BigInt(convertBalance.toString())));
    }
    return 0;
}

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

    const { publicClient, walletClient, walletBalance, contractBalance, mainAccount, setWalletBalance, setContractBalance } = useWalletStore((state) => state);
    const [ethAmount, setEthAmount] = useState<number | null>(null);
    const [withdrawStatus, setWithdrawStatus] = useState<boolean>(false);
    const [fundStatus, setFundStatus] = useState<boolean>(false);

    // Process the operation
    async function processOperation(operation: 'fund' | 'withdraw') {

        console.log('fund');
        if (!publicClient || !walletClient) {
            console.error('No wallet client found');
            return;
        };
        if (!ethAmount) {
            console.error('No amount provided');
            return;
        };

        const [connectedAccount] = await walletClient.requestAddresses();
        console.log('connectedAccount', connectedAccount);
        if (!connectedAccount) {
            console.error('No connected account');
            return;
        };

        operation === 'fund' ? setFundStatus(true) : setWithdrawStatus(true);

        try {
            // set params to simulateContract
            const parameters: SimulateContractParameters = {
                address: contractAddress,
                abi: abi as Abi,
                functionName: operation,
                // args: [connectedAccount],
                chain: await getCurrentChainAnvil(publicClient),
                value: parseEther(ethAmount.toString()),
                // gas: 300000n,
            }
            console.log('Parameters', parameters);

            // simulateContract
            const { request, result } = await publicClient.simulateContract(parameters);
            console.log('simulateContract', request, result);
            // writeContract
            const txHash = await walletClient.writeContract({
                ...request,
                account: connectedAccount,
            });
            console.log('hash', txHash);

            // Wait confirmation of the transaction
            const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash })
            console.log(`Success ${operation}!`, receipt)

            // Get the contract balance
            const contractBalance = await getBalance(publicClient, contractAddress as Address);
            console.log('contractBalance', contractBalance);
            setContractBalance(contractBalance);

            // Get the wallet balance
            const walletBalance = await getBalance(publicClient, mainAccount as Address);
            console.log('walletBalance', walletBalance);
            setWalletBalance(walletBalance);
            
        } catch (err) {
            console.error('err', err);
            operation === 'fund' ? setFundStatus(false) : setWithdrawStatus(false);
            toast.error(
                "Error", 
                {
                    description: `Error: ${err}`,
                    className: "bg-red-500 text-white",
                    action: "destructive",
                }
            )
            if (err instanceof BaseError) {
                const revertError = err.walk(err => err instanceof ContractFunctionRevertedError)
                if (revertError instanceof ContractFunctionRevertedError) {
                    const errorName = revertError.data?.errorName ?? ''
                    // do something with `errorName`
                    console.log('errorName', errorName);
                }
            }
        }
        
    }

    return (
        <>
            <div className="text-center justify-center">

                <Card className="bg-slate-900/50 border-slate-800 w-[450px] mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">Handler Project</CardTitle>
                        <CardDescription className="text-sm text-slate-400 text-left">Contract Address </CardDescription>
                        <CardDescription className="text-sm text-slate-200 text-left ml-4">{contractAddress}</CardDescription>
                        <CardDescription className="text-sm text-slate-400 text-left mb-4">Contract Balance: { getPlainBalance(contractBalance) } ETH</CardDescription>
                        <CardDescription className="text-sm text-slate-400 text-left">Wallet Address </CardDescription>
                        <CardDescription className="text-sm text-slate-200 text-left ml-4">{mainAccount}</CardDescription>
                        <CardDescription className="text-sm text-slate-400 text-left">Wallet Balance: { getPlainBalance(walletBalance) } ETH</CardDescription>
                    </CardHeader>

                    <Separator className="my-4 text-slate-100" />
                    
                    <Form method="post" className="flex flex-col gap-4">
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="amount" className="text-white">Amount</Label>
                                <Input id="amount" value={ ethAmount || ''} onChange={(e) => setEthAmount(Number(e.target.value))} placeholder="Enter Amount" type="number" name="amount" className="bg-slate-900/50 border-slate-800 text-white" required />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end-safe gap-2 mt-2">
                            <Button type="submit" onClick={() => processOperation('withdraw')}
                            variant="outline"
                            className="w-1/2 cursor-pointer bg-blue-500 border-blue-500 text-white hover:bg-blue-400 hover:border-blue-400 hover:text-white">
                                {
                                    withdrawStatus 
                                        ? (<Loader2 className="animate-spin" size={16} />)
                                        : (
                                            <>
                                                <Handshake className="mr-2 size-4" />
                                                Withdraw
                                            </>
                                        )
                                }
                            </Button>
                            <Button onClick={ () => processOperation('fund') }
                                    variant="outline"
                                    className="w-1/2 cursor-pointer bg-amber-300 text-black border-amber-300 hover:bg-amber-200 hover:border-amber-200">
                                {
                                    fundStatus 
                                        ? (<Loader2 className="animate-spin" size={16} />)
                                        : (
                                            <>
                                            <Coffee className="mr-2 size-4" />
                                            Buy Coffee
                                            </>
                                        )
                                }
                            </Button>
                        </CardFooter>
                    </Form >
                </Card>
            </div>

        </>
    )
}

function NotConnectedView() {

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


// function ConnectedView() {

//     const { publicClient, mainAccount, walletClient } = useWalletStore((state) => state);
    
//     async function getWalletBalance() {
//         if (!publicClient || !mainAccount) {
//             console.error('No wallet client found');
//             return;
//         };
//         const balance = await publicClient.getBalance({
//             address: mainAccount as `0x${string}`,
//         });
//         return balance;
//     }

//     async function fund(ethAmount: number) {
//         if (!publicClient || !walletClient) {
//             console.error('No wallet client found');
//             return;
//         };
//         const [connectedAccount] = await walletClient.requestAddresses();
//         const balance = await publicClient.simulateContract({
//             address: contractAddress,
//             abi: coffeAbi,
//             functionName: 'fund',
//             args: [connectedAccount],
//             chain: await getCurrentChain(publicClient),
//             value: parseEther(ethAmount.toString()),
//         });
//         return balance;
//     }

//     async function getCurrentChain(publicClient: PublicClient) {
//         const chainId = await publicClient.getChainId()
//         const currentChain = defineChain({
//             id: chainId,
//             name: "Custom Chain",
//             nativeCurrency: {
//                 name: "Ether",
//                 symbol: "ETH",
//                 decimals: 18,
//             },
//             rpcUrls: {
//                 default: {
//                 http: ["http://localhost:8545"],
//                 },
//             },
//         })
//         return currentChain
//     }

//     return (
//         <>
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//                 <Card className="bg-slate-900/50 border-slate-800">
//                 <CardHeader className="pb-2">
//                     <CardDescription>Net Worth</CardDescription>
//                     <CardTitle className="text-2xl">$12,345.67</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="text-xs text-slate-500">+2.5% (24h)</div>
//                 </CardContent>
//                 </Card>
//                 <Card className="bg-slate-900/50 border-slate-800">
//                 <CardHeader className="pb-2">
//                     <CardDescription>Supplied</CardDescription>
//                     <CardTitle className="text-2xl">$8,765.43</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="text-xs text-slate-500">Across 4 assets</div>
//                 </CardContent>
//                 </Card>
//                 <Card className="bg-slate-900/50 border-slate-800">
//                 <CardHeader className="pb-2">
//                     <CardDescription>Borrowed</CardDescription>
//                     <CardTitle className="text-2xl">$3,210.98</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="text-xs text-slate-500">Across 2 assets</div>
//                 </CardContent>
//                 </Card>
//                 <Card className="bg-slate-900/50 border-slate-800">
//                 <CardHeader className="pb-2">
//                     <CardDescription>Health Factor</CardDescription>
//                     <CardTitle className="text-2xl text-emerald-500">1.87</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="text-xs text-slate-500">{"Safe (>1.0)"}</div>
//                 </CardContent>
//                 </Card>
//             </div>

//             <Tabs defaultValue="your-assets" className="space-y-4">
//                 <TabsList className="bg-slate-900/50 border border-slate-800">
//                     <TabsTrigger value="your-assets">Your Assets</TabsTrigger>
//                     <TabsTrigger value="markets">Markets</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="your-assets" className="space-y-4">
//                     <AssetTable />
//                 </TabsContent>
//                 <TabsContent value="markets" className="space-y-4">
//                     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                         <MarketCard
//                         name="Core Instance"
//                         network="Ethereum"
//                         tvl="$4.2B"
//                         assets={12}
//                         apy="Up to 5.8% APY"
//                         iconPath="/placeholder.svg?height=24&width=24"
//                         />
//                         <MarketCard
//                         name="Polygon Market"
//                         network="Polygon"
//                         tvl="$1.8B"
//                         assets={10}
//                         apy="Up to 7.2% APY"
//                         iconPath="/placeholder.svg?height=24&width=24"
//                         />
//                         <MarketCard
//                         name="Avalanche Market"
//                         network="Avalanche"
//                         tvl="$950M"
//                         assets={8}
//                         apy="Up to 6.5% APY"
//                         iconPath="/placeholder.svg?height=24&width=24"
//                         />
//                         <MarketCard
//                         name="Arbitrum Market"
//                         network="Arbitrum"
//                         tvl="$780M"
//                         assets={8}
//                         apy="Up to 8.1% APY"
//                         iconPath="/placeholder.svg?height=24&width=24"
//                         />
//                         <MarketCard
//                         name="Optimism Market"
//                         network="Optimism"
//                         tvl="$620M"
//                         assets={7}
//                         apy="Up to 7.8% APY"
//                         iconPath="/placeholder.svg?height=24&width=24"
//                         />
//                         <MarketCard
//                         name="Base Market"
//                         network="Base"
//                         tvl="$410M"
//                         assets={6}
//                         apy="Up to 9.2% APY"
//                         iconPath="/placeholder.svg?height=24&width=24"
//                         />
//                     </div>
//                 </TabsContent>
//             </Tabs>
//         </>
//     )
// }
