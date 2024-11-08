

//import { NextResponse } from "next/server"

const URL:string = process.env.NEXT_PUBLIC_BASE_URL_DATA as string;
export async function GET(req: Request) {
  try {
    const response = await fetch(`${URL}?action=getAgents`, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const payments = await response.json();
    
    return new Response(JSON.stringify(payments), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Failed to fetch agents:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export const revalidate = 0;


