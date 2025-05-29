import { useSyncExternalStore } from "react";
import { store } from "./EIP6963-store";

export const useSyncProviders = () => useSyncExternalStore( store.subscribe, store.value, store.value );