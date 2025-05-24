import type { Route } from "./+types/home";
import { Navigate, redirect } from "react-router";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Buy Me A Coffee DApp" },
    { 
      name: "description", 
      content: "Welcome Buy Me A Coffee DApp - A decentralized application for buying coffee To Victor Mosquera!" // TODO: change this name from env variable
    },
  ];
}

export const loader = async () => { // no se ha cargado el componente
  return redirect('/main');
} 

// Create a client
const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigate to="/main" />
    </QueryClientProvider> 
  )
}
