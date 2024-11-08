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
        const formattedAgentName = agent.AgentName.toLocaleLowerCase();
        agentsDatabase[formattedAgentName] = agent.AgentId;
      });
  


  const handleAgentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      agentName: name,
      agentCode: agentsDatabase[name as keyof typeof agentsDatabase] || "",
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
        <label htmlFor="agentName" className="text-sm font-medium text-gray-700 block">
          Agent Name
        </label>
        <Input
          id="agentName"
          name="agentName"
          value={formData.agentName}
          onChange={handleAgentNameChange}
          placeholder="Enter agent Name"
         
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="agentCode" className="text-sm font-medium text-gray-700 block">
          Agent Code
        </label>
        <Input
          id="agentCode"
          name="agentCode"
          value={formData.agentCode}
          readOnly
          placeholder="Agent code will auto-populate"
          className="bg-gray-50"
          required
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

      <Button type="submit"  variant='outline' className="w-full bg-blue-200">
        Submit Payment
      </Button>
    </form>
  );
}