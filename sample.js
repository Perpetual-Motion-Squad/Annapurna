import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
    createClient,
    configureChains,
    defaultChains,
    WagmiConfig,
} from "wagmi";

const { provider, webSocketProvider, chains } = configureChains(defaultChains, [
    publicProvider(),
]);

const { connectors } = getDefaultWallets({
    appName: "MoralisV2 Rainbow kit",
    chains,
});

const client = createClient({
    provider,
    connectors,
    webSocketProvider,
    autoConnect: true,
});