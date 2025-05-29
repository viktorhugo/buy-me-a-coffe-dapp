import type { WalletClient } from 'viem'
import type { PublicClient } from 'viem'
import { create } from 'zustand'
import type { EIP6963ProviderDetail } from '~/components/wallet/injected-wallet-provider/types'

type WalletStoreProps = {
    mainAccount: string | undefined,
    setMainAccount: (account: string) => void,

    isWalletConnected: boolean,
    setIsWalletConnected: (isConnected: boolean) => void,

    publicClient: PublicClient | undefined,
    setPublicClient: (client: PublicClient) => void,

    walletClient: WalletClient | undefined,
    setWalletClient: (client: WalletClient) => void,

    walletBalance: number,
    setWalletBalance: (balance: number) => void,

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

    walletBalance: 0,
    setWalletBalance: (balance: number) => set({ walletBalance: balance }),

    EIP6963Provider: undefined,
    setEIP6963Provider: (provider: EIP6963ProviderDetail) => set({ EIP6963Provider: provider }),

}))
