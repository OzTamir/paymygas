import { Link } from "react-router-dom";
import { useState } from "react";
import { PayMyGas } from "./PayMyGas";

const DocsPage = () => {
  const [activeTab, setActiveTab] = useState<string>("getting-started");

  // Demo wallet address for examples
  const DEMO_WALLET_ADDRESS = "0x1234567890123456789012345678901234567890";

  // Function to determine the active class for tabs
  const isActive = (tabId: string) => {
    return activeTab === tabId
      ? "bg-blue-600 text-white"
      : "bg-gray-800 text-gray-300 hover:bg-gray-700";
  };

  // Render the content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "getting-started":
        return <GettingStarted setTab={setActiveTab} />;
      case "installation":
        return <Installation setTab={setActiveTab} />;
      case "usage":
        return (
          <Usage demoAddress={DEMO_WALLET_ADDRESS} setTab={setActiveTab} />
        );
      case "configuration":
        return <Configuration setTab={setActiveTab} />;
      case "customization":
        return (
          <Customization
            demoAddress={DEMO_WALLET_ADDRESS}
            setTab={setActiveTab}
          />
        );
      case "advanced":
        return <Advanced />;
      default:
        return <GettingStarted setTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="py-16 px-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-xl text-gray-300">
            Everything you need to know about implementing PayMyGas
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="md:w-64 flex-shrink-0">
            <nav className="space-y-1 sticky top-24">
              <button
                onClick={() => setActiveTab("getting-started")}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${isActive(
                  "getting-started"
                )}`}
              >
                Getting Started
              </button>
              <button
                onClick={() => setActiveTab("installation")}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${isActive(
                  "installation"
                )}`}
              >
                Installation
              </button>
              <button
                onClick={() => setActiveTab("usage")}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${isActive(
                  "usage"
                )}`}
              >
                Basic Usage
              </button>
              <button
                onClick={() => setActiveTab("configuration")}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${isActive(
                  "configuration"
                )}`}
              >
                Configuration Options
              </button>
              <button
                onClick={() => setActiveTab("customization")}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${isActive(
                  "customization"
                )}`}
              >
                Customization
              </button>
              <button
                onClick={() => setActiveTab("advanced")}
                className={`w-full px-4 py-3 rounded-lg text-left font-medium transition ${isActive(
                  "advanced"
                )}`}
              >
                Advanced Usage
              </button>
              <div className="pt-6">
                <Link
                  to="/examples"
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  → View Examples
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

// Individual content sections
const GettingStarted = ({ setTab }: { setTab: (tab: string) => void }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Getting Started</h2>
    <p className="text-gray-300">
      PayMyGas is a React component that enables crypto donations on your
      website or app. It's designed to be easy to integrate, fully customizable,
      and works across different EVM-compatible blockchains.
    </p>

    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
      <ul className="space-y-2 text-gray-300 list-disc pl-6">
        <li>Zero platform fees - all donations go directly to the recipient</li>
        <li>Simple integration with React applications</li>
        <li>Full customization support through props</li>
        <li>Built on Base blockchain with support for other EVM chains</li>
        <li>Seamless wallet integration via RainbowKit</li>
        <li>Customizable donation options and amounts</li>
        <li>Mobile-responsive design</li>
      </ul>
    </div>

    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-white">Prerequisites</h3>
      <p className="text-gray-300">To use PayMyGas, you'll need:</p>
      <ul className="space-y-2 text-gray-300 list-disc pl-6">
        <li>A React project (v16.8+ with hooks support)</li>
        <li>An Ethereum wallet address to receive donations</li>
        <li>Basic familiarity with React and npm/yarn</li>
      </ul>
    </div>

    <div className="pt-4">
      <p className="text-gray-300">
        Ready to add PayMyGas to your project? Continue to the{" "}
        <button
          onClick={() => setTab("installation")}
          className="text-blue-400 hover:text-blue-300"
        >
          Installation
        </button>{" "}
        section to get started.
      </p>
    </div>
  </div>
);

const Installation = ({ setTab }: { setTab: (tab: string) => void }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Installation</h2>
    <p className="text-gray-300">
      Follow these steps to add PayMyGas to your React project.
    </p>

    <div className="space-y-8">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white">
          1. Install the package
        </h3>
        <p className="text-gray-300">
          Use npm, yarn, or pnpm to install the PayMyGas package:
        </p>
        <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <pre className="text-gray-300">
            <code>npm install paymygas</code>
          </pre>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <pre className="text-gray-300">
            <code>yarn add paymygas</code>
          </pre>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white">
          2. Install peer dependencies
        </h3>
        <p className="text-gray-300">
          PayMyGas relies on the following peer dependencies:
        </p>
        <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <pre className="text-gray-300">
            <code>
              npm install @rainbow-me/rainbowkit wagmi viem
              @tanstack/react-query
            </code>
          </pre>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white">
          3. Set up providers
        </h3>
        <p className="text-gray-300">
          PayMyGas requires several providers to be set up in your application:
        </p>
        <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <pre className="text-gray-300">
            <code>
              {`import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";
import { http } from "viem";

// Import styles for RainbowKit
import "@rainbow-me/rainbowkit/styles.css";

// Create a new query client for React Query
const queryClient = new QueryClient();

// Configure wagmi & RainbowKit
const config = getDefaultConfig({
  appName: "My App",
  projectId: "YOUR_PROJECT_ID", // Get one from https://cloud.walletconnect.com
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
          {/* Your app here */}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-gray-300">
          With the installation complete, you're ready to add the PayMyGas
          component to your application. Continue to the{" "}
          <button
            onClick={() => setTab("usage")}
            className="text-blue-400 hover:text-blue-300"
          >
            Basic Usage
          </button>{" "}
          section to learn how to implement the component.
        </p>
      </div>
    </div>
  </div>
);

const Usage = ({
  demoAddress,
  setTab,
}: {
  demoAddress: string;
  setTab: (tab: string) => void;
}) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Basic Usage</h2>
    <p className="text-gray-300">
      After installing the package and setting up the providers, you can add the
      PayMyGas component to your application.
    </p>

    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-white">
        Simple Implementation
      </h3>
      <p className="text-gray-300">
        Here's the most basic implementation, with only the required recipient
        address:
      </p>
      <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <pre className="text-gray-300">
          <code>
            {`import { PayMyGas } from "paymygas";

function MyComponent() {
  return (
    <PayMyGas recipientAddress="${demoAddress}" />
  );
}`}
          </code>
        </pre>
      </div>

      <div className="mt-4 bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h4 className="text-lg font-semibold text-white mb-3">Result:</h4>
        <div className="flex justify-center">
          <PayMyGas recipientAddress={demoAddress} />
        </div>
      </div>
    </div>

    <div className="space-y-3 pt-6">
      <h3 className="text-xl font-semibold text-white">
        Standard Implementation
      </h3>
      <p className="text-gray-300">
        A more typical implementation with custom button text and modal title:
      </p>
      <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <pre className="text-gray-300">
          <code>
            {`import { PayMyGas } from "paymygas";

function MyComponent() {
  return (
    <PayMyGas
      recipientAddress="${demoAddress}"
      buttonText="⛽️ Pay My Gas"
      modalTitle="Support My Work"
      modalDescription="Choose an amount to cover some gas and support ongoing development!"
    />
  );
}`}
          </code>
        </pre>
      </div>

      <div className="mt-4 bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h4 className="text-lg font-semibold text-white mb-3">Result:</h4>
        <div className="flex justify-center">
          <PayMyGas
            recipientAddress={demoAddress}
            buttonText="⛽️ Pay My Gas"
            modalTitle="Support My Work"
            modalDescription="Choose an amount to cover some gas and support ongoing development!"
          />
        </div>
      </div>
    </div>

    <div className="pt-6">
      <p className="text-gray-300">
        For more information on customizing the appearance and behavior of the
        component, see the{" "}
        <button
          onClick={() => setTab("configuration")}
          className="text-blue-400 hover:text-blue-300"
        >
          Configuration Options
        </button>{" "}
        section.
      </p>
    </div>
  </div>
);

const Configuration = ({ setTab }: { setTab: (tab: string) => void }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Configuration Options</h2>
    <p className="text-gray-300">
      PayMyGas offers several configuration options to customize its appearance
      and behavior. Here's a comprehensive list of all available props.
    </p>

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider bg-gray-900">
              Prop
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider bg-gray-900">
              Type
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider bg-gray-900">
              Default
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider bg-gray-900">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 bg-gray-800">
          <tr>
            <td className="px-4 py-3 text-sm text-white font-medium">
              recipientAddress
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">
              <code>string</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">-</td>
            <td className="px-4 py-3 text-sm text-gray-300">
              The Ethereum wallet address that will receive donations (required)
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-white font-medium">
              chainId
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">
              <code>number</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">8453 (Base)</td>
            <td className="px-4 py-3 text-sm text-gray-300">
              The chain ID for the blockchain network to use
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-white font-medium">
              buttonText
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">
              <code>string</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">"Pay My Gas"</td>
            <td className="px-4 py-3 text-sm text-gray-300">
              Text displayed on the donation button
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-white font-medium">
              buttonClassName
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">
              <code>string</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">-</td>
            <td className="px-4 py-3 text-sm text-gray-300">
              Additional CSS classes to style the button
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-white font-medium">
              modalTitle
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">
              <code>string</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">
              "Support My Work"
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">
              Title displayed at the top of the donation modal
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-white font-medium">
              modalDescription
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">
              <code>string</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">
              "Choose an amount to support ongoing development!"
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">
              Description text displayed in the donation modal
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm text-white font-medium">
              donationOptions
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">
              <code>object</code>
            </td>
            <td className="px-4 py-3 text-sm text-gray-300">Default options</td>
            <td className="px-4 py-3 text-sm text-gray-300">
              Custom donation options (see Customization)
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="pt-6">
      <p className="text-gray-300">
        For information on customizing donation options, see the{" "}
        <button
          onClick={() => setTab("customization")}
          className="text-blue-400 hover:text-blue-300"
        >
          Customization
        </button>{" "}
        section.
      </p>
    </div>
  </div>
);

const Customization = ({
  demoAddress,
  setTab,
}: {
  demoAddress: string;
  setTab: (tab: string) => void;
}) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Customization</h2>
    <p className="text-gray-300">
      PayMyGas can be customized to match your website's design and preferred
      donation structure.
    </p>

    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-white">Button Styling</h3>
      <p className="text-gray-300">
        You can customize the button's appearance using the{" "}
        <code>buttonClassName</code> prop:
      </p>
      <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <pre className="text-gray-300">
          <code>
            {`<PayMyGas
  recipientAddress="${demoAddress}"
  buttonText="☕ Buy Me a Coffee"
  buttonClassName="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-full"
/>`}
          </code>
        </pre>
      </div>

      <div className="mt-4 bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h4 className="text-lg font-semibold text-white mb-3">Result:</h4>
        <div className="flex justify-center">
          <PayMyGas
            recipientAddress={demoAddress}
            buttonText="☕ Buy Me a Coffee"
            buttonClassName="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-full"
          />
        </div>
      </div>
    </div>

    <div className="space-y-3 pt-6">
      <h3 className="text-xl font-semibold text-white">
        Custom Donation Options
      </h3>
      <p className="text-gray-300">
        By default, PayMyGas provides four donation options: Spare Change ($5),
        Half Tank ($10), Full Tank ($20), and a Custom amount. You can customize
        these options using the <code>donationOptions</code> prop:
      </p>
      <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <pre className="text-gray-300">
          <code>
            {`// Define custom donation options
const customOptions = {
  spare_change: {
    label: "Bronze",
    value: 5,
    description: "Bronze supporter",
    emoji: "🥉",
  },
  half_tank: {
    label: "Silver",
    value: 15,
    description: "Silver supporter",
    emoji: "🥈",
  },
  full_tank: {
    label: "Gold",
    value: 30,
    description: "Gold supporter",
    emoji: "🥇",
  },
  // Note: The "custom" option is always available by default
};

// Use the custom options
<PayMyGas
  recipientAddress="${demoAddress}"
  buttonText="🏆 Support My Work"
  modalTitle="Become a Supporter"
  donationOptions={customOptions}
/>`}
          </code>
        </pre>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h4 className="text-lg font-semibold text-white mb-2">
          Donation Option Structure
        </h4>
        <p className="text-gray-300 mb-4">
          Each donation option has the following properties:
        </p>
        <ul className="space-y-2 text-gray-300 list-disc pl-6">
          <li>
            <code>label</code>: The name of the donation tier
          </li>
          <li>
            <code>value</code>: The donation amount in USDC
          </li>
          <li>
            <code>description</code>: A short description shown in the modal
          </li>
          <li>
            <code>emoji</code>: An emoji icon to represent the tier
          </li>
        </ul>
      </div>
    </div>

    <div className="pt-6">
      <p className="text-gray-300">
        For more advanced customization options, see the{" "}
        <button
          onClick={() => setTab("advanced")}
          className="text-blue-400 hover:text-blue-300"
        >
          Advanced Usage
        </button>{" "}
        section.
      </p>
    </div>
  </div>
);

const Advanced = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-white">Advanced Usage</h2>
    <p className="text-gray-300">
      This section covers advanced usage scenarios for PayMyGas, including using
      different blockchains, handling events, and troubleshooting common issues.
    </p>

    <div className="space-y-3">
      <h3 className="text-xl font-semibold text-white">
        Supporting Multiple Chains
      </h3>
      <p className="text-gray-300">
        PayMyGas works on Base by default, but you can configure it to support
        other EVM-compatible blockchains:
      </p>
      <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <pre className="text-gray-300">
          <code>
            {`import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, optimism, arbitrum } from "wagmi/chains";
import { http } from "viem";

// Create a query client
const queryClient = new QueryClient();

// Configure with multiple chains
const config = getDefaultConfig({
  appName: "My Multi-Chain App",
  projectId: "YOUR_PROJECT_ID",
  chains: [base, optimism, arbitrum],
  transports: {
    [base.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
  },
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {/* Use PayMyGas with a specific chain */}
          <PayMyGas
            recipientAddress="0x..."
            chainId={10} // Optimism chainId
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}`}
          </code>
        </pre>
      </div>
    </div>

    <div className="space-y-3 pt-6">
      <h3 className="text-xl font-semibold text-white">
        Handling Transactions
      </h3>
      <p className="text-gray-300">
        When a user completes a donation, you might want to perform certain
        actions, such as showing a thank you message or updating your UI.
        PayMyGas provides callback props for transaction events:
      </p>
      <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
        <pre className="text-gray-300">
          <code>
            {`import { PayMyGas } from "paymygas";
import { useState } from "react";

function MyComponent() {
  const [lastTxHash, setLastTxHash] = useState("");
  const [donationStatus, setDonationStatus] = useState("");

  const handleTransactionSubmitted = (txHash) => {
    setLastTxHash(txHash);
    setDonationStatus("Transaction submitted! Waiting for confirmation...");
  };

  const handleTransactionSuccess = (txHash, amount) => {
    setDonationStatus(\`Thank you for your \${amount} USDC donation!\`);
    // Maybe add the donor to a leaderboard or trigger a special thank you message
  };

  const handleTransactionError = (error) => {
    setDonationStatus(\`Transaction failed: \${error.message}\`);
  };

  return (
    <div>
      <PayMyGas
        recipientAddress="0x..."
        onTransactionSubmitted={handleTransactionSubmitted}
        onTransactionSuccess={handleTransactionSuccess}
        onTransactionError={handleTransactionError}
      />
      
      {donationStatus && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <p>{donationStatus}</p>
          {lastTxHash && (
            <a 
              href={\`https://basescan.org/tx/\${lastTxHash}\`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              View transaction
            </a>
          )}
        </div>
      )}
    </div>
  );
}`}
          </code>
        </pre>
      </div>
    </div>

    <div className="space-y-3 pt-6">
      <h3 className="text-xl font-semibold text-white">Troubleshooting</h3>
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h4 className="text-lg font-semibold text-white mb-3">Common Issues</h4>
        <div className="space-y-4">
          <div>
            <p className="font-medium text-white">Wallet connection issues:</p>
            <p className="text-gray-300">
              Ensure you're using the latest versions of all dependencies and
              that you've correctly set up the RainbowKit and Wagmi providers.
              Double-check your projectId from WalletConnect.
            </p>
          </div>
          <div>
            <p className="font-medium text-white">Transaction failures:</p>
            <p className="text-gray-300">
              Verify that users have sufficient funds for both the donation
              amount and gas fees. Check that the recipient address is valid and
              properly formatted.
            </p>
          </div>
          <div>
            <p className="font-medium text-white">Styling conflicts:</p>
            <p className="text-gray-300">
              If you encounter styling issues, try using more specific CSS
              selectors or check for CSS conflicts in your application.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="pt-6 bg-blue-900/20 p-6 rounded-lg border border-blue-800">
      <h3 className="text-xl font-semibold text-white mb-3">Need More Help?</h3>
      <p className="text-gray-300">
        If you encounter any issues not covered in this documentation, please
        check our{" "}
        <a
          href="https://github.com/oztamir/paymygas/issues"
          className="text-blue-400 hover:text-blue-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Issues
        </a>{" "}
        or open a new issue with details about your problem.
      </p>
    </div>
  </div>
);

export default DocsPage;
