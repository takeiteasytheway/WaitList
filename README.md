# Next.js + Notion — Waitlist Template with BSC Testnet Integration

A modern and beautiful waitlist template built with **Next.js**, featuring wallet connectivity specifically for **BSC Testnet (Chain ID: 97)**, user management with **Supabase**, automatic card generation, **staking system**, and **referral program** for registered users.

## ✨ **Features**

- 🌟 **Modern UI/UX** with smooth animations and particles
- 🔗 **BSC Testnet Integration** with automatic network switching
- 💳 **Automatic Card Generation** (Bronze, Silver, Gold cards for each user)
- 🗄️ **Supabase Database** for user and card management
- 🔄 **Real-time Network Validation** and switching prompts
- 📱 **Responsive Design** optimized for all devices
- ⚡ **Performance Optimized** with reduced particles and smooth animations
- 🎯 **Staking System** with transaction logging and rewards
- 👥 **Referral Program** with unique codes and reward tracking
- 📊 **Dashboard Analytics** with portfolio overview and transaction history
- 🤖 **Discord Bot** with XP system, invite tracking, and persistent invite links

## 🚀 **Tech Stack**

- **Framework**: Next.js 15 with App Router
- **Blockchain**: BSC Testnet (Chain ID: 97)
- **Wallet Integration**: Wagmi v2 + WalletConnect
- **Database**: Supabase with Row Level Security
- **Styling**: Tailwind CSS + Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **TypeScript**: Full type safety

## 🎯 **Network Requirements**

This application **ONLY** works with **BSC Testnet**:
- **Chain ID**: 97
- **Network Name**: BSC Testnet
- **Currency**: tBNB (Test BNB)
- **RPC URL**: https://data-seed-prebsc-1-s1.binance.org:8545/
- **Block Explorer**: https://testnet.bscscan.com/

The app will automatically:
- ✅ Detect your current network
- ⚠️ Show warnings if you're on the wrong network
- 🔄 Prompt automatic network switching
- 🚫 Block features until you're on BSC Testnet

## 📋 **Prerequisites**

Before you begin, ensure you have:
- Node.js 18+ installed
- A wallet with BSC Testnet configured (MetaMask recommended)
- Test BNB tokens for BSC Testnet (get from [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart))
- Supabase account and project

## 🛠️ **Installation**

### 1. Clone and Install

```bash
git clone https://github.com/your-username/nextjs-notion-waitlist-template
cd nextjs-notion-waitlist-template
npm install
# or
bun install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL editor in your Supabase dashboard
3. Copy and paste the contents of `database_setup.sql` file
4. Run the SQL to create all tables, sequences, and policies
5. Get your project URL and anon key from Settings > API

**Important**: Make sure to run the `database_setup.sql` file in Supabase SQL Editor, not the `schema.sql` file.

### 3.1 X (Twitter) OAuth Setup

To enable X account integration:

1. **Create X Developer Account**:
   - Go to [developer.twitter.com](https://developer.twitter.com)
   - Sign up for a free developer account
   - Create a new app with OAuth 2.0 enabled

2. **Configure OAuth Settings**:
   - Set Callback URL: `https://yourdomain.com/x/callback`
   - Enable OAuth 2.0 with PKCE
   - Add scopes: `tweet.read`, `users.read`, `offline.access`

3. **Get API Credentials**:
   - Copy your Client ID and Client Secret
   - Add them to your environment variables

4. **Run X Schema**:
   - In Supabase SQL Editor, run the `x_schema.sql` file
   - This creates the `x_users` table and security policies
   - Optionally run `test_x_schema.sql` to verify the setup

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# WalletConnect Project ID (optional - has default)
NEXT_PUBLIC_WC_PROJECT_ID=your_walletconnect_project_id

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# X (Twitter) OAuth Configuration
NEXT_PUBLIC_X_CLIENT_ID=your_x_client_id
X_CLIENT_SECRET=your_x_client_secret

# JWT Secret (for authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Crypto Secret (for data encryption)
CRYPTO_SECRET=your-crypto-secret-key-change-this-in-production
```

### 4. Start Development Server

```bash
npm run dev
# or
bun dev
```

Visit `http://localhost:3000` and connect your wallet with BSC Testnet!

## 🗄️ **Database Schema**

### Users Table
```sql
- id (BIGSERIAL PRIMARY KEY)
- wallet_address (VARCHAR(42) UNIQUE)
- referred_by (BIGINT, Foreign Key to users.id)
- referral_code_used (VARCHAR)
- created_at (TIMESTAMP)
```

### Cards Table
```sql
- id (BIGSERIAL PRIMARY KEY)
- user_id (BIGINT, Foreign Key)
- card_number_bronze/silver/gold (VARCHAR(16))
- cvv_bronze/silver/gold (VARCHAR(3))
- expiration_date_bronze/silver/gold (DATE)
- created_at (TIMESTAMP)
```

### Stake Logs Table
```sql
- id (UUID PRIMARY KEY)
- user_id (BIGINT, Foreign Key)
- transaction_hash (VARCHAR UNIQUE)
- amount (VARCHAR)
- action_type (ENUM: stake, unstake, claim_rewards, emergency_withdraw)
- block_number (BIGINT)
- gas_used (BIGINT)
- gas_price (VARCHAR)
- status (ENUM: pending, confirmed, failed)
- created_at, updated_at (TIMESTAMP)
```

### Referral Codes Table
```sql
- id (UUID PRIMARY KEY)
- user_id (BIGINT, Foreign Key)
- code (VARCHAR UNIQUE)
- is_active (BOOLEAN)
- total_referrals (INTEGER)
- total_rewards_earned (VARCHAR)
- created_at, updated_at (TIMESTAMP)
```

### Referrals Table
```sql
- id (UUID PRIMARY KEY)
- referrer_id (BIGINT, Foreign Key)
- referred_id (BIGINT, Foreign Key UNIQUE)
- referral_code_id (UUID, Foreign Key)
- status (ENUM: pending, completed, cancelled)
- reward_amount (VARCHAR)
- reward_paid (BOOLEAN)
- created_at, updated_at (TIMESTAMP)
```

### X Users Table
```sql
- id (BIGSERIAL PRIMARY KEY)
- user_id (BIGINT, Foreign Key to users.id)
- wallet_address (VARCHAR(42))
- x_user_id (VARCHAR(50) UNIQUE)
- x_username (VARCHAR(50))
- x_name (VARCHAR(255))
- x_profile_image_url (TEXT)
- x_verified (BOOLEAN)
- x_followers_count (INTEGER)
- x_following_count (INTEGER)
- x_tweet_count (INTEGER)
- access_token (TEXT)
- refresh_token (TEXT)
- token_expires_at (TIMESTAMP)
- is_active (BOOLEAN)
- connected_at, disconnected_at (TIMESTAMP)
- created_at, updated_at (TIMESTAMP)
```

## 🎮 **How It Works**

### User Registration
1. **Connect Wallet**: User connects their wallet (MetaMask, WalletConnect, etc.)
2. **Network Check**: App checks if user is on BSC Testnet (Chain ID: 97)
3. **Auto Switch**: If on wrong network, prompts automatic switching
4. **User Creation**: Saves wallet address to Supabase database
5. **Card Generation**: Database trigger creates 3 cards automatically:
   - 🥉 **Bronze Card**: Expires in 2 years
   - 🥈 **Silver Card**: Expires in 3 years  
   - 🥇 **Gold Card**: Expires in 4 years
6. **Dashboard Access**: User can view cards and interact with the platform

### Staking System
1. **Stake Tokens**: Users can stake Waitlist tokens for rewards
2. **Transaction Logging**: All stake transactions are logged with blockchain data
3. **Reward Tracking**: Pending and confirmed rewards are tracked
4. **Unstaking**: Users can unstake after minimum lock period
5. **Emergency Withdraw**: Available for urgent situations

### Referral Program
1. **Unique Codes**: Each user gets a unique 8-character referral code
2. **Link Sharing**: Users can share referral links with friends
3. **Automatic Tracking**: When new users sign up via referral link, it's automatically tracked
4. **Reward System**: Both referrer and referred user earn rewards
5. **Analytics**: Dashboard shows referral statistics and history

### X (Twitter) Integration
1. **OAuth 2.0 Authentication**: Secure X account connection using OAuth 2.0 with PKCE
2. **Wallet Linking**: X accounts are linked to specific wallet addresses
3. **Duplicate Prevention**: One X account can only be connected to one wallet
4. **User Data Sync**: Fetches profile info, follower count, and verification status
5. **Token Management**: Handles access token refresh and expiration
6. **Social Rewards**: Foundation for future social activity-based rewards

## 🔧 **Customization**

### Change Target Network

To change from BSC Testnet to another network:

1. Update `lib/wagmi.ts`:
```typescript
export const TARGET_CHAIN_ID = 97; // Change this
export const TARGET_CHAIN_CONFIG = {
  chainId: '0x61', // Update hex value
  chainName: 'Your Network',
  // ... other config
};
```

2. Update all references in `components/dashboard-cta.tsx`

### Modify Card Generation

Edit the database trigger in `database_setup.sql`:
```sql
-- Modify expiration dates, card types, or generation logic
CREATE OR REPLACE FUNCTION create_user_cards(p_user_id BIGINT)
-- ... customize as needed
```

### Customize Referral Rewards

Update the referral reward logic in `lib/supabase.ts`:
```typescript
// In referralService.processReferral function
// Add your custom reward calculation logic
```

## 📱 **Responsive Features**

- **Desktop**: Full feature set with enhanced animations
- **Mobile**: Optimized particle count and simplified interactions
- **Touch**: Optimized for mobile wallet apps and touch interactions

## 🚀 **Deployment**

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fnextjs-notion-waitlist-template&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,NEXT_PUBLIC_WC_PROJECT_ID)

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Set environment variables in your hosting platform
3. Deploy the `.next` folder

## 🔍 **Debugging**

The app includes a debug component that shows:
- Current chain ID
- Network name
- Connection status
- BSC Testnet validation

Enable it in development by keeping the `<DebugChain />` component.

## 🤖 **Discord Bot Features**

The project includes a comprehensive Discord bot with the following features:

### **Core Features**
- 🎯 **XP System**: Users earn XP for messages, reactions, and daily activity
- 🔗 **Invite Tracking**: Automatic tracking of Discord invites with rewards
- 💾 **Persistent Invite Links**: Invite links are saved in database and reused
- 🏆 **Leaderboard**: Real-time XP leaderboard with rankings
- 🎮 **Level System**: 5 levels (Bronze, Silver, Gold, Platinum, Diamond) with BBLP rewards

### **Invite System**
- **Database-First Tracking**: Primary lookup from database (persistent)
- **Memory Tracking**: Secondary lookup for performance (temporary)
- **Custom Invite Codes**: `Waitlist-{userId}` format for easy tracking
- **Fallback System**: Automatic fallback to random codes if custom fails
- **Verification**: Validates saved invites against Discord before use
- **Rewards**: +25 XP and +3 BBLP per successful invite

### **Admin Commands**
- `/admin list_invites` - List recent invite records
- `/admin delete_invite` - Delete specific invite record
- `/admin list_saved_invites` - List saved invite links from database
- `/admin clear_saved_invite` - Clear saved invite link for user
- `/admin sync_invites` - Sync between Discord and database
- `/admin debug_invite` - Debug invite eligibility for user
- `/admin batch_status` - Show batch processing status

### **User Commands**
- `/xp` - View your XP stats and level
- `/leaderboard` - View top users by XP
- `/invite` - Get your saved invite link or create new one
- `/connect` - Get connection instructions
- `/help` - Show all available commands

### **Performance Features**
- **Caching**: 10-minute cache TTL for user data
- **Batch Processing**: 30-second batch updates for XP
- **Memory Management**: Automatic cleanup of old data
- **Rate Limiting**: Prevents spam and abuse

### **Setup Instructions**
1. Create a Discord bot at [discord.com/developers](https://discord.com/developers)
2. Add bot token to environment variables
3. Run the database migration: `scripts/add-invite-link-column.sql`
4. Start the bot: `cd discord-bot && npm start`
5. Test tracking system: `node scripts/test-invite-tracking.js`

### **Troubleshooting**
- **Invite tracking issues**: Use `/admin debug_tracking` to check tracking status
- **Database sync issues**: Use `/admin sync_invites` to sync Discord and database
- **Test tracking**: Run `node scripts/test-invite-tracking.js` to debug issues

## 🛡️ **Security Features**

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Wallet address validation
- ✅ Network validation before any operations
- ✅ SQL injection protection via Supabase
- ✅ Environment variable validation
- ✅ Referral fraud prevention (self-referral blocking)
- ✅ Transaction hash uniqueness validation
- ✅ Discord bot rate limiting and abuse prevention

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

If you encounter issues:

1. **Network Issues**: Ensure you're on BSC Testnet (Chain ID: 97)
2. **Database Issues**: Check your Supabase configuration and run the migration script
3. **Wallet Issues**: Try refreshing the page and reconnecting your wallet

For further support, please create an issue in the repository.

---

**Made with ❤️ for the BSC Testnet ecosystem**
