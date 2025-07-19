"use client"

import { Progress } from "@/components/ui/progress"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image" // Import Image
import {
  Search,
  Smartphone,
  Monitor,
  Chrome,
  X,
  RotateCcw,
  Wallet,
  Shield,
  CreditCard,
  Calendar,
  ArrowRight,
  Star,
  Users,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle" // Import ThemeToggle
import { ExportDataButton } from "@/components/export-data-button" // Import ExportDataButton

// Comprehensive wallet data from Solana.com directory
const mockWallets = [
  {
    id: 1,
    name: "Phantom",
    logo: "/logos/phantom.png",
    logoColor: "transparent", // Set to transparent as image provides color
    description: "Multiple chains, one wallet. No more switching",
    platforms: ["iOS", "Android", "Chrome"],
    custodyType: "self-custody",
    popularity: 95,
    securityScore: 92,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: true,
      fiatOnRamp: true,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: true,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: true,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: true,
    },
    securityFeatures: ["2FA", "Biometric", "Hardware"],
    versionTested: "24.20.0",
    dateTested: "2025-07-17",
    userRating: 4.8,
    totalUsers: "7M+",
    lastUpdated: "2025-07-17",
    tags: ["popular", "defi", "nft", "mobile", "multichain"],
  },
  {
    id: 2,
    name: "Solflare",
    logo: "/logos/solflare.png",
    logoColor: "transparent",
    description:
      "A secure and powerful Solana Wallet. Buy, store, swap tokens & NFTs and access Solana DeFi from web or mobile",
    platforms: ["iOS", "Android", "Chrome", "Desktop"],
    custodyType: "self-custody",
    popularity: 88,
    securityScore: 95,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: true,
      fiatOnRamp: false,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: true,
      multiChain: false,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: true,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: true,
      crossChainBridge: false,
      yieldFarming: false,
    },
    securityFeatures: ["Hardware", "Biometric", "Open Source"],
    versionTested: "2.1.1",
    dateTested: "2025-07-16",
    userRating: 4.7,
    totalUsers: "3M+",
    lastUpdated: "2025-07-16",
    tags: ["open-source", "staking", "security", "desktop", "solana-native"],
  },
  {
    id: 3,
    name: "Backpack",
    logo: "/logos/backpack.png",
    logoColor: "transparent",
    description:
      "Backpack offers a robust, user-friendly platform for seamlessly trading, managing, and securing your cryptocurrency assets",
    platforms: ["iOS", "Android", "Chrome"],
    custodyType: "MPC",
    popularity: 75,
    securityScore: 90,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: false,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: true,
      pushNotifications: true,
      qrSupport: "Partial",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: true,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: true,
    },
    securityFeatures: ["MPC", "Social Recovery", "Biometric"],
    versionTested: "0.8.0",
    dateTested: "2024-01-10",
    userRating: 4.5,
    totalUsers: "1M+",
    lastUpdated: "2024-01-05",
    tags: ["mpc", "social", "multichain", "modern", "trading"],
  },
  {
    id: 4,
    name: "Glow",
    logo: "/logos/glow.png",
    logoColor: "transparent",
    description:
      "Glow Wallet Extension is a user-friendly digital wallet designed to facilitate seamless cryptocurrency transactions",
    platforms: ["iOS", "Android", "Chrome"],
    custodyType: "self-custody",
    popularity: 65,
    securityScore: 85,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: false,
      fiatOffRamp: false,
      pushNotifications: false,
      qrSupport: "Yes",
      hardwareWallet: false,
      multiChain: false,
      dappBrowser: false,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: false,
    },
    securityFeatures: ["Biometric"],
    versionTested: "1.2.3",
    dateTested: "2024-01-08",
    userRating: 4.3,
    totalUsers: "500K+",
    lastUpdated: "2024-01-01",
    tags: ["mobile", "simple", "elegant", "user-friendly"],
  },
  {
    id: 5,
    name: "Exodus",
    logo: "/logos/exodus.png",
    logoColor: "transparent",
    description: "50+ networks supported. Swap between 1000s of assets",
    platforms: ["iOS", "Android", "Desktop", "Chrome"],
    custodyType: "self-custody",
    popularity: 82,
    securityScore: 88,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: true,
      pushNotifications: true,
      qrSupport: "Partial",
      hardwareWallet: true,
      multiChain: true,
      dappBrowser: false,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: false,
    },
    securityFeatures: ["Hardware", "Biometric", "Encrypted"],
    versionTested: "24.1.1",
    dateTested: "2024-01-14",
    userRating: 4.4,
    totalUsers: "6M+",
    lastUpdated: "2024-01-12",
    tags: ["multichain", "exchange", "design", "established", "swap"],
  },
  {
    id: 6,
    name: "Trust Wallet",
    logo: "/logos/trust-wallet.png",
    logoColor: "transparent",
    description:
      "Trust Wallet is a multi-chain self-custody crypto wallet and secure gateway to thousands of Web3 decentralized applications (dApps)",
    platforms: ["iOS", "Android", "Chrome"],
    custodyType: "self-custody",
    popularity: 90,
    securityScore: 89,
    features: {
      dexSwap: true,
      nftGallery: true,
      fiatOnRamp: true,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: true,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: true,
      stakingSupport: true,
      liquidStaking: false,
    },
    securityFeatures: ["Biometric", "Open Source"],
    versionTested: "8.15",
    dateTested: "2024-01-11",
    userRating: 4.2,
    totalUsers: "60M+",
    lastUpdated: "2024-01-09",
    tags: ["binance", "multichain", "popular", "mobile", "dapps"],
  },
  {
    id: 7,
    name: "Coinbase Wallet",
    logo: "/logos/coinbase-wallet.png",
    logoColor: "transparent",
    description: "Your key to the world of crypto",
    platforms: ["iOS", "Android", "Chrome"],
    custodyType: "custodial",
    popularity: 82,
    securityScore: 94,
    features: {
      dexSwap: false,
      nftGallery: true,
      stakingSupport: false,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: true,
      pushNotifications: true,
      qrSupport: "Partial",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: true,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: false,
    },
    securityFeatures: ["2FA", "Custodial", "Insurance"],
    versionTested: "35.0.0",
    dateTested: "2024-01-03",
    userRating: 4.2,
    totalUsers: "5M+",
    lastUpdated: "2024-01-01",
    tags: ["custodial", "enterprise", "institutional", "coinbase"],
  },
  {
    id: 8,
    name: "TokenPocket",
    logo: "/logos/tokenpocket.png",
    logoColor: "transparent",
    description:
      "TokenPocket is a multi-chain self-custodial wallet with over 30 million users worldwide, offering a product lineup that includes a Mobile Wallet, Chrome Extension Wallet, and KeyPal Hardware Wallet",
    platforms: ["iOS", "Android", "Chrome", "Desktop", "Hardware"],
    custodyType: "self-custody",
    popularity: 64,
    securityScore: 83,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: true,
      fiatOnRamp: true,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: true,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: true,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: true,
      crossChainBridge: true,
      yieldFarming: true,
    },
    securityFeatures: ["Biometric", "Multi-sig", "Cold Storage"],
    versionTested: "1.7.3",
    dateTested: "2024-01-04",
    userRating: 4.2,
    totalUsers: "30M+",
    lastUpdated: "2024-01-01",
    tags: ["universal", "multichain", "comprehensive", "popular", "hardware"],
  },
  {
    id: 9,
    name: "Ledger",
    logo: "/logos/ledger.png",
    logoColor: "transparent",
    description: "Physically secure your transactions with Ledger wallets. Thousands of supported coins and tokens",
    platforms: ["iOS", "Android", "Desktop", "Hardware"],
    custodyType: "hardware",
    popularity: 85,
    securityScore: 98,
    features: {
      dexSwap: false,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Partial",
      hardwareWallet: true,
      multiChain: true,
      dappBrowser: false,
      walletConnect: false,
      biometricAuth: false,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: false,
    },
    securityFeatures: ["Hardware", "Cold Storage", "Secure Element"],
    versionTested: "2.73.1",
    dateTested: "2024-01-13",
    userRating: 4.6,
    totalUsers: "4M+",
    lastUpdated: "2024-01-11",
    tags: ["hardware", "security", "institutional", "cold-storage"],
  },
  {
    id: 10,
    name: "Trezor",
    logo: "/logos/trezor.png",
    logoColor: "transparent",
    description: "The ultimate hardware wallet offering highest level of security and seamless usability",
    platforms: ["Desktop", "Hardware"],
    custodyType: "hardware",
    popularity: 78,
    securityScore: 97,
    features: {
      dexSwap: false,
      nftGallery: false,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: false,
      fiatOffRamp: false,
      pushNotifications: false,
      qrSupport: "No",
      hardwareWallet: true,
      multiChain: true,
      dappBrowser: false,
      walletConnect: false,
      biometricAuth: false,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: false,
    },
    securityFeatures: ["Hardware", "Cold Storage", "Open Source"],
    versionTested: "24.1.1",
    dateTested: "2024-01-12",
    userRating: 4.5,
    totalUsers: "2M+",
    lastUpdated: "2024-01-10",
    tags: ["hardware", "security", "open-source", "cold-storage"],
  },
  {
    id: 11,
    name: "OKX",
    logo: "/logos/okx.png",
    logoColor: "transparent",
    description: "Your portal to Web3. Access 100+ decentralized networks with many more on the way",
    platforms: ["iOS", "Android", "Chrome", "Desktop"],
    custodyType: "self-custody",
    popularity: 76,
    securityScore: 87,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: true,
      fiatOnRamp: true,
      fiatOffRamp: true,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: true,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: true,
    },
    securityFeatures: ["Biometric", "2FA"],
    versionTested: "3.2.0",
    dateTested: "2024-01-11",
    userRating: 4.3,
    totalUsers: "50M+",
    lastUpdated: "2024-01-09",
    tags: ["exchange", "multichain", "web3", "popular", "trading"],
  },
  {
    id: 12,
    name: "Bitget",
    logo: "/logos/bitget.png",
    logoColor: "transparent",
    description: "Faster Trading, Better Assets. Bitget Wallet — Your Web3 Trading Wallet of the Future",
    platforms: ["iOS", "Android", "Chrome"],
    custodyType: "self-custody",
    popularity: 68,
    securityScore: 84,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: true,
      pushNotifications: true,
      qrSupport: "Partial",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: true,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: true,
    },
    securityFeatures: ["Biometric", "2FA"],
    versionTested: "8.12.0",
    dateTested: "2024-01-10",
    userRating: 4.1,
    totalUsers: "25M+",
    lastUpdated: "2024-01-08",
    tags: ["trading", "web3", "multichain", "exchange"],
  },
  {
    id: 13,
    name: "Brave Wallet",
    logo: "/logos/brave-wallet.png",
    logoColor: "transparent",
    description:
      "Brave Wallet is a secure crypto wallet, built right into the Brave privacy browser. No extension required",
    platforms: ["Desktop", "iOS", "Android"],
    custodyType: "self-custody",
    popularity: 62,
    securityScore: 89,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: false,
      liquidStaking: false,
      fiatOnRamp: false,
      fiatOffRamp: false,
      pushNotifications: false,
      qrSupport: "No",
      hardwareWallet: true,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: false,
      socialRecovery: false,
      customRPC: true,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: false,
    },
    securityFeatures: ["Hardware", "Privacy", "Built-in"],
    versionTested: "1.62.0",
    dateTested: "2024-01-09",
    userRating: 4.0,
    totalUsers: "3M+",
    lastUpdated: "2024-01-07",
    tags: ["privacy", "browser", "built-in", "secure"],
  },
  {
    id: 14,
    name: "Enkrypt",
    logo: "/logos/enkrypt.png",
    logoColor: "transparent",
    description:
      "A multichain crypto wallet hold, buy, send, receive, and swap tokens. Manage your NFTs. Access web3 apps across multiple blockchains",
    platforms: ["Chrome", "Firefox", "Safari"],
    custodyType: "self-custody",
    popularity: 45,
    securityScore: 82,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: false,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: false,
      pushNotifications: false,
      qrSupport: "No",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: false,
      socialRecovery: false,
      customRPC: true,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: false,
    },
    securityFeatures: ["Open Source"],
    versionTested: "1.39.0",
    dateTested: "2024-01-08",
    userRating: 3.9,
    totalUsers: "100K+",
    lastUpdated: "2024-01-06",
    tags: ["multichain", "browser-extension", "nft", "web3"],
  },
  {
    id: 15,
    name: "Gem Wallet",
    logo: "/logos/gem-wallet.png",
    logoColor: "transparent",
    description:
      "Gem Wallet is an open-source and self-custodial crypto wallet that lets you send, receive, swap, use dApps, buy, and stake cryptocurrencies",
    platforms: ["iOS", "Android"],
    custodyType: "self-custody",
    popularity: 38,
    securityScore: 86,
    features: {
      dexSwap: true,
      nftGallery: false,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: false,
    },
    securityFeatures: ["Open Source", "Biometric"],
    versionTested: "4.2.0",
    dateTested: "2024-01-07",
    userRating: 4.2,
    totalUsers: "250K+",
    lastUpdated: "2024-01-05",
    tags: ["open-source", "mobile", "staking", "dapps"],
  },
  {
    id: 16,
    name: "Robinhood Wallet",
    logo: "/logos/robinhood-wallet.png",
    logoColor: "transparent",
    description:
      "The Robinhood Wallet app is a self-custody wallet that's your portal to web3 where you can store and manage your crypto. Robinhood Wallet gives you full control over your crypto, which means you hold the private keys to your assets",
    platforms: ["iOS", "Android"],
    custodyType: "self-custody",
    popularity: 72,
    securityScore: 88,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: false,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: true,
      pushNotifications: true,
      qrSupport: "Partial",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: false,
    },
    securityFeatures: ["Biometric", "Self-custody"],
    versionTested: "2.15.0",
    dateTested: "2024-01-12",
    userRating: 4.0,
    totalUsers: "2M+",
    lastUpdated: "2024-01-10",
    tags: ["robinhood", "self-custody", "web3", "mobile"],
  },
  {
    id: 17,
    name: "Binance Web3 Wallet",
    logo: "/logos/binance-web3-wallet.png",
    logoColor: "transparent",
    description: "Binance Web3 wallet is a keyless, seedless, multi-chain, semi-custody wallet designed for DeFi",
    platforms: ["iOS", "Android", "Chrome"],
    custodyType: "semi-custody",
    popularity: 84,
    securityScore: 91,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: true,
      fiatOnRamp: true,
      fiatOffRamp: true,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: true,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: true,
    },
    securityFeatures: ["Keyless", "Seedless", "MPC"],
    versionTested: "1.8.0",
    dateTested: "2024-01-14",
    userRating: 4.3,
    totalUsers: "15M+",
    lastUpdated: "2024-01-12",
    tags: ["binance", "keyless", "seedless", "defi", "semi-custody"],
  },
  {
    id: 18,
    name: "Fuse Wallet",
    logo: "/logos/fuse-wallet.png",
    logoColor: "transparent",
    description: "A safe wallet for your Solana assets. 2FA. Recovery. No seed phrase",
    platforms: ["iOS", "Android", "Chrome"],
    custodyType: "MPC",
    popularity: 42,
    securityScore: 93,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: false,
      liquidStaking: false,
      fiatOnRamp: false,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: false,
      multiChain: false,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: true,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: false,
    },
    securityFeatures: ["2FA", "Recovery", "No Seed Phrase", "MPC"],
    versionTested: "2.1.0",
    dateTested: "2024-01-13",
    userRating: 4.4,
    totalUsers: "150K+",
    lastUpdated: "2024-01-11",
    tags: ["safe", "2fa", "recovery", "no-seed", "solana-native"],
  },
  {
    id: 19,
    name: "Tiplink",
    logo: "/logos/tiplink.png",
    logoColor: "transparent",
    description: "The crypto of tomorrow, today. Create a frictionless wallet with just a Google Account",
    platforms: ["Chrome", "iOS", "Android"],
    custodyType: "custodial",
    popularity: 35,
    securityScore: 79,
    features: {
      dexSwap: false,
      nftGallery: true,
      stakingSupport: false,
      liquidStaking: false,
      fiatOnRamp: false,
      fiatOffRamp: false,
      pushNotifications: false,
      qrSupport: "Yes",
      hardwareWallet: false,
      multiChain: false,
      dappBrowser: false,
      walletConnect: false,
      biometricAuth: false,
      socialRecovery: true,
      customRPC: false,
      portfolioTracking: false,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: false,
    },
    securityFeatures: ["Google Account", "Social Recovery"],
    versionTested: "1.0.5",
    dateTested: "2024-01-06",
    userRating: 3.8,
    totalUsers: "75K+",
    lastUpdated: "2024-01-04",
    tags: ["frictionless", "google", "simple", "custodial"],
  },
  {
    id: 20,
    name: "NOW Wallet",
    logo: "/logos/now-wallet.png",
    logoColor: "transparent",
    description: "Built for ease, powered by security. Swap and store crypto across 70+ networks",
    platforms: ["iOS", "Android", "Desktop"],
    custodyType: "self-custody",
    popularity: 48,
    securityScore: 85,
    features: {
      dexSwap: true,
      nftGallery: false,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "No",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: false,
      walletConnect: false,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: false,
    },
    securityFeatures: ["Biometric", "Encrypted"],
    versionTested: "3.1.2",
    dateTested: "2024-01-05",
    userRating: 3.7,
    totalUsers: "500K+",
    lastUpdated: "2024-01-03",
    tags: ["ease", "security", "multichain", "swap"],
  },
  {
    id: 21,
    name: "Guarda Wallet",
    logo: "/logos/guarda-wallet.png",
    logoColor: "transparent",
    description: "One secure multi crypto wallet, all assets in. Swap and store crypto across 70+ networks",
    platforms: ["iOS", "Android", "Desktop", "Chrome"],
    custodyType: "self-custody",
    popularity: 58,
    securityScore: 83,
    features: {
      dexSwap: true,
      nftGallery: false,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Partial",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: false,
      walletConnect: false,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: false,
    },
    securityFeatures: ["Biometric", "Multi-crypto"],
    versionTested: "4.8.0",
    dateTested: "2024-01-04",
    userRating: 3.9,
    totalUsers: "1M+",
    lastUpdated: "2024-01-02",
    tags: ["secure", "multi-crypto", "multichain", "comprehensive"],
  },
  {
    id: 22,
    name: "Cake Wallet",
    logo: "/logos/cake-wallet.png",
    logoColor: "transparent",
    description: "Your keys, your coins. Securely store, send and exchange your crypto with ease",
    platforms: ["iOS", "Android", "Desktop"],
    custodyType: "self-custody",
    popularity: 52,
    securityScore: 87,
    features: {
      dexSwap: true,
      nftGallery: false,
      stakingSupport: false,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: false,
      pushNotifications: false,
      qrSupport: "No",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: false,
      walletConnect: false,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: false,
    },
    securityFeatures: ["Open Source", "Privacy"],
    versionTested: "4.14.7",
    dateTested: "2024-01-03",
    userRating: 4.1,
    totalUsers: "800K+",
    lastUpdated: "2024-01-01",
    tags: ["privacy", "open-source", "secure", "exchange"],
  },
  {
    id: 23,
    name: "Helium Wallet",
    logo: "/logos/helium-wallet.png",
    logoColor: "transparent",
    description: "The Helium Wallet app is the trusted way to manage your Helium account",
    platforms: ["iOS", "Android"],
    custodyType: "self-custody",
    popularity: 28,
    securityScore: 81,
    features: {
      dexSwap: false,
      nftGallery: false,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: false,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: false,
      multiChain: false,
      dappBrowser: false,
      walletConnect: false,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: false,
    },
    securityFeatures: ["Biometric", "Helium Native"],
    versionTested: "2.8.0",
    dateTested: "2024-01-02",
    userRating: 4.0,
    totalUsers: "200K+",
    lastUpdated: "2023-12-30",
    tags: ["helium", "iot", "specialized", "mobile"],
  },
  {
    id: 24,
    name: "Keystone",
    logo: "/logos/keystone.png",
    logoColor: "transparent",
    description:
      "Keystone offers seamless compatibility with leading wallets, ensuring top-tier security for a wide range of cryptocurrencies",
    platforms: ["Hardware"],
    custodyType: "hardware",
    popularity: 41,
    securityScore: 96,
    features: {
      dexSwap: false,
      nftGallery: false,
      stakingSupport: false,
      liquidStaking: false,
      fiatOnRamp: false,
      fiatOffRamp: false,
      pushNotifications: false,
      qrSupport: "Yes",
      hardwareWallet: true,
      multiChain: true,
      dappBrowser: false,
      walletConnect: false,
      biometricAuth: false,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: false,
      priceAlerts: false,
      transactionHistory: false,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: false,
    },
    securityFeatures: ["Hardware", "Air-gapped", "QR Communication"],
    versionTested: "1.0.4",
    dateTested: "2024-01-01",
    userRating: 4.7,
    totalUsers: "50K+",
    lastUpdated: "2023-12-28",
    tags: ["hardware", "security", "air-gapped", "compatibility"],
  },
  {
    id: 25,
    name: "Jupiter Wallet",
    logo: "/logos/jupiter-wallet.png",
    logoColor: "transparent",
    description: "The best swap aggregator on Solana with integrated wallet features",
    platforms: ["Chrome", "iOS", "Android"],
    custodyType: "self-custody",
    popularity: 78,
    securityScore: 89,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: true,
      fiatOnRamp: false,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: false,
      multiChain: false,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: true,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: true,
    },
    securityFeatures: ["Biometric", "Best Rates"],
    versionTested: "1.0.12",
    dateTested: "2024-01-16",
    userRating: 4.6,
    totalUsers: "2M+",
    lastUpdated: "2024-01-14",
    tags: ["jupiter", "swap", "aggregator", "defi", "solana-native"],
  },
  {
    id: 26,
    name: "Decaf",
    logo: "/logos/decaf.png",
    logoColor: "transparent",
    description: "A Global Bank, Onchain. Instantly transfer money between 184+ countries",
    platforms: ["iOS", "Android", "Chrome"],
    custodyType: "custodial",
    popularity: 45,
    securityScore: 92,
    features: {
      dexSwap: false,
      nftGallery: false,
      stakingSupport: false,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: true,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: false,
      walletConnect: false,
      biometricAuth: true,
      socialRecovery: true,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: false,
    },
    securityFeatures: ["Banking Grade", "KYC", "Regulated"],
    versionTested: "2.3.1",
    dateTested: "2024-01-15",
    userRating: 4.1,
    totalUsers: "300K+",
    lastUpdated: "2024-01-13",
    tags: ["banking", "global", "fiat", "transfers", "regulated"],
  },
  {
    id: 27,
    name: "SafePal",
    logo: "/logos/safepal.png",
    logoColor: "transparent",
    description: "Hardware and software wallet with comprehensive security features",
    platforms: ["iOS", "Android", "Hardware"],
    custodyType: "hybrid",
    popularity: 72,
    securityScore: 94,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: true,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: true,
    },
    securityFeatures: ["Hardware", "Biometric", "Air-gapped"],
    versionTested: "4.3.0",
    dateTested: "2024-01-08",
    userRating: 4.4,
    totalUsers: "3M+",
    lastUpdated: "2024-01-06",
    tags: ["hardware", "hybrid", "security", "binance-backed"],
  },
  {
    id: 28,
    name: "Slope",
    logo: "/logos/slope.png",
    logoColor: "transparent",
    description: "Mobile-first wallet focused on Solana DeFi and NFTs",
    platforms: ["iOS", "Android"],
    custodyType: "self-custody",
    popularity: 60,
    securityScore: 82,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: false,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: false,
      multiChain: false,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: false,
      yieldFarming: true,
    },
    securityFeatures: ["Biometric"],
    versionTested: "3.2.1",
    dateTested: "2024-01-07",
    userRating: 4.1,
    totalUsers: "800K+",
    lastUpdated: "2024-01-03",
    tags: ["mobile", "defi", "nft", "solana-native"],
  },
  {
    id: 29,
    name: "Atomic Wallet",
    logo: "/logos/atomic-wallet.png",
    logoColor: "transparent",
    description: "Decentralized wallet with atomic swaps and staking",
    platforms: ["iOS", "Android", "Desktop"],
    custodyType: "self-custody",
    popularity: 70,
    securityScore: 86,
    features: {
      dexSwap: true,
      nftGallery: false,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: true,
      fiatOffRamp: false,
      pushNotifications: false,
      qrSupport: "No",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: false,
      walletConnect: false,
      biometricAuth: false,
      socialRecovery: false,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: false,
    },
    securityFeatures: ["Encrypted", "Decentralized"],
    versionTested: "2.70.0",
    dateTested: "2024-01-06",
    userRating: 3.9,
    totalUsers: "5M+",
    lastUpdated: "2024-01-04",
    tags: ["atomic-swaps", "staking", "multichain", "desktop"],
  },
  {
    id: 30,
    name: "Coin98",
    logo: "/logos/coin98.png",
    logoColor: "transparent",
    description: "Multi-chain DeFi wallet and gateway",
    platforms: ["iOS", "Android", "Chrome"],
    custodyType: "self-custody",
    popularity: 68,
    securityScore: 84,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: true,
      fiatOnRamp: true,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Yes",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: true,
      portfolioTracking: true,
      priceAlerts: true,
      transactionHistory: true,
      governanceVoting: true,
      crossChainBridge: true,
      yieldFarming: true,
    },
    securityFeatures: ["Biometric", "Multi-sig"],
    versionTested: "7.18.0",
    dateTested: "2024-01-09",
    userRating: 4.3,
    totalUsers: "2M+",
    lastUpdated: "2024-01-07",
    tags: ["multichain", "defi", "gateway", "asian-market"],
  },
  {
    id: 31,
    name: "Math Wallet",
    logo: "/logos/math-wallet.png",
    logoColor: "transparent",
    description: "Multi-platform crypto wallet with Web3 DApp store",
    platforms: ["iOS", "Android", "Chrome", "Desktop"],
    custodyType: "self-custody",
    popularity: 58,
    securityScore: 81,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: true,
      liquidStaking: false,
      fiatOnRamp: false,
      fiatOffRamp: false,
      pushNotifications: true,
      qrSupport: "Partial",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: false,
      customRPC: true,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: true,
      crossChainBridge: true,
      yieldFarming: true,
    },
    securityFeatures: ["Biometric", "Multi-sig"],
    versionTested: "2.4.8",
    dateTested: "2024-01-05",
    userRating: 4.0,
    totalUsers: "1.5M+",
    lastUpdated: "2024-01-02",
    tags: ["multichain", "dapp-store", "web3", "comprehensive"],
  },
  {
    id: 32,
    name: "Clover",
    logo: "/logos/clover.png",
    logoColor: "transparent",
    description: "Cross-chain wallet with identity-based features",
    platforms: ["iOS", "Android", "Chrome"],
    custodyType: "self-custody",
    popularity: 45,
    securityScore: 79,
    features: {
      dexSwap: true,
      nftGallery: true,
      stakingSupport: false,
      liquidStaking: false,
      fiatOnRamp: false,
      fiatOffRamp: false,
      pushNotifications: false,
      qrSupport: "No",
      hardwareWallet: false,
      multiChain: true,
      dappBrowser: true,
      walletConnect: true,
      biometricAuth: true,
      socialRecovery: true,
      customRPC: false,
      portfolioTracking: true,
      priceAlerts: false,
      transactionHistory: true,
      governanceVoting: false,
      crossChainBridge: true,
      yieldFarming: false,
    },
    securityFeatures: ["Biometric", "Social Recovery"],
    versionTested: "1.2.0",
    dateTested: "2024-01-03",
    userRating: 3.8,
    totalUsers: "200K+",
    lastUpdated: "2023-12-28",
    tags: ["cross-chain", "identity", "social", "emerging"],
  },
]

const platformIcons = {
  iOS: { icon: <Smartphone className="h-4 w-4" />, color: "text-gray-700 dark:text-gray-300" },
  Android: { icon: <Smartphone className="h-4 w-4" />, color: "text-green-600 dark:text-green-400" },
  Chrome: { icon: <Chrome className="h-4 w-4" />, color: "text-blue-600 dark:text-blue-400" },
  Desktop: { icon: <Monitor className="h-4 w-4" />, color: "text-gray-600 dark:text-gray-400" },
  Hardware: { icon: <Shield className="h-4 w-4" />, color: "text-gray-700 dark:text-gray-300" },
}

const qrSupportConfig = {
  Yes: {
    color:
      "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
    icon: "✅",
  },
  Partial: {
    color:
      "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
    icon: "⚠️",
  },
  No: {
    color: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
    icon: "❌",
  },
}

const custodyTypes = ["self-custody", "MPC", "custodial", "hardware", "hybrid", "semi-custody"]

const custodyTypeConfig = {
  "self-custody": {
    color: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    icon: <Wallet className="h-3 w-3" />,
  },
  MPC: {
    color:
      "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
    icon: <Shield className="h-3 w-3" />,
  },
  custodial: {
    color:
      "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800",
    icon: <CreditCard className="h-3 w-3" />,
  },
  hardware: {
    color: "bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-700/30 dark:text-gray-300 dark:border-gray-600",
    icon: <Shield className="h-3 w-3" />,
  },
  hybrid: {
    color:
      "bg-yellow-200 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
    icon: <Shield className="h-3 w-3" />,
  },
  "semi-custody": {
    color:
      "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
    icon: <Shield className="h-3 w-3" />,
  },
}

export default function SolanaWalletDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [custodyFilter, setCustodyFilter] = useState("all")
  const [qrSupportFilter, setQrSupportFilter] = useState("all")
  const [sortField, setSortField] = useState<string>("popularity")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const allPlatforms = ["iOS", "Android", "Chrome", "Desktop", "Hardware"]

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (searchTerm) count++
    if (selectedPlatforms.length > 0) count++
    if (custodyFilter !== "all") count++
    if (qrSupportFilter !== "all") count++
    return count
  }, [searchTerm, selectedPlatforms, custodyFilter, qrSupportFilter])

  const filteredAndSortedWallets = useMemo(() => {
    const filtered = mockWallets.filter((wallet) => {
      const matchesSearch =
        wallet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wallet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wallet.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesPlatforms =
        selectedPlatforms.length === 0 || selectedPlatforms.some((platform) => wallet.platforms.includes(platform))
      const matchesCustody = custodyFilter === "all" || wallet.custodyType === custodyFilter
      const matchesQrSupport = qrSupportFilter === "all" || wallet.features.qrSupport === qrSupportFilter

      return matchesSearch && matchesPlatforms && matchesCustody && matchesQrSupport
    })

    filtered.sort((a, b) => {
      let aValue = a[sortField as keyof typeof a]
      let bValue = b[sortField as keyof typeof b]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = (bValue as string).toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [searchTerm, selectedPlatforms, custodyFilter, qrSupportFilter, sortField, sortDirection])

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]))
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedPlatforms([])
    setCustodyFilter("all")
    setQrSupportFilter("all")
  }

  const getFeatureCount = (wallet: any) => {
    return Object.values(wallet.features).filter((feature) => feature === true).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[--gradient-from] via-[--gradient-via] to-[--gradient-to]">
      <div className="container mx-auto p-4 lg:p-6 space-y-8">
        {/* Enhanced Header */}
        <div className="text-center space-y-4 py-8 relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <ExportDataButton data={filteredAndSortedWallets} filename="solana-wallets" />
            <ThemeToggle />
          </div>
          <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-border/20">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Wallet className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground/80">Solana Ecosystem</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Solana Pay-QR Compatibility
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Discover, compare, and analyze Solana wallets with comprehensive feature breakdowns, security assessments,
            and real-world testing data
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-foreground/60 pt-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>{mockWallets.length} Wallets Analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Updated Daily</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security Verified</span>
            </div>
          </div>
        </div>

        {/* Compact Filters */}
        <Card className="shadow-lg border-0 bg-card/95 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              {/* Search */}
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search wallets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-9 text-sm border-border focus:border-purple-300 bg-background/80"
                  />
                  {searchTerm && (
                    <Button
                      onClick={() => setSearchTerm("")}
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 items-center">
                <Select value={custodyFilter} onValueChange={setCustodyFilter}>
                  <SelectTrigger className="w-32 h-9 text-sm">
                    <SelectValue placeholder="Custody" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-md border-border shadow-lg">
                    <SelectItem value="all">All Types</SelectItem>
                    {custodyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.replace("-", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={qrSupportFilter} onValueChange={setQrSupportFilter}>
                  <SelectTrigger className="w-28 h-9 text-sm">
                    <SelectValue placeholder="QR" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-md border-border shadow-lg">
                    <SelectItem value="all">All QR</SelectItem>
                    <SelectItem value="Yes">✅ Yes</SelectItem>
                    <SelectItem value="Partial">⚠️ Partial</SelectItem>
                    <SelectItem value="No">❌ No</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortField} onValueChange={setSortField}>
                  <SelectTrigger className="w-32 h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-md border-border shadow-lg">
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="securityScore">Security</SelectItem>
                    <SelectItem value="userRating">Rating</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                  variant="outline"
                  size="sm"
                  className="h-9 px-3 text-foreground/80 border-border bg-background/50 hover:bg-background/80"
                >
                  {sortDirection === "asc" ? "↑" : "↓"}
                </Button>

                {activeFiltersCount > 0 && (
                  <Button
                    onClick={clearAllFilters}
                    variant="ghost"
                    size="sm"
                    className="h-9 px-3 text-muted-foreground hover:text-foreground"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              {/* Platform Filters */}
              <div className="flex gap-1">
                {allPlatforms.map((platform) => (
                  <Button
                    key={platform}
                    onClick={() => handlePlatformToggle(platform)}
                    variant={selectedPlatforms.includes(platform) ? "default" : "outline"}
                    size="sm"
                    className="h-8 px-2 text-xs bg-background/50 hover:bg-background/80 border-border"
                  >
                    {platformIcons[platform as keyof typeof platformIcons]?.icon}
                  </Button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
                {searchTerm && (
                  <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                    "{searchTerm}"
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearchTerm("")} />
                  </Badge>
                )}
                {selectedPlatforms.map((platform) => (
                  <Badge key={platform} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                    {platform}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handlePlatformToggle(platform)} />
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="text-sm text-foreground/60 px-1">
          <span>
            <span className="font-semibold text-foreground">{filteredAndSortedWallets.length}</span> of{" "}
            <span className="font-semibold text-foreground">{mockWallets.length}</span> wallets
          </span>
        </div>

        {/* Enhanced Wallet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedWallets.map((wallet) => (
            <Link key={wallet.id} href={`/wallet/${wallet.id}`}>
              <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 bg-card/90 backdrop-blur-sm hover:scale-[1.02] hover:bg-card">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:shadow-xl transition-shadow ${wallet.logoColor}`}
                      >
                        {/* Render Image component */}
                        <Image
                          src={wallet.logo || "/placeholder.svg"}
                          alt={`${wallet.name} logo`}
                          width={48}
                          height={48}
                          className="rounded-xl object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground group-hover:text-purple-600 transition-colors">
                          {wallet.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium text-foreground/70">{wallet.userRating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{wallet.totalUsers}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-foreground/70 leading-relaxed">{wallet.description}</p>

                  {/* Platforms */}
                  <div className="flex flex-wrap gap-2">
                    {wallet.platforms.map((platform) => (
                      <div
                        key={platform}
                        className="flex items-center gap-1 bg-muted hover:bg-muted/80 rounded-lg px-2 py-1 text-xs transition-colors"
                      >
                        <span
                          className={
                            platformIcons[platform as keyof typeof platformIcons]?.color ?? "text-muted-foreground"
                          }
                        >
                          {platformIcons[platform as keyof typeof platformIcons]?.icon ?? (
                            <Monitor className="h-4 w-4" />
                          )}
                        </span>
                        <span className="font-medium text-foreground/80">{platform}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Features */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground/70">Custody Type</span>
                      <Badge
                        className={`${custodyTypeConfig[wallet.custodyType as keyof typeof custodyTypeConfig].color} border text-xs`}
                      >
                        {custodyTypeConfig[wallet.custodyType as keyof typeof custodyTypeConfig].icon}
                        <span className="ml-1">{wallet.custodyType}</span>
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground/70">Solana Pay QR</span>
                      <Badge
                        className={`${qrSupportConfig[wallet.features.qrSupport as keyof typeof qrSupportConfig].color} border text-xs`}
                      >
                        {qrSupportConfig[wallet.features.qrSupport as keyof typeof qrSupportConfig].icon}{" "}
                        {wallet.features.qrSupport}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground/70">Features</span>
                      <span className="text-xs font-semibold text-foreground">{getFeatureCount(wallet)}/22</span>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-foreground/70">Popularity</span>
                        <span className="font-semibold text-foreground">{wallet.popularity}%</span>
                      </div>
                      <Progress value={wallet.popularity} className="h-2" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-foreground/70">Security Score</span>
                        <span className="font-semibold text-foreground">{wallet.securityScore}%</span>
                      </div>
                      <Progress value={wallet.securityScore} className="h-2" />
                    </div>
                  </div>

                  {/* Security Features */}
                  <div className="flex flex-wrap gap-1">
                    {wallet.securityFeatures.slice(0, 3).map((feature) => (
                      <Badge
                        key={feature}
                        variant="outline"
                        className="text-xs bg-muted text-muted-foreground border-border"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground">v{wallet.versionTested}</span>
                    <span className="text-xs text-muted-foreground">
                      Tested {new Date(wallet.dateTested).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredAndSortedWallets.length === 0 && (
          <Card className="shadow-xl border-0 bg-card/90 backdrop-blur-sm">
            <CardContent className="text-center py-16">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">No wallets found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  No wallets match your current filters. Try adjusting your search criteria or clearing some filters.
                </p>
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  className="mt-6 bg-transparent text-foreground/80 border-border"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
