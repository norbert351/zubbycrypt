'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Step = 'email' | 'code' | 'reset' | 'done';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSendCode() {
    setError('');
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email address');
      return;
    }
    setLoading(true);
    // Generate a random 6-digit code
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(newCode);
    // Simulate sending
    setTimeout(() => {
      setLoading(false);
      setStep('code');
      // Show the code so user can use it (simulates email delivery)
      alert(`Your verification code is: ${newCode}`);
    }, 800);
  }

  function handleCodeInput(idx: number, val: string) {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[idx] = val;
    setCode(next);
    setError('');
    // Auto-advance to next input
    if (val && idx < 5) {
      const nextInput = document.getElementById(`code-${idx + 1}`);
      nextInput?.focus();
    }
    // Auto-submit when all 6 digits entered
    if (val && idx === 5) {
      const fullCode = next.join('');
      if (fullCode.length === 6) {
        verifyCode(fullCode);
      }
    }
  }

  function handleCodeKeyDown(idx: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      const prevInput = document.getElementById(`code-${idx - 1}`);
      prevInput?.focus();
    }
  }

  function verifyCode(enteredCode: string) {
    setError('');
    if (enteredCode !== generatedCode) {
      setError('Invalid code. Try again.');
      return;
    }
    setStep('reset');
  }

  function handleReset() {
    setError('');
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('done');
    }, 1000);
  }

  // Reset state and go back
  function resetAll() {
    setEmail('');
    setCode(['', '', '', '', '', '']);
    setGeneratedCode('');
    setPassword('');
    setConfirm('');
    setError('');
    setStep('email');
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0a0f]">
      <div className="w-full max-w-md">
        {/* Back link */}
        <button
          onClick={() => router.push('/')}
          className="text-[#8888a0] hover:text-white text-sm mb-6 flex items-center gap-1 transition"
        >
          ← Back to dashboard
        </button>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-8">
          {['email', 'code', 'reset'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                step === s || step === 'done'
                  ? 'bg-[#7c5cfc] text-white'
                  : ['code', 'reset', 'done'].includes(step) && ['code', 'reset'].includes(s)
                  ? 'bg-[#7c5cfc]/30 text-[#7c5cfc]'
                  : 'bg-[#1a1a26] text-[#5555]'
              }`}>
                {step === 'done' && i <= ['email', 'code', 'reset'].indexOf('reset') ? '✓' : i + 1}
              </div>
              {i < 2 && <div className={`w-8 h-0.5 ${step !== 'email' || (step === 'email' && i === 0) ? 'bg-[#7c5cfc]/30' : 'bg-[#1a1a26]'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-[#12121a] rounded-2xl border border-[#2a2a3a] p-6 md:p-8">
          {/* Step 1: Email */}
          {step === 'email' && (
            <div>
              <h1 className="text-xl font-bold mb-1">Forgot password</h1>
              <p className="text-sm text-[#8888a0] mb-6">Enter your email and we'll send a 6-digit code</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#8888a0] uppercase tracking-wide mb-1.5 block">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleSendCode()}
                    placeholder="you@example.com"
                    className="w-full bg-[#1a1a26] border border-[#2a2a3a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#5555] outline-none focus:border-[#7c5cfc] transition"
                    autoFocus
                  />
                </div>
                {error && <p className="text-[#f87171] text-xs">{error}</p>}
                <button
                  onClick={handleSendCode}
                  disabled={loading}
                  className="w-full bg-[#7c5cfc] hover:bg-[#6a4ae8] disabled:opacity-40 text-white font-medium rounded-lg py-3 text-sm transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : 'Send code'}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: 6-digit code */}
          {step === 'code' && (
            <div>
              <h1 className="text-xl font-bold mb-1">Enter code</h1>
              <p className="text-sm text-[#8888a0] mb-2">
                A 6-digit code was sent to <span className="text-white">{email}</span>
              </p>
              <div className="flex gap-2 justify-center my-8">
                {code.map((digit, i) => (
                  <input
                    key={i}
                    id={`code-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleCodeInput(i, e.target.value)}
                    onKeyDown={e => handleCodeKeyDown(i, e)}
                    className={`w-11 h-12 md:w-12 md:h-14 text-center text-lg font-bold bg-[#1a1a26] border rounded-lg outline-none transition ${
                      digit ? 'border-[#7c5cfc]' : 'border-[#2a2a3a]'
                    } text-white focus:border-[#7c5cfc]`}
                    autoFocus={i === 0}
                  />
                ))}
              </div>
              {error && <p className="text-[#f87171] text-xs text-center mb-4">{error}</p>}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('email')}
                  className="flex-1 bg-[#1a1a26] hover:bg-[#2a2a3a] text-white rounded-lg py-3 text-sm transition"
                >
                  Back
                </button>
                <button
                  onClick={() => verifyCode(code.join(''))}
                  disabled={code.join('').length !== 6}
                  className="flex-1 bg-[#7c5cfc] hover:bg-[#6a4ae8] disabled:opacity-40 text-white rounded-lg py-3 text-sm transition"
                >
                  Verify
                </button>
              </div>
            </div>
          )}

          {/* Step 3: New password */}
          {step === 'reset' && (
            <div>
              <h1 className="text-xl font-bold mb-1">Reset password</h1>
              <p className="text-sm text-[#8888a0] mb-6">Choose a new password</p>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-[#8888a0] uppercase tracking-wide mb-1.5 block">New password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    placeholder="Min 6 characters"
                    className="w-full bg-[#1a1a26] border border-[#2a2a3a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#5555] outline-none focus:border-[#7c5cfc] transition"
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-xs text-[#8888a0] uppercase tracking-wide mb-1.5 block">Confirm password</label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={e => { setConfirm(e.target.value); setError(''); }}
                    placeholder="Repeat password"
                    className="w-full bg-[#1a1a26] border border-[#2a2a3a] rounded-lg px-4 py-3 text-sm text-white placeholder-[#5555] outline-none focus:border-[#7c5cfc] transition"
                  />
                </div>
                {error && <p className="text-[#f87171] text-xs">{error}</p>}
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="w-full bg-[#7c5cfc] hover:bg-[#6a4ae8] disabled:opacity-40 text-white font-medium rounded-lg py-3 text-sm transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : 'Reset password'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Done */}
          {step === 'done' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#34d399]/15 flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl text-[#34d399]">✓</span>
              </div>
              <h1 className="text-xl font-bold mb-1">Password reset</h1>
              <p className="text-sm text-[#8888a0] mb-6">Your password has been updated successfully</p>
              <button
                onClick={() => router.push('/')}
                className="w-full bg-[#7c5cfc] hover:bg-[#6a4ae8] text-white font-medium rounded-lg py-3 text-sm transition"
              >
                Back to dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
