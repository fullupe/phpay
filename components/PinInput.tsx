"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PinInputProps {
  onComplete: (pin: string) => void;
}

export function PinInput({ onComplete }: PinInputProps) {
  const [pin, setPin] = useState(["", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.querySelector(
          `input[name="pin-${index + 1}"]`
        ) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }

      // Check if PIN is complete
      if (index === 3 && value) {
        const fullPin = [...newPin.slice(0, 3), value].join("");
        if (fullPin.length === 4) {
          handleSubmit(fullPin);
        }
      }
    }
  };

  const handleSubmit = (fullPin: string) => {
    if (fullPin === "1234") {
      onComplete(fullPin);
    } else {
      toast.error("Invalid PIN. Please try again.");
      setPin(["", "", "", ""]);
      const firstInput = document.querySelector(
        'input[name="pin-0"]'
      ) as HTMLInputElement;
      if (firstInput) firstInput.focus();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-sm text-gray-600 mb-4">
        Enter your 4-digit PIN to continue
      </div>
      <div className="flex justify-center gap-2">
        {pin.map((digit, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            name={`pin-${index}`}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            className="w-12 h-12 text-center text-xl"
            maxLength={1}
          />
        ))}
      </div>
      <Button
        className="w-full mt-6"
        onClick={() => handleSubmit(pin.join(""))}
        disabled={pin.some((digit) => !digit)}
      >
        Submit
      </Button>
    </div>
  );
}