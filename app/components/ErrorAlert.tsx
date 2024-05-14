'use client';

import { useEffect } from 'react';
import { Alert, AlertIcon, Box, CloseButton } from '@chakra-ui/react';
import { useError } from '../context/errorContext';

const ErrorAlert: React.FC = () => {
  const { error, setError } = useError();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  if (!error) return null;

  return (
    <Box position="fixed" top={0} left={0} right={0} zIndex={1000}>
      <Alert status="error" variant="solid">
        <AlertIcon />
        {error}
        <CloseButton position="absolute" right="8px" top="8px" onClick={() => setError(null)} />
      </Alert>
    </Box>
  );
};

export default ErrorAlert;
