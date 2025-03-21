import React, { useState } from "react";
import { useAccount, useSendTransaction, useWriteContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { parseUnits } from "viem";
import { DonationOption, DonationAmount, DonationOptions } from "./index";

// ERC-20 USDC contract addresses for different networks
const USDC_CONTRACT_ADDRESSES: Record<number, `0x${string}`> = {
  // Base (Ethereum L2)
  8453: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913" as `0x${string}`,
  // Ethereum Mainnet
  1: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48" as `0x${string}`,
  // Optimism
  10: "0x7f5c764cbc14f9669b88837ca1490cca17c31607" as `0x${string}`,
  // Arbitrum
  42161: "0xaf88d065e77c8cc2239327c5edb3a432268e5831" as `0x${string}`,
};

// USDC ABI for the transfer function only
const USDC_ABI = [
  {
    constant: false,
    inputs: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

// Function to get USDC contract address based on chainId
const getUsdcContractAddress = (chainId: number): `0x${string}` => {
  return (
    USDC_CONTRACT_ADDRESSES[chainId] ||
    // Default to Base if not found
    USDC_CONTRACT_ADDRESSES[8453]
  );
};

// USDC uses 6 decimals
const USDC_DECIMALS = 6;
// Native tokens (ETH, etc.) use 18 decimals
const NATIVE_DECIMALS = 18;

interface PayMyGasModalProps {
  /**
   * Whether the modal is open or not
   */
  isOpen: boolean;

  /**
   * Close modal handler
   */
  onClose: () => void;

  /**
   * Recipient wallet address
   */
  recipientAddress: string;

  /**
   * Chain ID for blockchain transactions
   * Note: With RainbowKit, chain selection is handled by the ConnectButton
   */
  chainId?: number; // Kept for API compatibility

  /**
   * Modal title
   */
  title: string;

  /**
   * Modal description
   */
  description: string;

  /**
   * Custom donation options
   */
  customDonationOptions?: DonationOptions;
}

export const PayMyGasModal: React.FC<PayMyGasModalProps> = ({
  isOpen,
  onClose,
  recipientAddress,
  chainId = 8453, // Default to Base
  title,
  description,
  customDonationOptions = {},
}) => {
  const [selectedOption, setSelectedOption] = useState<DonationOption | null>(
    null
  );
  const [customAmount, setCustomAmount] = useState<string>("");
  const [currency, setCurrency] = useState<"usdc" | "native">("usdc");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { isConnected } = useAccount();
  const { sendTransaction } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  // Default donation options
  const defaultDonationOptions: Record<DonationOption, DonationAmount> = {
    spare_change: {
      label: "Spare Change",
      value: 5,
      description: "Send a small tip",
      emoji: "🪙",
    },
    half_tank: {
      label: "Half Tank",
      value: 10,
      description: "Send a moderate tip",
      emoji: "⛽",
    },
    full_tank: {
      label: "Full Tank",
      value: 20,
      description: "Generous support",
      emoji: "🚀",
    },
    custom: {
      label: "Custom",
      value: 0,
      description: "User-specified crypto amount",
      emoji: "⚙️",
    },
  };

  // Merge default and custom donation options, with custom taking precedence
  const donationOptions: Record<DonationOption, DonationAmount> = {
    ...defaultDonationOptions,
    ...(customDonationOptions as Record<DonationOption, DonationAmount>),
  };

  const handleSelectOption = (option: DonationOption) => {
    setSelectedOption(option);
    setError(null);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomAmount(value);
    }
  };

  const handleCurrencyChange = (type: "usdc" | "native") => {
    setCurrency(type);
  };

  const handleSendTransaction = async () => {
    try {
      setError(null);
      setIsProcessing(true);

      // Amount validation
      let amount: number;

      if (selectedOption === "custom") {
        if (!customAmount || parseFloat(customAmount) <= 0) {
          throw new Error("Please enter a valid amount");
        }
        amount = parseFloat(customAmount);
      } else if (selectedOption) {
        amount = donationOptions[selectedOption].value;
      } else {
        throw new Error("Please select a donation option");
      }

      // Check if connected
      if (!isConnected) {
        setError("Please connect your wallet first");
        setIsProcessing(false);
        return;
      }

      // Ensure the recipient address is properly formatted for viem
      // Add 0x prefix if missing
      let formattedAddress = recipientAddress;
      if (!formattedAddress.startsWith("0x")) {
        formattedAddress = `0x${formattedAddress}`;
      }

      // Type assertion for viem's expected format
      const toAddress = formattedAddress as `0x${string}`;

      if (currency === "native") {
        // Native token transaction (ETH, etc.)
        await sendTransaction({
          to: toAddress,
          value: parseUnits(`${amount}`, NATIVE_DECIMALS), // Native tokens use 18 decimals
        });
      } else {
        // USDC token transfer
        const usdcAddress = getUsdcContractAddress(chainId);

        // Parse amount with correct decimals (USDC uses 6 decimals)
        const parsedAmount = parseUnits(`${amount}`, USDC_DECIMALS);

        // Call the USDC transfer function
        await writeContractAsync({
          address: usdcAddress,
          abi: USDC_ABI,
          functionName: "transfer",
          args: [toAddress, parsedAmount],
        });
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setSelectedOption(null);
        setCustomAmount("");
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="modal-title">{title}</h2>
          <p className="modal-description">{description}</p>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="mb-4 text-green-500 flex flex-col items-center">
              <div className="text-4xl mb-2">⛽</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Thank You!</h3>
            <p>Your donation has been processed successfully.</p>
          </div>
        ) : (
          <>
            {/* Donation Options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(donationOptions).map(([key, option]) => (
                <div
                  key={key}
                  className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                    selectedOption === key
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                  }`}
                  onClick={() => handleSelectOption(key as DonationOption)}
                >
                  <div className="flex items-center gap-2 font-medium mb-1 justify-center">
                    <span className="text-xl">{option.emoji}</span>
                    <span>{option.label}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {option.description}
                  </div>
                  {key !== "custom" && (
                    <div className="font-bold">${option.value} USDC</div>
                  )}
                </div>
              ))}
            </div>

            {/* Custom Amount Input */}
            {selectedOption === "custom" && (
              <div className="mb-6">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter amount"
                    className="w-full p-2 outline-none"
                  />
                  <div className="flex border-l">
                    <button
                      className={`px-3 py-2 ${
                        currency === "usdc"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                      onClick={() => handleCurrencyChange("usdc")}
                    >
                      USDC
                    </button>
                    <button
                      className={`px-3 py-2 ${
                        currency === "native"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                      onClick={() => handleCurrencyChange("native")}
                    >
                      ETH
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Wallet Connection */}
            <div className="mb-4">
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <div
                      {...(!ready && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                      className="w-full"
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              type="button"
                              className="w-full mb-4 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                            >
                              Connect Wallet
                            </button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button
                              onClick={openChainModal}
                              type="button"
                              className="w-full mb-4 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
                            >
                              Wrong network
                            </button>
                          );
                        }

                        return (
                          <div className="flex flex-col gap-2 mb-4">
                            <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span>{chain.name}</span>
                              </div>
                              <button
                                onClick={openChainModal}
                                className="text-sm text-blue-500"
                              >
                                Change
                              </button>
                            </div>

                            <div className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                              <span>{account.displayName}</span>
                              <button
                                onClick={openAccountModal}
                                className="text-sm text-blue-500"
                              >
                                Disconnect
                              </button>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span className="font-medium">Transaction Failed</span>
                <div className="relative ml-auto flex-shrink-0 group">
                  <div
                    className="w-5 h-5 rounded-full bg-red-200 dark:bg-red-800 flex items-center justify-center cursor-help"
                    aria-label="View error details"
                    tabIndex={0}
                  >
                    <span className="text-red-600 dark:text-red-400 text-xs font-bold">
                      ?
                    </span>
                  </div>
                  <div className="absolute right-0 w-64 p-2 mt-2 bg-white dark:bg-gray-800 rounded shadow-lg border border-gray-200 dark:border-gray-700 invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-opacity z-10 text-xs">
                    {error}
                  </div>
                </div>
              </div>
            )}

            {/* Send Button */}
            <button
              className={`w-full py-3 rounded-xl font-bold text-white transition-colors ${
                isProcessing || !isConnected
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={handleSendTransaction}
              disabled={isProcessing || !isConnected}
            >
              {isProcessing ? "Processing..." : "Send Donation"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
