import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from 'react';
import type { EIP6963ProviderDetail } from './injected-wallet-provider/types';
import { useSyncProviders } from '~/hooks/useSyncProviders';

declare global {
    interface Window {
        ethereum?: any;
    }
}

interface ConnectWalletDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function ConnectWalletDialog({ open, onOpenChange }: ConnectWalletDialogProps) {

    const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
    const [userAccount, setUserAccount] = useState<string>('');
    const providers = useSyncProviders();

    const handleConnect = async ( providerWithInfo: EIP6963ProviderDetail ) => {
        const accounts: string[] | undefined =
        await (
            providerWithInfo.provider
            .request({ method: 'eth_requestAccounts' })
            .catch(console.error)
            .finally(() => {
                // setIsLoading(false);
            })
        ) as string[] | undefined;

        if (accounts?.[0]) {
            setSelectedWallet(providerWithInfo);
            setUserAccount(accounts?.[0]);
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
                        <>
                            <Button
                                variant="secondary"
                                className="flex cursor-pointer justify-between items-center h-16 px-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                                onClick={ () => handleConnect(provider) }
                                >
                                <div className="flex items-center gap-3">
                                <img src={provider.info.icon} alt={provider.info.name} />
                                    <div className="flex flex-col items-start">
                                        <span className="font-medium text-lg">{provider.info.name}</span>
                                        <span className="text-sm text-white">Connect your wallet</span>
                                    </div>
                                </div>
                                <div className="absolute right-0 w-24 h-full bg-gradient-to-l from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                            </Button>
                        </>
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
