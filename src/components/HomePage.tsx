import { Link } from "react-router-dom";
import { PayMyGas } from "./PayMyGas";

const HomePage = () => {
  // Demo wallet address (replace with your own for testing)
  const DEMO_WALLET_ADDRESS = "0x1234567890123456789012345678901234567890";

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-2 flex justify-center">
            <h2 className="text-lg font-bold text-white/80">
              0% fees. Fully onchain. Open source.
            </h2>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Accept Crypto Donations{" "}
            <span className="text-blue-500">Easily</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            A powerful React component that enables Web3 developers and content
            creators to receive crypto donations with a clean, professional UI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/examples"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-medium transition-colors duration-200"
            >
              View Examples
            </Link>
            <a
              href="https://github.com/oztamir/paymygas"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-lg font-medium transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Try It Now Section (More Compact) */}
      <section className="w-full px-4 py-10">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-3">
                Try PayMyGas Now
              </h2>
              <p className="text-gray-300 mb-4">
                Click the button to see it in action
              </p>
              <div className="bg-gray-800 p-3 rounded-lg overflow-x-auto text-left mb-4 text-sm">
                <pre className="text-gray-300">
                  {`<PayMyGas
  recipientAddress="${DEMO_WALLET_ADDRESS}"
  buttonText="⛽️ Pay My Gas"
/>`}
                </pre>
              </div>
            </div>
            <div className="flex-shrink-0">
              <PayMyGas
                recipientAddress={DEMO_WALLET_ADDRESS}
                buttonText="⛽️ Pay My Gas"
                buttonClassName="text-lg px-6 py-3"
                modalTitle="Support This Project"
                modalDescription="Choose an amount to cover some gas and support ongoing development!"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Use PayMyGas Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Use PayMyGas?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The easiest way to accept crypto donations on your website
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔌",
                title: "Plug and Play",
                description:
                  "Simple integration into React applications with just a few lines of code",
              },
              {
                icon: "🎨",
                title: "Fully Customizable",
                description:
                  "Style the component to match your brand with Tailwind CSS classes",
              },
              {
                icon: "🔗",
                title: "Multi-Chain Support",
                description:
                  "Works with Base by default, configurable for other EVM chains",
              },
              {
                icon: "👛",
                title: "Wallet Integration",
                description:
                  "Connect to popular wallets seamlessly via RainbowKit",
              },
              {
                icon: "💰",
                title: "Zero Fees",
                description:
                  "There's no middleman - donations go directly to your wallet",
              },
              {
                icon: "📱",
                title: "Responsive Design",
                description:
                  "Works beautifully on all devices, from mobile to desktop",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-20 px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to add PayMyGas to your project?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get started in minutes with our simple installation process
          </p>
          <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-left mb-8">
            <pre className="text-sm text-gray-300">
              {`npm install paymygas`}
            </pre>
          </div>
          <Link
            to="/examples"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-medium transition-colors duration-200"
          >
            View Examples
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
