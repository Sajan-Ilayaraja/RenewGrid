
'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { chatbotFlow } from '@/ai/flows/chatbot-flow'; // Disabled for static export
import type { UserDetails, Transaction } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface ChatbotProps {
  userDetails: UserDetails;
  transactions: Transaction[];
}

export default function Chatbot({ userDetails, transactions }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isOpen]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();
    
    // Create context from user data
    const userContext = `
    User Details: House No. ${userDetails.houseNumber}, Owner: ${userDetails.ownerName}, Address: ${userDetails.address}
    Current Meter Reading: ${userDetails.liveMeterReading.toFixed(2)} kWh
    Latest Transaction: ${transactions[0] ? `₹${transactions[0].amount.toFixed(2)} - ${transactions[0].status}` : 'No recent transactions'}
    `;

    try {
      // Try multiple AI APIs in order of preference
      const apis = [
        // Option 1: Hugging Face (free tier)
        {
          url: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_TOKEN || 'hf_your_token_here'}`,
            'Content-Type': 'application/json',
          },
          body: {
            inputs: {
              past_user_inputs: messages.filter(m => m.role === 'user').slice(-3).map(m => m.content),
              generated_responses: messages.filter(m => m.role === 'model').slice(-3).map(m => m.content),
              text: `Context: ${userContext}\n\nUser: ${userMessage}\n\nYou are a helpful energy bill support chatbot. Answer based on the context provided.`,
            },
            parameters: {
              max_length: 200,
              temperature: 0.7,
              do_sample: true,
            }
          }
        },
        // Option 2: OpenAI (if you have an API key)
        {
          url: 'https://api.openai.com/v1/chat/completions',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY || 'your_openai_key_here'}`,
            'Content-Type': 'application/json',
          },
          body: {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `You are a helpful energy bill support chatbot. Use this context to answer user questions: ${userContext}`
              },
              ...messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
              { role: 'user', content: userMessage }
            ],
            max_tokens: 200,
            temperature: 0.7,
          }
        }
      ];

      for (const api of apis) {
        try {
          const response = await fetch(api.url, {
            method: 'POST',
            headers: api.headers,
            body: JSON.stringify(api.body),
          });

          if (response.ok) {
            const data = await response.json();
            
            // Handle different API response formats
            if (data.generated_text) {
              return data.generated_text;
            } else if (data.choices && data.choices[0] && data.choices[0].message) {
              return data.choices[0].message.content;
            }
          }
        } catch (apiError) {
          console.log(`API ${api.url} failed, trying next...`);
          continue;
        }
      }
    } catch (error) {
      console.log('All AI APIs failed, falling back to rule-based responses');
    }

    // Fallback to rule-based responses if API fails
    // Bill-related queries
    if (message.includes('bill') || message.includes('payment') || message.includes('amount')) {
      const latestTransaction = transactions[0];
      if (latestTransaction) {
        return `Your latest bill amount is ₹${latestTransaction.amount.toFixed(2)} and the status is ${latestTransaction.status}. The transaction ID is ${latestTransaction.id}.`;
      }
      return "I can see your transaction history. Your latest bill was processed successfully.";
    }
    
    // Usage queries
    if (message.includes('usage') || message.includes('consumption') || message.includes('meter')) {
      return `Your current meter reading is ${userDetails.liveMeterReading.toFixed(2)} kWh. This represents your total energy consumption.`;
    }
    
    // Account details
    if (message.includes('account') || message.includes('details') || message.includes('address')) {
      return `Your account details: House No. ${userDetails.houseNumber}, Owner: ${userDetails.ownerName}, Address: ${userDetails.address}.`;
    }
    
    // Energy saving tips
    if (message.includes('save') || message.includes('reduce') || message.includes('tips') || message.includes('efficient')) {
      return `Here are some energy-saving tips: 1) Use LED bulbs, 2) Unplug devices when not in use, 3) Set your AC to 24-26°C, 4) Use natural light during the day, 5) Regular maintenance of appliances.`;
    }
    
    // General help
    if (message.includes('help') || message.includes('support')) {
      return `I can help you with: bill information, usage details, account information, energy-saving tips, and payment status. What would you like to know?`;
    }
    
    // Default response
    return `I understand you're asking about "${userMessage}". I can help you with your bill information, usage details, account information, or energy-saving tips. Could you be more specific about what you need?`;
  };

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Get AI response
      const response = await generateResponse(input);
      const botMessage: Message = { 
        role: 'model', 
        content: response
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'model',
        content: 'Sorry, I am having trouble connecting. Please try again later.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="h-14 w-14 rounded-full shadow-lg">
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 z-50 w-full max-w-sm rounded-xl shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Support Chatbot
              </CardTitle>
              <CardDescription>Ask me anything about your bill.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="h-[400px] p-0">
            <div className="flex h-full flex-col">
              <ScrollArea className="flex-1" ref={scrollAreaRef}>
                 <div className="space-y-6 p-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-end gap-2',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {message.role === 'model' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <Bot />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={cn(
                          'max-w-xs rounded-lg px-4 py-2 text-sm',
                          message.role === 'user'
                            ? 'rounded-br-none bg-primary text-primary-foreground'
                            : 'rounded-bl-none bg-muted'
                        )}
                      >
                        {message.content}
                      </div>
                      {message.role === 'user' && (
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <User />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <Bot />
                        </AvatarFallback>
                      </Avatar>
                      <div className="max-w-xs rounded-lg rounded-bl-none bg-muted px-4 py-2 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50" />
                        </div>
                      </div>
                    </div>
                  )}
                 </div>
              </ScrollArea>
              <div className="flex gap-2 border-t p-4">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  disabled={isLoading}
                />
                <Button onClick={handleSend} size="icon" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
