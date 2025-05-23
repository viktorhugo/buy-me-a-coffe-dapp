import { MessageSquareMore } from "lucide-react";

export const NoChatSelectedPage = () => {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="text-center">
                <MessageSquareMore size={40} className="mx-auto mb-4 text-muted-foreground"/>
                <h1 className="text-2xl font-bold">No chat selected</h1>
                <p className="text-balance text-muted-foreground">Please select a chat from the sidebar</p>
            </div>
        </div>
    )
};

export default NoChatSelectedPage;