"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useToast } from "@/hooks/use-toast";

const apiUrl = process.env.NEXT_PUBLIC_BASE_URL_DATA as string


interface Tagents{
  AgentId:string,
  AgentName:string,
}

interface Props{
  refreshPayments:boolean,
  setRefreshPayments:(refreshPayments:boolean)=>void,

}

export function PaymentForm({refreshPayments,setRefreshPayments}:Props) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    agentCode: "",
    agentName: "",
    amount: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const [agentsData,setAgentsData]=useState<Tagents[]>([])



  
      const agentsDatabase:any = {};
  
      agentsData?.forEach(agent => {
        // Assuming you want to format AgentId as a 4-digit string
        const formattedAgentId = `${agent.AgentId.toString().padStart(3, '0')}`;
        agentsDatabase[formattedAgentId] = agent.AgentName;
      });
  

  //console.log(agentsDatabase)

  const handleAgentCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setFormData(prev => ({
      ...prev,
      agentCode: code,
      agentName: agentsDatabase[code as keyof typeof agentsDatabase] || "",
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.agentCode || !formData.agentName || !formData.amount) {
      toast({
        title: "Success",
        description: `Please fill in all fields`,
      })

      
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid",
        description: `Please Enter Valid Amount`,
      })

      return;
    }




    // try {
    //   const response = await fetch(`${apiUrl}?action=addNewRecordsPay`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       AgentsId: formData.agentCode,
    //       Date: new Date(),
    //       Amount: formData.amount,
    //     }),
    //   });
    
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    
    //   const data = await response.json();
    //   setRefreshPayments(!refreshPayments);
    
    //   toast({
    //     title: "Success",
    //     description: `Payment submitted successfully!`,
    //   });
    
    //   setFormData({
    //     agentCode: "",
    //     agentName: "",
    //     amount: "",
    //   });
    // } catch (error) {
    //   console.error('Error:', error);
    //   toast({
    //     title: "Error",
    //     description: `Failed to submit payment. Please try again.`,
    //   });
    // }

















    try {

      const xmlHttp = new XMLHttpRequest()
        
      xmlHttp.open('POST', `${apiUrl}?action=addNewRecordsPay`, true) // false for synchronous request
       
            if(xmlHttp.readyState==1){
              //SetLoading(true)
            }else {
              //SetLoading(false)
            }
  
                  let newValues ={
                      AgentsId:formData.agentCode,
                      Date:new Date(),
                      Amount:formData.amount,
                    
                      
                  }
          xmlHttp.send(JSON.stringify(newValues)) // new agent

          xmlHttp.onload = function (){
            setRefreshPayments(!refreshPayments)
         }
        
          xmlHttp.onerror = function () {
          console.log(xmlHttp.responseText)
         }

         toast({
          title: "Success",
          description: `Payment submitted successfully!`,
        })


      setFormData({
        agentCode: "",
        agentName: "",
        amount: "",
      });
    } catch (error) {
      toast({
        title: "Success",
        description: `Failed to submit payment. Please try again.`,
      })
    
    }
  };



  // useEffect(() => {
  //   const getPayments = async () => {
  //     setIsLoading(true);
  //     setError(null); // Reset error on each fetch

  //     try {
  //       const response = await fetch('/api/fetchagents');

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setAgentsData(data.data || []); // Handle missing "data" property
  //     } catch (error) {
  //       console.error('Error fetching agents:', error);
  //       setError(error); // Store error for display
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   getPayments();
  // }, []);

  useEffect(() => {
    const getAgents = async () => {
      try {
        const response = await fetch("/api/fetchagents");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAgentsData(data.data);
        console.log(data.data);
      } catch (error) {
        console.error("Failed to fetch agents:", error);
      }
    };
  
    getAgents();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <label htmlFor="agentCode" className="text-sm font-medium text-gray-700 block">
          Agent Code
        </label>
        <Input
          id="agentCode"
          name="agentCode"
          value={formData.agentCode}
          onChange={handleAgentCodeChange}
          placeholder="Enter agent code"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="agentName" className="text-sm font-medium text-gray-700 block">
          Agent Name
        </label>
        <Input
          id="agentName"
          name="agentName"
          value={formData.agentName}
          readOnly
          placeholder="Agent name will auto-populate"
          className="bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium text-gray-700 block">
          Amount
        </label>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
          required
          min="0.01"
        />
      </div>

      <Button type="submit" variant='outline' className="w-full">
        Submit Payment
      </Button>
    </form>
  );
}