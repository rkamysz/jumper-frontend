'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Box, Flex, Text, IconButton, Heading, Button, Avatar, VStack } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { ethers } from 'ethers';
import { useAuth } from '../context/authContext';
import { useError } from '../context/errorContext';
import { fetchAccount, fetchTokens, createAccount } from '../utils/api';
import TokenList from '../components/TokenList';
import { web3Modal } from '../utils/web3ModalConfig';

const Dashboard = () => {
  const searchParams = useSearchParams();
  const address = searchParams.get('address');
  const router = useRouter();
  const { state, dispatch } = useAuth();
  const { setError } = useError();
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState(null);
  const [tokens, setTokens] = useState([]);
  const [loadingTokens, setLoadingTokens] = useState(true);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!state.address) {
      router.push('/');
      return;
    }

    const initSigner = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const signer = provider.getSigner();
        setSigner(signer);
      }
    };
    initSigner();
  }, [router, state.address]);

  useEffect(() => {
    if (address) {
      const getAccount = async () => {
        try {
          const accountData = await fetchAccount(address);
          setAccount(accountData);
        } catch (err) {
          console.error(err);
          setError((err as Error).message);
        }
        setLoadingAccount(false);
      };
      getAccount();

      const getTokens = async () => {
        try {
          const tokenData = await fetchTokens(address);
          setTokens(tokenData);
        } catch (err) {
          console.error(err);
          setError((err as Error).message);
        }
        setLoadingTokens(false);
      };
      getTokens();
    }
  }, [address, setError]);

  const handleCreateAccount = async () => {
    if (address && signer) {
      try {
        await createAccount(address, signer);
        const accountData = await fetchAccount(address);
        setAccount(accountData);
        setMessage('Account created successfully');
      } catch (error) {
        setMessage(`Failed to create account: ${(error as Error).message}`);
        setError((error as Error).message);
      }
    }
  };

  const handleLogout = () => {
    web3Modal.clearCachedProvider();
    localStorage.removeItem('userAddress');
    dispatch({ type: 'LOGOUT' });
    router.push('/');
  };

  if (!address || !signer) return <Text>Loading...</Text>;

  return (
    <Flex height="100%">
      <Box w="30%" p={4} borderRight="1px" borderColor="gray.200">
        <VStack spacing={4} align="stretch" height="100%">
          <Box textAlign="center">
            <Avatar size="xl" mb={4} />
            <Text fontSize="sm" isTruncated>
              {address}
            </Text>
            <IconButton
              icon={<CopyIcon />}
              aria-label="Copy address"
              size="sm"
              onClick={() => navigator.clipboard.writeText(address)}
            />
          </Box>
          {loadingAccount ? (
            <Text>Loading...</Text>
          ) : account !== null && account !== undefined ? (
            <Text>Welcome, {account['name'] || 'unknown user'}</Text>
          ) : (
            <Button onClick={handleCreateAccount}>Create Account</Button>
          )}
          <Button mt="auto" colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </VStack>
      </Box>
      <Box w="70%" p={4}>
        <Heading mb={4}>Tokens</Heading>
        {loadingTokens ? (
          <Text>Loading...</Text>
        ) : (
          <TokenList tokens={tokens} />
        )}
      </Box>
    </Flex>
  );
};

export default Dashboard;
