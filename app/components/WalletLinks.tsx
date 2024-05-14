/* eslint-disable react/no-unescaped-entities */
import { Box, Link, List, ListItem, Text } from '@chakra-ui/react';

const WalletLinks = () => {
  return (
    <Box mt={6}>
      <Text fontSize="lg" mb={4}>Don't have a wallet? Download one below:</Text>
      <List spacing={3}>
        <ListItem>
          <Link href="https://metamask.io/download.html" isExternal color="teal.500">
            MetaMask
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://walletconnect.org/" isExternal color="teal.500">
            WalletConnect
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://www.coinbase.com/wallet" isExternal color="teal.500">
            Coinbase Wallet
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default WalletLinks;
