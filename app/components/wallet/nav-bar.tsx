import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExternalLink, Settings, Wallet } from "lucide-react"
import { useState } from "react"
import { ConnectWalletDialog } from "./connect-wallet-dialog";
import { Form } from "react-router";
import { useWalletStore } from "~/store/wallet-store";



export function UserNav() {
    const [showConnectDialog, setShowConnectDialog] = useState(false);
    const { isWalletConnected, mainAccount, setIsWalletConnected } = useWalletStore((state) => state);

    return (
        <>
            {
                isWalletConnected && mainAccount 
                ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="default"
                                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                            >
                                <Wallet className="mr-2 size-4" />
                                {mainAccount.substring(0,4)}...{mainAccount.substring(mainAccount.length - 4)}
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <ExternalLink className="mr-2 size-4" />
                                    <span>View on Explorer</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 size-4" />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <Form method="post" action="/home">
                                <DropdownMenuItem onClick={() => setIsWalletConnected(false)}>
                                    Disconnect
                                </DropdownMenuItem>
                            </Form>    
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button
                        onClick={() => setShowConnectDialog(true)}
                        className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700"
                    >
                        <Wallet className="mr-2 size-4" />
                        Connect Wallet
                    </Button>
                )
            }

            <ConnectWalletDialog open={showConnectDialog} onOpenChange={setShowConnectDialog} />
        </>
    )
}
