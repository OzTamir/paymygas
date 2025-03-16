<p align="center">
  <img src="https://paymygas.xyz/demo.png" alt="Pay My Gas" width="300" />
</p>

<h1 align="center">PayMyGas</h1>

<p align="center">
  <strong>A simple, elegant way for builders and creators to accept crypto donations</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/paymygas"><img src="https://img.shields.io/npm/v/paymygas.svg?style=flat-square" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/paymygas"><img src="https://img.shields.io/npm/dm/paymygas.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://github.com/oztamir/paymygas/blob/main/LICENSE"><img src="https://img.shields.io/github/license/oztamir/paymygas?style=flat-square" alt="license"></a>
</p>

---

## 🚀 Overview

**PayMyGas** is a powerful, customizable React component that enables Web3 developers and content creators to easily accept crypto donations. Built on the Base blockchain (with support for other EVM chains), PayMyGas offers a frictionless experience for both developers and end-users.

With crypto donations themed around "paying for gas," this component adds a playful yet practical way to support your favorite projects and creators.

## ✨ Features

- 🔌 **Plug and Play**: Simple integration into React applications
- 🎨 **Fully Customizable**: Style it to match your brand
- 🔗 **Multi-Chain Support**: Works with Base by default, configurable for other EVM chains
- 👛 **RainbowKit Integration**: Connect to popular wallets seamlessly
- 💸 **Flexible Donations**: Preset amounts or custom input
- 🎭 **Gas-Themed UX**: Engaging metaphor that resonates with crypto users
- 📱 **Responsive Design**: Works beautifully on all devices

## 📦 Installation

```bash
# Using npm
npm install paymygas

# Using yarn
yarn add paymygas

# Using pnpm
pnpm add paymygas
```

## 🔧 Quick Start

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
            modalTitle="Support My Work"
            modalDescription="Choose an amount to cover some gas and support ongoing development!"
          />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## 🛠️ Configuration Options

| Prop             | Type   | Description                                            | Required |
| ---------------- | ------ | ------------------------------------------------------ | -------- |
| recipientAddress | string | Crypto wallet address to receive donations             | ✅       |
| chainId          | number | Chain ID for blockchain transactions (default is Base) | ❌       |
| buttonText       | string | Customizable text displayed on the button              | ❌       |
| buttonClassName  | string | Additional Tailwind classes for button styling         | ❌       |
| modalTitle       | string | Title displayed on the modal                           | ❌       |
| modalDescription | string | Brief description/instructions within the modal        | ❌       |
| donationOptions  | object | Custom donation options to override defaults           | ❌       |

## 🎁 Donation Options

By default, PayMyGas provides these playful donation options:

- **Spare Change** 🪙 ($5 USDC): For sending a small tip
- **Half Tank** ⛽ ($10 USDC): For sending a moderate donation
- **Full Tank** 🚀 ($20 USDC): For generous support
- **Custom** ⚙️: User-specified amount (USDC or native token)

### Customizing Options

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
  // Only specify the options you want to customize
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

## 🔒 Supported Wallets

PayMyGas leverages RainbowKit to connect to all major wallets:

- MetaMask
- Coinbase Wallet
- Rainbow
- WalletConnect
- And many more!

## 💻 Development

```bash
# Clone the repository
git clone https://github.com/yourusername/paymygas.git
cd paymygas

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

## 📚 Examples

Visit [our examples page](https://paymygas.xyz/examples) to see PayMyGas in action across various applications.

## 📝 License

[MIT](LICENSE)

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<p align="center">
  Made with ❤️ by <a href="https://oztamir.com">Oz</a>
</p>
