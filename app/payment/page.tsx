"use client";

import { PaymentForm } from "@/components/PaymentForm";
import { PaymentTable } from "@/components/PaymentTable";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const [refreshPayments,setRefreshPayments]=useState<boolean>(false)

  useEffect(() => {
    const auth = sessionStorage.getItem("auth");
    if (auth !== "true") {
      router.push("/");
    }
  }, [router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-2xl flex gap-2 items-center justify-center font-bold text-center mb-8 text-gray-800">
            <p>Payment Form</p> <a className="bg-blue-200 px-2 rounded-lg " target="_blank" href="https://script.google.com/macros/s/AKfycbwZFoHH5mB7l3gSyK9w_dG8TCAzctP9EdBCMtEoYuun302Rvt-6Fwr5h8RaksFSEHxB/exec
                            " > <p className="text-sm">Open-BD </p>
                            </a>
          </div>
          <PaymentForm setRefreshPayments={setRefreshPayments} refreshPayments={refreshPayments}/>
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Payment History
            </h2>
            <PaymentTable  setRefreshPayments={setRefreshPayments} refreshPayments={refreshPayments}/>
          </div>
        </div>
      </div>
    </main>
  );
}