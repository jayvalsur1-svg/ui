import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DemoViewerShell } from '../../components/common/DemoViewerShell';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  CreditCard,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Building,
  Sparkles,
  ArrowRight,
  DollarSign,
  Send,
  Plus,
  AlertTriangle,
  X,
  PieChart,
  Check,
  ChevronRight,
  Globe
} from 'lucide-react';

interface Transaction {
  id: string;
  merchant: string;
  category: 'Cloud & Tech' | 'SaaS Tools' | 'Travel & Dining' | 'Client Income' | 'Payroll';
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  currency: string;
  date: string;
  status: 'Settled' | 'Pending';
  iconBg: string;
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', merchant: 'Amazon Web Services', category: 'Cloud & Tech', type: 'expense', amount: 3240.50, currency: 'USD', date: 'Today, 2:15 PM', status: 'Settled', iconBg: 'bg-amber-500/10 text-amber-400' },
  { id: 'tx2', merchant: 'Stripeflow Ltd (Retainer)', category: 'Client Income', type: 'income', amount: 12500.00, currency: 'USD', date: 'Yesterday, 10:30 AM', status: 'Settled', iconBg: 'bg-emerald-500/10 text-emerald-400' },
  { id: 'tx3', merchant: 'OpenAI API Platform', category: 'SaaS Tools', type: 'expense', amount: 1840.20, currency: 'USD', date: 'Oct 09, 2026', status: 'Settled', iconBg: 'bg-cyan-500/10 text-cyan-400' },
  { id: 'tx4', merchant: 'Delta Air Lines (Zurich)', category: 'Travel & Dining', type: 'expense', amount: 890.00, currency: 'USD', date: 'Oct 08, 2026', status: 'Pending', iconBg: 'bg-purple-500/10 text-purple-400' },
  { id: 'tx5', merchant: 'HyperScale AI (Milestone 2)', category: 'Client Income', type: 'income', amount: 8400.00, currency: 'USD', date: 'Oct 06, 2026', status: 'Settled', iconBg: 'bg-emerald-500/10 text-emerald-400' },
  { id: 'tx6', merchant: 'Figma Enterprise Workspace', category: 'SaaS Tools', type: 'expense', amount: 480.00, currency: 'USD', date: 'Oct 04, 2026', status: 'Settled', iconBg: 'bg-pink-500/10 text-pink-400' },
  { id: 'tx7', merchant: 'Engineering Payroll Disbursal', category: 'Payroll', type: 'expense', amount: 16400.00, currency: 'USD', date: 'Oct 01, 2026', status: 'Settled', iconBg: 'bg-indigo-500/10 text-indigo-400' },
];

export const FintechWalletDemo: React.FC = () => {
  // Balance privacy state
  const [hideBalances, setHideBalances] = useState(false);

  // Card status
  const [cardFrozen, setCardFrozen] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);

  // Financial figures state
  const [primaryBalance, setPrimaryBalance] = useState(142500.00);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  // Transaction filter & search
  const [txFilter, setTxFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Transfer money modal state
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [recipient, setRecipient] = useState('Elena Rostova (Dev Lead)');
  const [transferAmount, setTransferAmount] = useState('2500');
  const [transferNote, setTransferNote] = useState('Q4 Architecture Sprint Bonus');
  const [transferSuccessNotice, setTransferSuccessNotice] = useState<string | null>(null);

  // Quick recipient options
  const RECIPIENTS = [
    { name: 'Elena Rostova (Dev Lead)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
    { name: 'Marcus Sterling (Admin)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
    { name: 'Stripeflow Ltd', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
  ];

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesType = txFilter === 'all' || tx.type === txFilter;
      const matchesSearch = tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tx.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [transactions, txFilter, searchQuery]);

  // Execute simulated transfer
  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(transferAmount);
    if (isNaN(numericAmount) || numericAmount <= 0) return;

    // Deduct balance
    setPrimaryBalance((prev) => prev - numericAmount);

    // Append new transaction to ledger
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      merchant: recipient.split(' (')[0],
      category: 'Payroll',
      type: 'transfer',
      amount: numericAmount,
      currency: 'USD',
      date: 'Just now',
      status: 'Settled',
      iconBg: 'bg-indigo-500/10 text-indigo-400',
    };

    setTransactions([newTx, ...transactions]);
    setTransferSuccessNotice(`Simulated transfer of $${numericAmount.toLocaleString()} to ${recipient} completed successfully.`);
    setTransferModalOpen(false);

    // Auto-clear notice after 6 seconds
    setTimeout(() => {
      setTransferSuccessNotice(null);
    }, 6000);
  };

  return (
    <DemoViewerShell
      demoId="fintech-wallet"
      demoTitle="Aura Pay // Global Treasury Wallet"
      category="FinTech & Digital Wealth Management"
      styleBadge="FinTech & Digital Wallet"
    >
      <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans pb-24 selection:bg-emerald-500 selection:text-black">
        
        {/* Compliance & Simulation Disclaimer Banner (Mandatory Requirement) */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 sm:px-8 py-2 text-center text-xs font-mono text-amber-300 flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>DEMONSTRATION ONLY:</strong> Fictional demonstration data. Never implies real transactions or live financial accounts.
          </span>
        </div>

        {/* Sub-Header Navigation */}
        <div className="border-b border-white/10 bg-[#0C101A]/80 backdrop-blur-xl px-4 sm:px-8 py-3 flex items-center justify-between text-xs sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-black text-xs shadow-md">
              <DollarSign className="w-4 h-4 stroke-[3]" />
            </div>
            <div>
              <span className="font-mono font-black text-white uppercase tracking-wider">
                AURA PAY // TREASURY V3
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                MULTI-CURRENCY LEDGER
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setHideBalances(!hideBalances)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Toggle Balance Privacy"
            >
              {hideBalances ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-emerald-400" />}
              <span className="hidden sm:inline text-[11px] font-mono">{hideBalances ? 'Show Values' : 'Hide Values'}</span>
            </button>

            <Link
              to="/request?style=fintech-wallet"
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-1 shadow-md transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Order FinTech UI</span>
            </Link>
          </div>
        </div>

        {/* Transfer Success Notice Banner */}
        {transferSuccessNotice && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{transferSuccessNotice}</span>
              </div>
              <button onClick={() => setTransferSuccessNotice(null)} className="text-emerald-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Main Content Dashboard */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6 pt-6 space-y-6">
          
          {/* TOP SECTION: NET PORTFOLIO & TITANIUM VIRTUAL CARD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Balance Summary Card */}
            <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#101422] to-[#0B0E18] border border-white/10 shadow-2xl flex flex-col justify-between space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    TOTAL NET TREASURY BALANCE
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +6.8% MoM
                  </span>
                </div>

                <div className="text-3xl sm:text-5xl font-display font-black tracking-tight text-white">
                  {hideBalances ? '••••••••••' : `$${(primaryBalance + 89820 + 54120).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                  <span className="text-xs sm:text-sm font-mono text-slate-400 font-normal ml-2">USD</span>
                </div>
                <p className="text-xs text-slate-400">Institutional yield tier • Earned $1,240 interest this period</p>
              </div>

              {/* Multi-Currency Pockets */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">USD Checking</span>
                  <div className="font-mono font-bold text-xs sm:text-sm text-white">
                    {hideBalances ? '••••••' : `$${primaryBalance.toLocaleString()}`}
                  </div>
                  <span className="text-[9px] text-emerald-400 font-mono">Primary Operating</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">EUR Treasury</span>
                  <div className="font-mono font-bold text-xs sm:text-sm text-white">
                    {hideBalances ? '••••••' : '€82,410'}
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">SEPA Instant Ready</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Bitcoin Stash</span>
                  <div className="font-mono font-bold text-xs sm:text-sm text-white">
                    {hideBalances ? '••••••' : '0.84 BTC'}
                  </div>
                  <span className="text-[9px] text-amber-400 font-mono">Multi-Sig Vault</span>
                </div>
              </div>

              {/* Quick Treasury Actions */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                <button
                  onClick={() => setTransferModalOpen(true)}
                  className="py-3 px-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all"
                >
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  <span>Send Money</span>
                </button>

                <button
                  onClick={() => {
                    setPrimaryBalance((prev) => prev + 5000);
                    setTransferSuccessNotice('Simulated ACH Top-Up of $5,000.00 added to USD Checking.');
                  }}
                  className="py-3 px-2 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-white/10 transition-colors"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Deposit Funds</span>
                </button>

                <button
                  onClick={() => setCardFrozen(!cardFrozen)}
                  className={`py-3 px-2 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 border transition-all ${
                    cardFrozen
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
                  }`}
                >
                  {cardFrozen ? <Lock className="w-4 h-4 text-rose-400" /> : <Unlock className="w-4 h-4 text-slate-400" />}
                  <span>{cardFrozen ? 'Unfreeze Card' : 'Freeze Card'}</span>
                </button>
              </div>

            </div>

            {/* Right Virtual Black Titanium Card */}
            <div className="lg:col-span-5 rounded-3xl p-6 bg-gradient-to-tr from-[#121318] via-[#1c1d24] to-[#121318] border border-white/10 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              
              {/* Card Holographic Reflection Gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-5 rounded bg-gradient-to-r from-amber-400 to-yellow-600 border border-yellow-300 shadow-sm" />
                  <span className="font-mono text-xs font-black text-slate-300 tracking-wider">AURA TITANIUM</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  cardFrozen 
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' 
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                }`}>
                  {cardFrozen ? 'LOCKED' : 'ACTIVE'}
                </span>
              </div>

              {/* Card Number & Details */}
              <div className="space-y-4 relative z-10 my-4">
                <div className="font-mono text-lg sm:text-xl font-bold tracking-widest text-slate-200">
                  {showCardDetails ? '4892 • 1084 • 3920 • 7712' : '4892 • •••• •••• 7712'}
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                  <div>
                    <span className="text-[9px] block text-slate-500">CARDHOLDER</span>
                    <span className="font-bold text-white">ALEX MORGAN</span>
                  </div>
                  <div>
                    <span className="text-[9px] block text-slate-500">EXPIRES</span>
                    <span>11/29</span>
                  </div>
                  <div>
                    <span className="text-[9px] block text-slate-500">CVV</span>
                    <span className="font-bold text-emerald-400">{showCardDetails ? '842' : '•••'}</span>
                  </div>
                </div>
              </div>

              {/* Card Controls */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
                <button
                  onClick={() => setShowCardDetails(!showCardDetails)}
                  className="text-slate-400 hover:text-white font-mono flex items-center gap-1"
                >
                  {showCardDetails ? 'Hide Sensitive Details' : 'Reveal Virtual CVV'}
                </button>
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>3D Secure 2.0</span>
                </div>
              </div>

            </div>

          </div>

          {/* MIDDLE SECTION: SPENDING BREAKDOWN & ANALYTICS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Category Spend Distribution */}
            <div className="md:col-span-5 rounded-3xl p-6 bg-[#0C101A] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-white">Monthly Expense Allocation</h3>
                <span className="text-xs font-mono text-slate-400">$24,800.70 Spent</span>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { name: 'Cloud & AI Infrastructure', pct: 38, amount: '$9,424', color: 'bg-amber-400' },
                  { name: 'Software Subscriptions (SaaS)', pct: 26, amount: '$6,448', color: 'bg-cyan-400' },
                  { name: 'Engineering Disbursals', pct: 22, amount: '$5,456', color: 'bg-emerald-400' },
                  { name: 'Global Flights & Travel', pct: 14, amount: '$3,472', color: 'bg-purple-400' },
                ].map((cat) => (
                  <div key={cat.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">{cat.name}</span>
                      <span className="font-mono font-bold text-white">{cat.amount} <span className="text-slate-500 font-normal">({cat.pct}%)</span></span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank-Grade Security & Institutional Safeguards */}
            <div className="md:col-span-7 rounded-3xl p-6 bg-[#0C101A] border border-white/10 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Institutional Safeguard Architecture</span>
                </div>
                <h3 className="font-display font-bold text-base text-white">
                  Multi-Jurisdiction Pass-Through Protection
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every account tier is protected with hardware-enforced WebAuthn biometric signing, sub-second anomaly detection, and automated sweeping into high-yield short-term US Treasury Bills.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="font-mono font-bold text-emerald-400">256-Bit</div>
                  <div className="text-[10px] text-slate-400 font-mono">TLS 1.3 / AES-GCM</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="font-mono font-bold text-emerald-400">0.00%</div>
                  <div className="text-[10px] text-slate-400 font-mono">FX Markup Fee</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="font-mono font-bold text-emerald-400">&lt; 300ms</div>
                  <div className="text-[10px] text-slate-400 font-mono">Settlement Speed</div>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM SECTION: TRANSACTION LEDGER WITH LIVE FILTERING */}
          <div className="rounded-3xl p-6 bg-[#0C101A] border border-white/10 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-base text-white">Audit & Settlement Ledger</h3>
                <p className="text-xs text-slate-400 font-mono">Live reconciliation across all linked accounts</p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search merchant or category..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-[#121624] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-44 sm:w-56"
                  />
                </div>

                {/* Filter Tabs */}
                <div className="flex rounded-xl p-0.5 border border-white/10 bg-[#121624] text-xs font-mono">
                  {(['all', 'income', 'expense'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setTxFilter(mode)}
                      className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                        txFilter === mode
                          ? 'bg-emerald-500 text-black font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Transactions List */}
            <div className="divide-y divide-white/5">
              {filteredTransactions.map((tx) => (
                <div key={tx.id} className="py-3.5 flex items-center justify-between gap-3 hover:bg-white/[0.02] px-2 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${tx.iconBg}`}>
                      {tx.type === 'income' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-white">{tx.merchant}</div>
                      <div className="text-[10px] font-mono text-slate-400">{tx.category} • {tx.date}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`font-mono font-bold text-xs sm:text-sm ${
                      tx.type === 'income' ? 'text-emerald-400' : 'text-slate-200'
                    }`}>
                      {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-400">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* SIMULATED MONEY TRANSFER MODAL */}
        {transferModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <form onSubmit={handleExecuteTransfer} className="w-full max-w-md rounded-3xl bg-[#0D111C] border border-white/15 p-6 shadow-2xl space-y-4">
              
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Send className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-white">Initiate Instant Disbursal</h3>
                </div>
                <button type="button" onClick={() => setTransferModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Recipient Selector */}
              <div className="space-y-1.5 text-xs">
                <label className="text-slate-400 font-mono text-[11px]">Select Beneficiary</label>
                <div className="space-y-1.5">
                  {RECIPIENTS.map((r) => (
                    <div
                      key={r.name}
                      onClick={() => setRecipient(r.name)}
                      className={`p-2.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                        recipient === r.name
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-white font-bold'
                          : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <img src={r.avatar} alt={r.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="truncate">{r.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amount input */}
              <div className="space-y-1 text-xs">
                <label className="text-slate-400 font-mono text-[11px]">Transfer Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-emerald-400 font-bold">$</span>
                  <input
                    type="number"
                    min="1"
                    max={primaryBalance}
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full bg-[#141926] border border-white/10 rounded-xl pl-8 pr-3 py-2 text-sm text-white font-mono font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Available Checking: ${primaryBalance.toLocaleString()}</span>
              </div>

              {/* Transfer Note */}
              <div className="space-y-1 text-xs">
                <label className="text-slate-400 font-mono text-[11px]">Memo / Note</label>
                <input
                  type="text"
                  value={transferNote}
                  onChange={(e) => setTransferNote(e.target.value)}
                  placeholder="e.g., Consulting Invoice settlement"
                  className="w-full bg-[#141926] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setTransferModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-white/10 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider"
                >
                  Send Disbursal
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </DemoViewerShell>
  );
};
