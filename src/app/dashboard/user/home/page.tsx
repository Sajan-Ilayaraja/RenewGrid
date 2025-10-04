
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Home, User, MapPin, CreditCard, Receipt, Zap } from 'lucide-react';
import Chatbot from '@/components/dashboard/Chatbot';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase';
import { getFirestore, doc, getDoc, collection, getDocs, query, orderBy, writeBatch, setDoc } from 'firebase/firestore';
import type { UserDetails, Transaction } from '@/lib/data';
import { defaultUserDetails, defaultTransactions } from '@/lib/data';

async function createInitialUserData(userId: string): Promise<{userDetails: UserDetails, transactions: Transaction[]}> {
    const db = getFirestore(app);
    const batch = writeBatch(db);

    // Set user details
    const userDocRef = doc(db, 'users', userId);
    batch.set(userDocRef, defaultUserDetails);

    // Set transactions
    const transactionsColRef = collection(db, 'users', userId, 'transactions');
    defaultTransactions.forEach(transaction => {
        const transDocRef = doc(transactionsColRef);
        batch.set(transDocRef, {...transaction, id: transDocRef.id });
    });

    await batch.commit();
    return { userDetails: defaultUserDetails, transactions: defaultTransactions };
}


export default function UserDashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isDataLoading, setIsDataLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return; // Wait for auth state to be determined
        if (!user) {
            router.push('/dashboard/user');
            return;
        }

        const fetchData = async () => {
            setIsDataLoading(true);
            try {
                const db = getFirestore(app);
                
                // Fetch User Details
                const userDocRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userDocRef);

                let fetchedUserDetails: UserDetails | null = null;
                let fetchedTransactions: Transaction[] = [];

                if (docSnap.exists()) {
                    fetchedUserDetails = docSnap.data() as UserDetails;
                     // Fetch Transactions
                    const transactionsColRef = collection(db, 'users', user.uid, 'transactions');
                    const q = query(transactionsColRef, orderBy('date', 'desc'));
                    const querySnapshot = await getDocs(q);
                    fetchedTransactions = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()} as Transaction));
                } else {
                   // If user data doesn't exist, create it
                   console.log("User data not found, creating initial data...");
                   const { userDetails: newDetails, transactions: newTransactions } = await createInitialUserData(user.uid);
                   fetchedUserDetails = newDetails;
                   fetchedTransactions = newTransactions;
                }
                
                setUserDetails(fetchedUserDetails);
                setTransactions(fetchedTransactions);


            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsDataLoading(false);
            }
        };

        fetchData();

    }, [user, authLoading, router]);

    if (authLoading || isDataLoading) {
        return <div className="container flex min-h-screen items-center justify-center"><p>Loading...</p></div>;
    }

    if (!userDetails) {
       return (
        <div className="container flex min-h-screen items-center justify-center">
            <div className="text-center">
                <p className="text-xl text-muted-foreground">Could not load user details.</p>
                <p className="text-muted-foreground">Please contact support if this issue persists.</p>
                <Button
                  onClick={async () => {
                    try {
                      await getAuth(app).signOut();
                      router.push('/dashboard');
                    } catch (e) {
                      console.error('Logout failed', e);
                    }
                  }}
                  className="mt-4"
                >
                  Logout
                </Button>
            </div>
        </div>
       );
    }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Dashboard</h2>
         <Button
           onClick={async () => {
             try {
               await getAuth(app).signOut();
               router.push('/dashboard');
             } catch (e) {
               console.error('Logout failed', e);
             }
           }}
         >
           Logout
         </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Owner Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="flex items-center gap-2 text-muted-foreground">
              <Home className="h-4 w-4" /> House No: {userDetails.houseNumber}
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" /> Name: {userDetails.ownerName}
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> Address: {userDetails.address}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Live Meter Reading
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-6xl font-bold text-primary">{userDetails.liveMeterReading.toFixed(2)}</div>
            <div className="text-muted-foreground">kWh</div>
            <div className="text-sm text-muted-foreground mt-2">
              As of {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <Button className="mt-4 w-full">
                <CreditCard className="mr-2 h-4 w-4" /> Pay Electricity Bill
            </Button>
          </CardContent>
        </Card>
         <Card className="flex items-center justify-center">
            <CardHeader className="text-center">
                <CardTitle>Need Help?</CardTitle>
                <CardDescription>Our AI assistant is here to answer your questions about your bill, usage, and more.</CardDescription>
                 <div className="pt-4">
                    <p className="text-sm text-muted-foreground">Click the chat icon on the bottom right!</p>
                </div>
            </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Past Transactions
          </CardTitle>
          <CardDescription>
            View your payment history.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>₹{transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === 'Paid' ? 'secondary' : 'destructive'
                      }
                      className={transaction.status === 'Paid' ? 'bg-green-100 text-green-800' : ''}
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
       <Chatbot userDetails={userDetails} transactions={transactions} />
    </div>
  );
}
