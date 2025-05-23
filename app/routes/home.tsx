import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Navigate, redirect } from "react-router";
import { ThemeProvider } from "next-themes";

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

export default function Home() {
  return (
    <ThemeProvider>
      <Navigate to="/main" />
    </ThemeProvider> 
  )
}
