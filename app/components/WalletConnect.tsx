'use client';

import { useState, useCallback, useEffect } from 'react';
import { Button, VStack } from '@chakra-ui/react';
import { web3Modal } from '../utils/web3ModalConfig';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext';
import { useError } from '../context/errorContext';
import { createAccount } from '../utils/api';

interface WalletConnectProps {
  onConnect: (address: string) => void;
}

const WalletConnect = ({ onConnect }: WalletConnectProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useAuth();
  const { setError } = useError();

  const connectWallet = useCallback(async () => {
    setLoading(true);
    try {
      const provider = await web3Modal.connect();
      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();

      localStorage.setItem('userAddress', address);
      dispatch({ type: 'LOGIN', payload: address });
      onConnect(address);
      router.push(`/account?address=${address}`);
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      setError('Failed to connect wallet');
    }
    setLoading(false);
  }, [dispatch, onConnect, router, setError]);

  const handleCreateAccount = useCallback(async () => {
    if (state.address) {
      setLoading(true);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum as any);
        const signer = provider.getSigner();

        await createAccount(state.address, signer);
        setLoading(false);
      } catch (err) {
        console.error('Failed to create account:', err);
        setError('Failed to create account');
      }
      setLoading(false);
    }
  }, [state.address, setError]);

  const disconnectWallet = useCallback(async () => {
    await web3Modal.clearCachedProvider();
    localStorage.removeItem('userAddress');
    dispatch({ type: 'LOGOUT' });
    router.push('/');
  }, [dispatch, router]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [connectWallet]);

  return (
    <VStack spacing={4}>
      {state.address ? (
        <>
          <Button onClick={disconnectWallet} isLoading={loading} loadingText="Disconnecting">
            Disconnect Wallet
          </Button>
          <Button onClick={handleCreateAccount} isLoading={loading} loadingText="Creating Account">
            Create Account
          </Button>
        </>
      ) : (
        <Button onClick={connectWallet} isLoading={loading} loadingText="Connecting">
          Connect Wallet
        </Button>
      )}
    </VStack>
  );
};

export default WalletConnect;
