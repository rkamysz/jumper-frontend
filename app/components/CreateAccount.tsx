import { useState } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import { createAccount } from '../utils/api';

interface CreateAccountProps {
  address: string;
  signer: ethers.Signer;
}

const CreateAccount = ({ address, signer }: CreateAccountProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      await createAccount(address, signer);
      setMessage('Account created successfully');
    } catch (error) {
      setMessage(`Failed to create account: ${(error as Error).message}`);
    }
    setLoading(false);
  };

  return (
    <div>
      <Button onClick={handleCreateAccount} isLoading={loading}>
        Create Account
      </Button>
      {message && <Text mt={4}>{message}</Text>}
    </div>
  );
};

export default CreateAccount;
