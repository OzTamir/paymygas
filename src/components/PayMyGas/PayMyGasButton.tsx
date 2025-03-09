import React from "react";

interface PayMyGasButtonProps {
  /**
   * Button text
   */
  text: string;

  /**
   * Additional Tailwind classes for button styling
   */
  className?: string;

  /**
   * Click handler function
   */
  onClick: () => void;
}

export const PayMyGasButton: React.FC<PayMyGasButtonProps> = ({
  text,
  className = "",
  onClick,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick();
    }
  };

  return (
    <button
      className={`button-primary ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={text}
    >
      {text}
    </button>
  );
};
