import { MainNav } from '~/components/wallet/main-nav';
import { UserNav } from '~/components/wallet/nav-bar';
import { DashboardView } from '~/components/wallet/dashboard-view';
import type { Route } from './+types/home-layout';
import { getSession } from '~/sessions.server';
import { useFetcher } from 'react-router';
import { Toaster } from 'sonner';


// Executed when the route is loaded, (RouteModule)
export const loader = async ({ request, context, params }: Route.LoaderArgs) => {
    console.log('loader called - Server');
    const session = await getSession();
    const main_account = session.get('walletAddress');
    return { message: "Hello, world Loader Data! - Server", data: { main_account } };
}

export async function clientLoader({ serverLoader, request, context, params }: Route.ClientLoaderArgs) {
    console.log('client Loader called - Client')
    // const session = await getSession();
    // const main_account = session.get('walletAddress');
    return { message: "Hello, world Loader Data! - Server", data: {params  } };
}

export async function action({ request, context, params }: Route.ActionArgs) { // action que llega al backend
    console.log('action - side action called'); 
    const data = await request.formData();
    console.log('action  =>> request.formData()', { data }); 
    const amount = data.get('amount');
    // checkValidationForm();
    // can still call the server action if needed
    return { amount } ;
}

const MainLayout = ({
    loaderData,
    actionData,
    params,
}: Route.ComponentProps ) => {

    const fetcher = useFetcher();
    if (fetcher?.data) {
        console.log(' MainLayout =>> data fetcher', fetcher);
    }

    // console.log(' MainLayout =>> loaderData', loaderData);
    // console.log(' MainLayout =>> actionData', actionData);

    return (
        <div className="flex min-h-dvh flex-col bg-gradient-to-b from-slate-950 to-slate-900">
            <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
                <div className="flex h-16 items-center px-4 sm:px-6">
                    <MainNav />
                    <div className="ml-auto flex items-center space-x-3">
                        <UserNav/>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <DashboardView />
            </main>
            <footer className="border-t border-slate-800 bg-slate-950 py-4 text-center text-xs text-slate-500">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div className="flex space-x-4 mb-2 sm:mb-0">
                            <a href="https://victormos.dev" className="hover:text-slate-300">
                                Portfolio
                            </a>
                        </div>
                        <div>
                            <span>© 2025 Victor Mosquera. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </footer>

            <Toaster position="top-right" />
        </div>
    )
}
export default MainLayout;