import { ChakraProvider } from '@chakra-ui/react';
import './globals.css';
import { AuthProvider } from './context/authContext';
import { ErrorProvider } from './context/errorContext';
import ErrorAlert from './components/ErrorAlert';
export const metadata = {
  title: 'My Dapp',
  description: 'A simple dapp using Next.js and Chakra UI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <ErrorProvider>
            <ErrorAlert />
          <AuthProvider>
            {children}
            </AuthProvider>
            </ErrorProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}