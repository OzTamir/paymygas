import { useState } from "react";
import { PayMyGasButton } from "./PayMyGasButton";
import { PayMyGasModal } from "./PayMyGasModal";

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
}

export const PayMyGas = ({
  recipientAddress,
  chainId = 8453, // Base chain ID by default
  buttonText = "⛽️ Pay My Gas",
  buttonClassName = "",
  modalTitle = "Support My Work",
  modalDescription = "Choose an amount to cover some gas and support ongoing development!",
  donationOptions = {}, // Default to empty object for custom donation options
}: PayMyGasProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  return (
    <>
      <PayMyGasButton
        text={buttonText}
        className={buttonClassName}
        onClick={handleOpenModal}
      />

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
