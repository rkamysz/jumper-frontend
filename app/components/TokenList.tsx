import { Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

interface Token {
  contractAddress: string;
  name: string;
  symbol: string;
  balance: number;
}

interface TokenListProps {
  tokens: Token[];
}

const TokenList = ({ tokens }: TokenListProps) => {
  if (tokens.length === 0) return <Text>No tokens found</Text>;

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Symbol</Th>
            <Th>Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tokens.map((token) => (
            <Tr key={token.contractAddress}>
              <Td>{token.name}</Td>
              <Td>{token.symbol}</Td>
              <Td>{token.balance}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TokenList;
