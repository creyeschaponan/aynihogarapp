import { Stack } from 'expo-router'
import AuthProvider from '../providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Layout() {
    
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Stack 
                    screenOptions={{ 
                        headerShown: false,
                        animationDuration: 200,
                        animation: 'flip'
                    }}
                >
                    <Stack.Screen name="(auth)" options={{ title: 'Sign In' }} />
                </Stack>
            </AuthProvider>
        </QueryClientProvider>
    )
}
