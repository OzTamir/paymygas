# PayMyGas React Component

A reusable React component for crypto builders and content creators to receive donations. The component provides a clean, professional UI for users to send crypto donations, referencing the "gas" metaphor common in crypto communities.

## Features

- **Simple Integration**: Easy-to-use React component that can be installed via npm/yarn
- **Customizable UI**: Fully customizable text and styling
- **Blockchain Support**: Built on Base by default, configurable for other EVM-compatible chains
- **Wallet Integration**: Seamless wallet connections via RainbowKit
- **Multiple Donation Options**: Preset donation amounts and custom input options
- **Modern Design**: Built with TailwindCSS

## Installation

```bash
npm install paymygas
# or
yarn add paymygas
```

## Usage

```jsx
import { PayMyGas } from "paymygas";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base } from "wagmi/chains";
import { http } from "viem";

// Create a query client for React Query
const queryClient = new QueryClient();

// Configure RainbowKit
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
          <PayMyGas
            recipientAddress="0x1234abcd..."
            buttonText="⛽️ Pay My Gas"
            buttonClassName="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
            modalTitle="Support My Work"
            modalDescription="Choose an amount to cover some gas and support ongoing development!"
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## Props

| Prop             | Type   | Description                                            | Required |
| ---------------- | ------ | ------------------------------------------------------ | -------- |
| recipientAddress | string | Crypto wallet address to receive donations             | ✅       |
| chainId          | number | Chain ID for blockchain transactions (default is Base) | ❌       |
| buttonText       | string | Customizable text displayed on the button              | ❌       |
| buttonClassName  | string | Additional Tailwind classes for button styling         | ❌       |
| modalTitle       | string | Title displayed on the modal                           | ❌       |
| modalDescription | string | Brief description/instructions within the modal        | ❌       |
| donationOptions  | object | Custom donation options to override defaults           | ❌       |

## Donation Options

The component provides four default donation options:

1. **Spare Change** (🪙 $5 USDC): For sending a small tip
2. **Half Tank** (⛽ $10 USDC): For sending a moderate tip
3. **Full Tank** (🚀 $20 USDC): For generous support
4. **Custom** (⚙️): User-specified crypto amount (USDC or native token)

### Custom Donation Options

You can customize the donation options by passing your own `donationOptions` prop:

```jsx
import { PayMyGas } from "paymygas";

const customOptions = {
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
  // You can override just the options you want
  // Unspecified options will use the defaults
};

function App() {
  return (
    <PayMyGas
      recipientAddress="0x1234abcd..."
      donationOptions={customOptions}
    />
  );
}
```

## Wallet Support

The component uses RainbowKit to connect to popular wallets including:

- MetaMask
- Coinbase Wallet
- Rainbow
- WalletConnect
- and many more

## Development

To run the demo project locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/paymygas.git
cd paymygas

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Building the Component

To build the component for production:

```bash
npm run build
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
