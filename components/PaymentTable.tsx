"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
//const apiUrl:string = process.env.GOOGLE_SCRIPT_URL as string

// Mock data for the table

interface Tpayment{
  AgentsId:string,
  Date:string,
  Amount:string,
}

interface Props{
  refreshPayments:boolean,
  setRefreshPayments:(refreshPayments:boolean)=>void,

}

export function PaymentTable({refreshPayments,setRefreshPayments}:Props) {
  const [payments,setPayments]=useState<Tpayment[]>([])

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);



  // useEffect(() => {
  //   const getPayments = async () => {
  //     setIsLoading(true);
  //     setError(null); // Reset error on each fetch

  //     try {
  //       const response = await fetch('/api/fetchpayments');

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setPayments(data.data || []); // Handle missing "data" property
  //     } catch (error) {
  //       console.error('Error fetching agents:', error);
  //       setError(error); // Store error for display
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   getPayments();
  // }, [!refreshPayments]);







  // useEffect(()=>{
  //   const getPayments= async ()=>{
  //     try{
  //         const Payments:Tpayment| any =  await fetch("/api/fetchpayments").then((res)=>res?.json().then(data=>data.data))

  //         setPayments(Payments);
          
  //     }catch(error){
  //         console.log(error)
  //     }

  // }

  // getPayments()

  // },[refreshPayments])

  useEffect(() => {
    const getPayments = async () => {
      try {
        const response = await fetch("/api/fetchpayments");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPayments(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };
  
    getPayments();
  }, [refreshPayments]);


  return (
    <div className="rounded-md border">
      <ScrollArea className="h-[400px] w-full">
        <Table>
          <TableHeader className="sticky top-0 bg-white">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Agent Code</TableHead>
              {/* <TableHead>Agent Name</TableHead> */}
              <TableHead className="text-right">Amount</TableHead>
              {/* <TableHead>Status</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment,i) => (
              <TableRow key={i}>
                <TableCell>{new Date(payment.Date).toLocaleString()}</TableCell>
                <TableCell>{payment.AgentsId}</TableCell>
                {/* <TableCell>{payment.agentName}</TableCell> */}
                <TableCell className="text-right">
                  ₦{Number(payment.Amount).toFixed(2)}
                </TableCell>
                {/* <TableCell>
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                    {payment.status}
                  </span>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}