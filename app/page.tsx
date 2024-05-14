// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Heading, Text } from '@chakra-ui/react';
import WalletConnect from './components/WalletConnect';
import WalletLinks from './components/WalletLinks';

const Home = () => {
  const [address, setAddress] = useState('');
  const router = useRouter();

  const handleConnect = (address: string) => {
    setAddress(address);
    router.push(`/account?address=${address}`);
  };

  return (
    <Box textAlign="center" py={10}>
      <Heading>Welcome to My Dapp</Heading>
      <Text mt={4}>Connect your wallet to get started</Text>
      <WalletConnect onConnect={handleConnect} />
      <WalletLinks />
    </Box>
  );
};

export default Home;
