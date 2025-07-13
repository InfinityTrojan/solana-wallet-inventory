# Solana Wallet Dashboard

This project is a Solana Wallet Dashboard that allows you to discover, compare, and analyze various Solana wallets with comprehensive feature breakdowns, security assessments, and real-world testing data.

## Getting Started

To run this project locally, follow these steps:

1.  **Install dependencies**:
    \`\`\`bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    \`\`\`

2.  **Run the development server**:
    \`\`\`bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    \`\`\`

3.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `app/`: Contains the main application routes and pages.
-   `components/`: Reusable UI components.
-   `public/`: Static assets like images.
-   `lib/`: Utility functions.
-   `hooks/`: Custom React hooks.

## How to Update Wallet Information

Wallet data is currently hardcoded in `app/page.tsx` (for the dashboard overview) and `app/wallet/[id]/page.tsx` (for detailed wallet pages). To update or add new wallet information, you will need to modify the `mockWallets` and `walletDetails` objects within these files.

### Key Data Files:

-   `app/page.tsx`: Contains the `mockWallets` array, which provides a summary of each wallet displayed on the main dashboard.
-   `app/wallet/[id]/page.tsx`: Contains the `walletDetails` object, which holds comprehensive, detailed information for each wallet, including all features, security notes, and testing data.

### Updating Wallet Details:

1.  **Locate the Data**:
    *   For the main dashboard cards, edit the `mockWallets` array in `app/page.tsx`.
    *   For the detailed wallet pages, edit the `walletDetails` object in `app/wallet/[id]/page.tsx`. Each wallet's detailed information is stored under its `id` as a key.

2.  **Update Wallet Logo**:
    *   The current logos are emojis (`logo` field) and a Tailwind CSS gradient class (`logoColor` field).
    *   To use a PNG logo, you would typically add the image file to the `public/images` directory (e.g., `public/images/phantom-logo.png`).
    *   Then, in the `logo` field, you could replace the emoji with an `<img>` tag or a `Next/image` component pointing to your PNG path (e.g., `<img src="/images/phantom-logo.png" alt="Phantom Logo" />`). You might need to adjust styling to fit.
    *   The `logoColor` can be kept for background or removed if a full image is used.

3.  **Update Wallet Description**:
    *   Modify the `description` field for a short summary (used on the main dashboard).
    *   Modify the `longDescription` field for a more detailed overview (used on the wallet detail page).

4.  **Update Features**:
    *   The `features` object within each wallet's `walletDetails` entry contains specific boolean flags (`supported`), a `rating` (1-5), and `notes` for each feature.
    *   Adjust these values to reflect the current state of the wallet's features.
    *   **Minimum Features to Include**:
        *   `platforms` (array of strings: "iOS", "Android", "Chrome", "Desktop", "Hardware")
        *   `custodyType` (string: "self-custody", "MPC", "custodial", "hardware", "hybrid", "semi-custody")
        *   `dexSwap` (object: `{ supported: boolean, rating: number, notes: string }`)
        *   `nftGallery` (object: `{ supported: boolean, rating: number, notes: string }`)
        *   `stakingSupport` (object: `{ supported: boolean, rating: number, notes: string }`)
        *   `fiatOnRamp` (object: `{ supported: boolean, rating: number, notes: string }`)
        *   `fiatOffRamp` (object: `{ supported: boolean, rating: number, notes: string }`)
        *   `pushNotifications` (object: `{ supported: boolean, rating: number, notes: string }`)
        *   `qrSupport` (string: "Yes", "Partial", "No")
        *   `versionTested` (string: e.g., "24.20.0")
        *   `dateTested` (string: e.g., "YYYY-MM-DD")

5.  **Other Details**:
    *   Fields like `popularity`, `securityScore`, `userRating`, `totalUsers`, `website`, `github`, `twitter`, `founded`, `headquarters`, `team`, `funding`, `lastUpdated`, `securityFeatures`, `screenshots`, `videos`, `pros`, `cons`, and `testingNotes` can all be updated directly within the `walletDetails` object.

## Footer Attribution

This project was built for a bounty campaign granting Venta & Superteam the right to feature, maintain, and extend work with attribution. Made with love [@1noobstar](https://x.com/1noobstar)
