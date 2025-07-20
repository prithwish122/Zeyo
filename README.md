# Zeyo 

**Zeyo** is a privacy-preserving on-chain credentialing system that issues Soulbound Tokens (SBTs) as verifiable badges for validated DeFi activities. Built with ZK proofs, ERC-1155 standard, and Carv ID integration, Zeyo enables users to prove their DeFi participation — without compromising privacy — and store their achievements on-chain.

---

## 🚀 Live Demo

👉 **Live App**: [https://zeyo.xyz](https://zeyo.xyz)  
👉 **Smart Contract Address (BSC Testnet/Mainnet)**: `0x...` *(replace this)*

---

## 🔧 Tech Stack

- **Smart Contract**: Solidity (ERC-1155 SBT implementation)
- **Blockchain**: BNB Chain (EVM-compatible)
- **Frontend**: Next.js + TypeScript
- **Wallet Connection**: Reown + MetaMask
- **ZK Proofs**: (e.g., Circom / SnarkJS or your custom circuit)
- **Identity Layer**: [Carv ID](https://carv.io/)
- **API Integration**: Carv On-chain Activity Validation API

---

## 🧠 How It Works

### 1. **Connect Wallet**
Users securely connect their wallet via Reown or MetaMask.

### 2. **Activity Verification**
Users provide or select a DeFi activity. Carv’s API is used to fetch and validate on-chain proof of activity.

### 3. **ZK Proof Generation**
Zeyo creates a zero-knowledge proof verifying user activity without revealing sensitive data.

### 4. **Mint SBT Badge**
If valid, an ERC-1155 Soulbound Token is minted. The `tokenId` is linked to the user's Carv ID.

### 5. **On-Chain Identity**
The badge is displayed in the user's wallet and Zeyo dashboard, allowing users to verify credentials across ecosystems.

---

## 💡 Why Zeyo?

Traditional identity verification is flawed — it’s either too intrusive or too opaque. Zeyo solves this with:

✅ **Privacy**: Users prove eligibility with ZK proofs, not raw data  
✅ **Ownership**: Credentials are minted directly to the user’s wallet  
✅ **Composability**: Built on the open ERC-1155 standard  
✅ **Cross-Platform Recognition**: Via Carv ID integration

---

## 🌍 Why Zeyo Fits the **Tech Fairness** Theme

Zeyo is built to **democratize trust** in Web3:

- 🟢 **Equal Access**: Any user with legitimate activity can earn a badge — no gatekeeping.
- 🛑 **Bias-Free Validation**: ZK proofs remove prejudice by verifying data, not identity.
- 💠 **Transparent and Tamper-proof**: Powered by BNB Chain, activity is fully auditable.
- 🔗 **Interoperable Identity**: Carv ID lets users carry their achievements across platforms, fairly.

Zeyo upholds the spirit of **tech fairness** by ensuring **privacy, verifiability, and inclusivity** for all.

---

## 📄 Contract Details

- **Standard**: ERC-1155 (Soulbound)
- **Deployed On**: BNB Chain  
- **Contract Address**: `0x...` *(replace this)*  
- **Token ID (Carv ID Linked)**: User-specific

---

## 🛠️ Local Development Setup

```bash
git clone https://github.com/your-username/zeyo.git
cd zeyo
npm install
npm run dev
