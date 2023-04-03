This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [`tailwindcss`](https://tailwindcss.com/).

## Getting Started

### Running the vercel deployment

Create an account or import an ERC4337 account

1. To create an account, first connect signer and get the address and deposit fund to the created deterministic address
2. Go to transactions page and make a transaction from the smart account, and the contract account will be automatically deployed on the first transaction.
3. If you already have an ERC4337 account, import the address


### Running locally

Install dependencies:

```bash
npm install
```

Create a `.env.local` file and provide the required API-KEYS as shown in [.env.local.example](.env.local.example)

To open development server:

```bash
npm run dev
```

Open [http://localhost:3000/](http://localhost:3000/) with your browser.
