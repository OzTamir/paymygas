import { useState } from "react";
import { PayMyGas } from "./PayMyGas";

// Demo wallet address (replace with your own for testing)
const DEMO_WALLET_ADDRESS = "0xc386788e19e53d7237eafa955386567d50a4dc60";

// Example custom donation options
const COFFEE_LUNCH_OPTIONS = {
  spare_change: {
    label: "Coffee",
    value: 3,
    description: "Buy me a coffee",
    emoji: "☕",
  },
  half_tank: {
    label: "Lunch",
    value: 15,
    description: "Buy me lunch",
    emoji: "🍔",
  },
};

const MEMBERSHIP_OPTIONS = {
  spare_change: {
    label: "Bronze",
    value: 5,
    description: "Bronze supporter",
    emoji: "🥉",
  },
  half_tank: {
    label: "Silver",
    value: 10,
    description: "Silver supporter",
    emoji: "🥈",
  },
  full_tank: {
    label: "Gold",
    value: 25,
    description: "Gold supporter",
    emoji: "🥇",
  },
};

const CONTENT_CREATOR_OPTIONS = {
  spare_change: {
    label: "Like",
    value: 1,
    description: "Loved your content!",
    emoji: "👍",
  },
  half_tank: {
    label: "Super Like",
    value: 5,
    description: "Really enjoyed your work!",
    emoji: "❤️",
  },
  full_tank: {
    label: "Superfan",
    value: 20,
    description: "I'm your biggest fan!",
    emoji: "⭐",
  },
};

// Custom button example component
const CustomButton = () => (
  <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105">
    <span className="text-xl">🚀</span>
    <span>Power My Project</span>
  </button>
);

const CustomImageButton = () => (
  <div className="relative group cursor-pointer transition-all duration-200 transform hover:scale-105">
    <div className="w-36 h-36 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 p-1">
      <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
        <div className="text-6xl">🎁</div>
      </div>
    </div>
    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs font-bold py-1 px-5 rounded-full shadow-lg text-center">
      Support Me!
    </div>
  </div>
);

const ExamplesPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("default");

  // Helper function to determine which options to use
  const getDonationOptions = () => {
    switch (selectedTab) {
      case "coffee":
        return COFFEE_LUNCH_OPTIONS;
      case "membership":
        return MEMBERSHIP_OPTIONS;
      case "creator":
        return CONTENT_CREATOR_OPTIONS;
      default:
        return {};
    }
  };

  // Helper function to determine button text
  const getButtonText = () => {
    switch (selectedTab) {
      case "coffee":
        return "☕ Buy Me a Coffee";
      case "membership":
        return "🏆 Support My Work";
      case "creator":
        return "❤️ Support My Content";
      case "custom":
        return "🎨 Custom Design";
      case "custom-button":
        return "⛽ Pay My Gas"; // Not used with custom button
      default:
        return "⛽ Pay My Gas";
    }
  };

  // Helper function to determine modal title
  const getModalTitle = () => {
    switch (selectedTab) {
      case "coffee":
        return "Buy Me a Coffee";
      case "membership":
        return "Become a Supporter";
      case "creator":
        return "Support My Content";
      case "custom":
        return "Support This Project";
      case "custom-button":
        return "Power My Project";
      default:
        return "Support My Work";
    }
  };

  // Helper function to determine button styling
  const getButtonClassName = () => {
    switch (selectedTab) {
      case "coffee":
        return "bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-full";
      case "membership":
        return "bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-xl shadow-lg";
      case "creator":
        return "bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg";
      case "custom":
        return "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-xl shadow-md";
      default:
        return "";
    }
  };

  // Example code to display
  const getExampleCode = () => {
    switch (selectedTab) {
      case "coffee":
        return `<PayMyGas
  recipientAddress="${DEMO_WALLET_ADDRESS}"
  buttonText="☕ Buy Me a Coffee"
  buttonClassName="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-full"
  modalTitle="Buy Me a Coffee"
  modalDescription="Your support helps me continue creating!"
  donationOptions={${JSON.stringify(COFFEE_LUNCH_OPTIONS, null, 2)}}
/>`;
      case "membership":
        return `<PayMyGas
  recipientAddress="${DEMO_WALLET_ADDRESS}"
  buttonText="🏆 Support My Work"
  buttonClassName="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-xl shadow-lg"
  modalTitle="Become a Supporter"
  modalDescription="Choose your membership tier to support my work!"
  donationOptions={${JSON.stringify(MEMBERSHIP_OPTIONS, null, 2)}}
/>`;
      case "creator":
        return `<PayMyGas
  recipientAddress="${DEMO_WALLET_ADDRESS}"
  buttonText="❤️ Support My Content"
  buttonClassName="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg"
  modalTitle="Support My Content"
  modalDescription="Your support inspires me to create more content!"
  donationOptions={${JSON.stringify(CONTENT_CREATOR_OPTIONS, null, 2)}}
/>`;
      case "custom":
        return `<PayMyGas
  recipientAddress="${DEMO_WALLET_ADDRESS}"
  buttonText="🎨 Custom Design"
  buttonClassName="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 px-6 rounded-xl shadow-md"
  modalTitle="Support This Project"
  modalDescription="Choose how much you'd like to contribute!"
/>`;
      case "custom-button":
        return `// Define your custom button component
const CustomButton = () => (
  <button
    className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
  >
    <span className="text-xl">🚀</span>
    <span>Power My Project</span>
  </button>
);

// Use the custom button with PayMyGas
// Note: Your button will be wrapped in a div with the onClick handler
<PayMyGas
  recipientAddress="${DEMO_WALLET_ADDRESS}"
  modalTitle="Power My Project"
  modalDescription="Your support helps this project reach new heights!"
  customButton={<CustomButton />}
/>`;
      case "custom-image":
        return `// Define your custom image button component
const CustomImageButton = () => (
  <div className="relative group cursor-pointer transition-all duration-200 transform hover:scale-105">
    <div className="w-36 h-36 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 p-1">
      <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
        <div className="text-6xl">🎁</div>
      </div>
    </div>
    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs font-bold py-1 px-5 rounded-full shadow-lg text-center">
      Support Me!
    </div>
  </div>
);

// Use the custom image button with PayMyGas
<PayMyGas
  recipientAddress="${DEMO_WALLET_ADDRESS}"
  modalTitle="Join My Supporters"
  modalDescription="Your generosity fuels my creativity!"
  customButton={<CustomImageButton />}
/>`;
      default:
        return `<PayMyGas
  recipientAddress="${DEMO_WALLET_ADDRESS}"
  buttonText="⛽ Pay My Gas"
  modalTitle="Support My Work"
  modalDescription="Choose an amount to cover some gas and support ongoing development!"
/>`;
    }
  };

  // Custom button render helper
  const renderButton = () => {
    if (selectedTab === "custom-button") {
      return (
        <PayMyGas
          recipientAddress={DEMO_WALLET_ADDRESS}
          modalTitle="Power My Project"
          modalDescription="Your support helps this project reach new heights!"
          customButton={<CustomButton />}
        />
      );
    } else if (selectedTab === "custom-image") {
      return (
        <PayMyGas
          recipientAddress={DEMO_WALLET_ADDRESS}
          modalTitle="Join My Supporters"
          modalDescription="Your generosity fuels my creativity!"
          customButton={<CustomImageButton />}
        />
      );
    } else {
      return (
        <PayMyGas
          recipientAddress={DEMO_WALLET_ADDRESS}
          buttonText={getButtonText()}
          buttonClassName={getButtonClassName()}
          modalTitle={getModalTitle()}
          modalDescription="Your support helps this project grow!"
          donationOptions={getDonationOptions()}
        />
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Examples
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Explore different ways to use PayMyGas in your projects
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {[
          { id: "default", label: "Default" },
          { id: "coffee", label: "Coffee & Lunch" },
          { id: "membership", label: "Membership Tiers" },
          { id: "creator", label: "Content Creator" },
          { id: "custom", label: "Custom Design" },
          { id: "custom-image", label: "Custom Button" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedTab === tab.id
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Example Display */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {selectedTab === "default"
              ? "Default Configuration"
              : selectedTab === "coffee"
              ? "Coffee & Lunch Theme"
              : selectedTab === "membership"
              ? "Membership Tiers"
              : selectedTab === "creator"
              ? "Content Creator"
              : selectedTab === "custom"
              ? "Custom Styled Button"
              : selectedTab === "custom-button"
              ? "Custom Button Component"
              : "Custom Image Button"}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
            {selectedTab === "default"
              ? "The standard gas-themed donation component with default options."
              : selectedTab === "coffee"
              ? "Perfect for bloggers and indie developers looking for small donations."
              : selectedTab === "membership"
              ? "Great for creators offering membership tiers with different benefits."
              : selectedTab === "creator"
              ? "Ideal for content creators on YouTube, Twitch, or other platforms."
              : selectedTab === "custom"
              ? "A custom-styled button with gradient colors and shadows."
              : selectedTab === "custom-button"
              ? "Pass your own React component as the button to open the donation modal."
              : "Use image-based buttons or complex UI elements as trigger buttons."}
          </p>
        </div>

        <div className="flex justify-center mb-8">{renderButton()}</div>

        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm text-gray-800 dark:text-gray-200">
            {getExampleCode()}
          </pre>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Common Use Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Open Source Projects",
              description:
                "Allow your users to support your open source work with gas-themed donations.",
              icon: "🧑‍💻",
            },
            {
              title: "Content Creators",
              description:
                "Give your audience an easy way to support your videos, streams, or articles.",
              icon: "🎥",
            },
            {
              title: "Digital Artists",
              description:
                "Let fans support your artwork with crypto donations.",
              icon: "🎨",
            },
            {
              title: "Community Projects",
              description:
                "Fund your DAO or community initiatives with transparent on-chain donations.",
              icon: "🏛️",
            },
          ].map((useCase, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start">
                <div className="text-3xl mr-4">{useCase.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {useCase.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Quick Implementation Guide
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              1. Install the Package
            </h3>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
                {`npm install paymygas`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              2. Set Up Providers
            </h3>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
                {`import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";
import { http } from "viem";

// Config
const queryClient = new QueryClient();
const config = getDefaultConfig({
  appName: "My App",
  projectId: "YOUR_PROJECT_ID", // WalletConnect project ID
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              3. Add the Component
            </h3>
            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
                {`import { PayMyGas } from "paymygas";

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <PayMyGas 
            recipientAddress="${DEMO_WALLET_ADDRESS}"
            buttonText="⛽ Pay My Gas"
            modalTitle="Support My Work"
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplesPage;
