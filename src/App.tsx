import { useState } from "react";
import "./App.css";
import PayMyGas from "./components/PayMyGas";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { base } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";

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

// Demo wallet address (replace with your own for testing)
const DEMO_WALLET_ADDRESS = "0x1234567890123456789012345678901234567890";

// Example custom donation options
const customDonationOptions = {
  spare_change: {
    label: "Coffee",
    value: 3,
    description: "Buy me a coffee",
    emoji: "☕",
  },
  full_tank: {
    label: "Deluxe Support",
    value: 25,
    description: "Premium supporter status",
    emoji: "👑",
  },
};

function App() {
  const [recipientAddress, setRecipientAddress] =
    useState<string>(DEMO_WALLET_ADDRESS);
  const [useCustomOptions, setUseCustomOptions] = useState<boolean>(false);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-bold mb-2">
                PayMyGas Component Demo
              </h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
                A reusable React component for crypto builders and content
                creators to receive donations.
              </p>
            </header>

            <main className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Demo</h2>
                <div className="flex flex-col items-center justify-center gap-8">
                  <div className="flex w-full gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Recipient Address (for testing)
                      </label>
                      <input
                        type="text"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                        placeholder="0x..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="useCustomOptions"
                      checked={useCustomOptions}
                      onChange={(e) => setUseCustomOptions(e.target.checked)}
                      className="rounded"
                    />
                    <label
                      htmlFor="useCustomOptions"
                      className="text-sm font-medium"
                    >
                      Use custom donation options (Coffee & Deluxe Support)
                    </label>
                  </div>

                  <div className="w-full border-t border-b py-8 my-4 flex items-center justify-center">
                    <PayMyGas
                      recipientAddress={recipientAddress}
                      buttonText="⛽️ Pay My Gas"
                      buttonClassName="text-lg"
                      modalTitle="Support This Project"
                      modalDescription="Choose an amount to cover some gas and support ongoing development!"
                      donationOptions={
                        useCustomOptions ? customDonationOptions : {}
                      }
                    />
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Implementation</h2>
                <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  {`<PayMyGas
  recipientAddress="${recipientAddress}"
  chainId={8453}
  buttonText="⛽️ Pay My Gas"
  buttonClassName="text-lg"
  modalTitle="Support This Project"
  modalDescription="Choose an amount to cover some gas and support ongoing development!"
  ${
    useCustomOptions
      ? `donationOptions={${JSON.stringify(customDonationOptions, null, 2)}}`
      : ""
  }
/>`}
                </pre>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Props</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Prop
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Required
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium">
                          recipientAddress
                        </td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 text-sm">
                          Crypto wallet address to receive donations
                        </td>
                        <td className="px-4 py-3 text-sm">✅</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium">
                          chainId
                        </td>
                        <td className="px-4 py-3 text-sm">number</td>
                        <td className="px-4 py-3 text-sm">
                          Chain ID for blockchain transactions (default is Base)
                        </td>
                        <td className="px-4 py-3 text-sm">❌</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium">
                          buttonText
                        </td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 text-sm">
                          Customizable text displayed on the button
                        </td>
                        <td className="px-4 py-3 text-sm">❌</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium">
                          buttonClassName
                        </td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 text-sm">
                          Additional Tailwind classes for button styling
                        </td>
                        <td className="px-4 py-3 text-sm">❌</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium">
                          modalTitle
                        </td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 text-sm">
                          Title displayed on the modal
                        </td>
                        <td className="px-4 py-3 text-sm">❌</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium">
                          modalDescription
                        </td>
                        <td className="px-4 py-3 text-sm">string</td>
                        <td className="px-4 py-3 text-sm">
                          Brief description/instructions within the modal
                        </td>
                        <td className="px-4 py-3 text-sm">❌</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </main>

            <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
              <p>&copy; {new Date().getFullYear()} PayMyGas Component</p>
            </footer>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
