import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { base } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import ExamplesPage from "./components/ExamplesPage";
import DocsPage from "./components/DocsPage";

// Create a new query client for React Query
const queryClient = new QueryClient();

// Configure wagmi & RainbowKit
const config = getDefaultConfig({
  appName: "PayMyGas Demo",
  projectId: "paymygas-demo", // Get a projectId at https://cloud.walletconnect.com
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="examples" element={<ExamplesPage />} />
                <Route path="docs" element={<DocsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
