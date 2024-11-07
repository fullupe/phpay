"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PinInput } from "@/components/PinInput";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (auth === "true") {
      router.push("/payment");
    }
  }, [router]);

  const handlePinSubmit = (pin: string) => {
    // In production, this should be validated against a secure backend
    if (pin === "1234") {
      sessionStorage.setItem("auth", "true");
      router.push("/payment");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Agent Payment System
          </h1>
          <PinInput onComplete={handlePinSubmit} />
        </div>
      </div>
    </main>
  );
}