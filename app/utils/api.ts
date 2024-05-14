/* eslint-disable react-hooks/rules-of-hooks */
import { ethers } from "ethers";

const CREATE_ACCOUNT_API_URL =
  process.env.NEXT_PUBLIC_CREATE_ACCOUNT_API_URL || "";
const GET_ACCOUNT_API_URL = process.env.NEXT_PUBLIC_GET_ACCOUNT_API_URL || "";
const FETCH_TOKENS_API_URL = process.env.NEXT_PUBLIC_FETCH_TOKENS_API_URL || "";

export const createAccount = async (address: string, signer: ethers.Signer) => {
  const message = `I am signing this message to verify my address: ${address}`;
  const signature = await signer.signMessage(message);
  const response = await fetch(CREATE_ACCOUNT_API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ address, signature, message }),
  });

  if (!response.ok) {
    throw new Error("Failed to create account");
  }

  return response.json();
};

export const fetchAccount = async (address: string) => {
  const response = await fetch(`${GET_ACCOUNT_API_URL}?address=${address}`);

  if (response.status === 404) {
    return null;
  }

  if (response.status !== 200) {
    throw new Error("Failed to fetch account");
  }

  return response.json();
};

export const fetchTokens = async (address: string) => {
  const response = await fetch(`${FETCH_TOKENS_API_URL}?address=${address}`);

  if (!response.ok) {
    throw new Error("Failed to fetch tokens");
  }

  return response.json();
};
