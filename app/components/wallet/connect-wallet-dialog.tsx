import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import type { EIP6963ProviderDetail } from './injected-wallet-provider/types';
import { useSyncProviders } from '~/hooks/useSyncProviders';
import { toast } from "sonner";
import { getBalance, useWalletStore } from "~/store/wallet-store";
import { createPublicClient, createWalletClient, type Address, type PublicClient, type WalletClient } from "viem";
import { custom } from "viem";
import { contractAddress } from "./constants";

declare global {
    interface Window {
        ethereum?: any;
    }
}

interface ConnectWalletDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const createViemPublicClient = (providerDetails: EIP6963ProviderDetail): PublicClient => {

    // This creates a public client using the Sepolia chain and the custom transport
    const publicClient = createPublicClient({
        transport: custom( providerDetails.provider ),
    });

    return publicClient;
}

const createViemWalletClient = (providerDetails: EIP6963ProviderDetail): WalletClient => {

    // This creates a wallet client using the Sepolia chain and the custom transport
    const walletClient = createWalletClient({
        transport: custom( providerDetails.provider ),
    });

    return walletClient;
}

export function ConnectWalletDialog({ open, onOpenChange }: ConnectWalletDialogProps) {

    const providers = useSyncProviders();
    // Access the client
    const { setMainAccount, setIsWalletConnected, setEIP6963Provider, setPublicClient, setWalletClient, setWalletBalance, setContractBalance} = useWalletStore((state) => state)
    
    const handleConnect = async ( providerWithInfo: EIP6963ProviderDetail ) => {
        const accounts: string[] | undefined =
        await (
            providerWithInfo.provider
            .request({ method: 'eth_requestAccounts' })
            .catch(err => {
                console.error(err);
                toast.error(
                    "Uh oh! Something went wrong.", 
                    {
                        description: `Error: ${err.message}`,
                        className: "bg-red-500 text-white",
                        action: "destructive",
                    }
                )
                return { selectedWallet: undefined, userAccount: undefined };
            })
            .finally(() => {
                // setIsLoading(false);
            })
        ) as string[] | undefined;

        if (accounts?.[0]) {
            // Set the provider details
            setEIP6963Provider(providerWithInfo);
            // Create the public client
            const viemPublicClient: PublicClient = createViemPublicClient(providerWithInfo);
            // Set the public client
            setPublicClient(viemPublicClient);
            // Create the wallet client
            const viemWalletClient: WalletClient = createViemWalletClient(providerWithInfo);
            // Set the public client
            setWalletClient(viemWalletClient);
            // Set the main account
            setMainAccount(accounts?.[0]);
            // Set the wallet connected status
            setIsWalletConnected(true);
            // Get the balance
            const walletBalance = await getBalance(viemPublicClient, accounts?.[0] as Address);
            console.log('walletBalance', walletBalance);
            setWalletBalance(walletBalance);
            // Get the contract balance
            const contractBalance = await getBalance(viemPublicClient, contractAddress as Address);
            console.log('contractBalance', contractBalance);
            setContractBalance(contractBalance);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="sm:max-w-md bg-slate-900">
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl text-white"> Wallets Detected </DialogTitle>
                    <DialogDescription className="text-center text-gray-400"> Choose a wallet provider to connect </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-3 py-6">
                {
                    providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
                        <div key={provider.info.name}>
                            <Button
                                type="submit"
                                variant="secondary"
                                className="flex cursor-pointer w-full justify-between items-center h-16 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                                onClick={ () => handleConnect(provider) }>
                                <div className="flex items-center gap-3">
                                    <img src={provider.info.icon} alt={provider.info.name} className="w-8 h-8" />
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium text-lg">{provider.info.name}</span>
                                        <span className="text-sm text-white">Connect your wallet</span>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    )) :
                        <div className="text-center text-gray-400">
                            No Announced Wallet Providers
                        </div>
                }

                </div>
                <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-2">
                    {/* <Button variant="secondary" onClick={() => open = false }>
                        <X className="w-4 h-4" />
                        Cancel
                    </Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

}
