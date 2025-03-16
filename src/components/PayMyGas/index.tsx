import { useState } from "react";
import { PayMyGasButton } from "./PayMyGasButton";
import { PayMyGasModal } from "./PayMyGasModal";
import React from "react";

// Define the donation option types
export type DonationOption =
  | "spare_change"
  | "half_tank"
  | "full_tank"
  | "custom";

// Define the structure for a donation amount
export interface DonationAmount {
  label: string;
  value: number;
  description: string;
  emoji: string;
}

// Type for donation options map
export type DonationOptions = Partial<Record<DonationOption, DonationAmount>>;

export interface PayMyGasProps {
  /**
   * Crypto wallet address to receive donations
   */
  recipientAddress: string;

  /**
   * Chain ID for blockchain transactions (default is Base)
   * @default 8453 // Base
   */
  chainId?: number;

  /**
   * Customizable text displayed on the button
   * @default "⛽️ Pay My Gas"
   */
  buttonText?: string;

  /**
   * Additional Tailwind classes for button styling
   */
  buttonClassName?: string;

  /**
   * Title displayed on the modal
   * @default "Support My Work"
   */
  modalTitle?: string;

  /**
   * Brief description/instructions within the modal
   * @default "Choose an amount to cover some gas and support ongoing development!"
   */
  modalDescription?: string;

  /**
   * Custom donation options
   * Override default donation options with your own
   */
  donationOptions?: DonationOptions;

  /**
   * Custom button element that opens the modal
   * When provided, buttonText and buttonClassName are ignored
   * The onClick handler will be attached to the wrapper div
   */
  customButton?: React.ReactNode;
}

export const PayMyGas = ({
  recipientAddress,
  chainId = 8453, // Base chain ID by default
  buttonText = "⛽️ Pay My Gas",
  buttonClassName = "",
  modalTitle = "Support My Work",
  modalDescription = "Choose an amount to cover some gas and support ongoing development!",
  donationOptions = {}, // Default to empty object for custom donation options
  customButton = null, // Default to null for the custom button
}: PayMyGasProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <>
      {customButton ? (
        // Wrap the custom button in a div with the onClick handler
        <div
          onClick={handleOpenModal}
          className="inline-block cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Open donation modal"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleOpenModal();
              e.preventDefault();
            }
          }}
        >
          {customButton}
        </div>
      ) : (
        // Render the default button
        <PayMyGasButton
          text={buttonText}
          className={buttonClassName}
          onClick={handleOpenModal}
        />
      )}

      <PayMyGasModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        recipientAddress={recipientAddress}
        chainId={chainId}
        title={modalTitle}
        description={modalDescription}
        customDonationOptions={donationOptions}
      />
    </>
  );
};

export default PayMyGas;
