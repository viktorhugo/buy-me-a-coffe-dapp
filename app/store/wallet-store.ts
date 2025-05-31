import { defineChain, type WalletClient } from 'viem'
import type { PublicClient } from 'viem'
import { create } from 'zustand'
import type { EIP6963ProviderDetail } from '~/components/wallet/injected-wallet-provider/types'

export async function getCurrentChain(client: PublicClient) {
    const chainId = await client.getChainId()
    const currentChain = defineChain({
        id: chainId,
        name: "Ganache Local",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: {
            default: { 
                http: ["http://127.0.0.1:7545"] 
            },
            public: {
                http: ['http://127.0.0.1:7545'],
            },
        },
    })
    return currentChain
}

type WalletStoreProps = {

    mainAccount: string | undefined,
    setMainAccount: (account: string) => void,

    isWalletConnected: boolean,
    setIsWalletConnected: (isConnected: boolean) => void,

    publicClient: PublicClient | undefined,
    setPublicClient: (client: PublicClient) => void,

    walletClient: WalletClient | undefined,
    setWalletClient: (client: WalletClient) => void,

    walletBalance: BigInt,
    setWalletBalance: (balance: BigInt) => void,

    contractBalance: BigInt,
    setContractBalance: (balance: BigInt) => void,

    EIP6963Provider: EIP6963ProviderDetail | undefined,
    setEIP6963Provider: (provider: EIP6963ProviderDetail) => void,
}

export const useWalletStore = create<WalletStoreProps>()( (set) => ({
    mainAccount: undefined,
    setMainAccount: (account: string) => set({ mainAccount: account }),

    isWalletConnected: false,
    setIsWalletConnected: (isConnected: boolean) => set({ isWalletConnected: isConnected }),

    publicClient: undefined,
    setPublicClient: (client: PublicClient) => set({ publicClient: client }),

    walletClient: undefined,
    setWalletClient: (client: WalletClient) => set({ walletClient: client }),

    walletBalance: BigInt(0),
    setWalletBalance: (balance: BigInt) => set({ walletBalance: balance }),

    contractBalance: BigInt(0),
    setContractBalance: (balance: BigInt) => set({ contractBalance: balance }),

    EIP6963Provider: undefined,
    setEIP6963Provider: (provider: EIP6963ProviderDetail) => set({ EIP6963Provider: provider }),

}))
