'use client';

import { useState } from 'react';
import { Shield, Smartphone, Copy, Check, ChevronRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function MFAEnrollmentPage() {
  const [step, setStep] = useState<'intro' | 'qr' | 'verify' | 'backup' | 'complete'>('intro');
  const [verificationCode, setVerificationCode] = useState('');
  const [copied, setCopied] = useState(false);

  const secretKey = 'JBSWY3DPEHPK3PXP';
  const backupCodes = [
    '2X4G-9K7M-1P5T',
    'H8W3-6N2Q-4R9V',
    'L1B5-7F4K-3M8P',
    'Y6T2-9V3H-5K1W',
    'P4R7-2M8N-6Q3L',
    'K9H1-5W6T-7B2F',
    'M3L8-1Q4R-9V5Y',
    'T7K2-6P9H-3N1B'
  ];

  const handleCopySecret = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      setStep('backup');
    }
  };

  const handleDownloadBackupCodes = () => {
    const blob = new Blob([`Maltina Admin - MFA Backup Codes\n\nGenerated: ${new Date().toLocaleDateString()}\n\n${backupCodes.join('\n')}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'maltina-mfa-backup-codes.txt';
    a.click();
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-[520px]">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#F5A623] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-[18px] font-[600] text-[#2B2B2B] mb-2">Enable Multi-Factor Authentication</h1>
          <p className="text-[#5E5E5E] text-[15px]">
            Add an extra layer of security to your admin account
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="flex items-center justify-between mb-8">
          {['Setup', 'Verify', 'Backup', 'Complete'].map((label, idx) => (
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  (step === 'intro' && idx === 0) ||
                  (step === 'qr' && idx === 0) ||
                  (step === 'verify' && idx === 1) ||
                  (step === 'backup' && idx === 2) ||
                  (step === 'complete' && idx === 3)
                    ? 'bg-[#F5A623] text-white'
                    : (step === 'backup' && idx < 2) || (step === 'complete' && idx < 3)
                    ? 'bg-[#2F6B3C] text-white'
                    : 'bg-[#E5E7EB] text-[#9E9E9E]'
                }`}>
                  {(step === 'backup' && idx < 2) || (step === 'complete' && idx < 3) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span className="text-xs text-[#5E5E5E] mt-2">{label}</span>
              </div>
              {idx < 3 && (
                <div className={`flex-1 h-0.5 mx-2 ${
                  (step === 'backup' && idx < 2) || (step === 'complete' && idx < 3)
                    ? 'bg-[#2F6B3C]'
                    : 'bg-[#E5E7EB]'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-8">
          {/* Step 1: Intro */}
          {step === 'intro' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[16px] font-[600] text-[#2B2B2B] mb-2">Download an Authenticator App</h2>
                <p className="text-[#5E5E5E] text-[15px]">
                  You'll need an authenticator app on your mobile device to generate verification codes.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-[#F2F1EE] rounded-lg">
                  <Smartphone className="w-5 h-5 text-[#F5A623]" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#2B2B2B]">Google Authenticator</div>
                    <div className="text-xs text-[#5E5E5E]">iOS & Android</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#F2F1EE] rounded-lg">
                  <Smartphone className="w-5 h-5 text-[#F5A623]" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#2B2B2B]">Microsoft Authenticator</div>
                    <div className="text-xs text-[#5E5E5E]">iOS & Android</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#F2F1EE] rounded-lg">
                  <Smartphone className="w-5 h-5 text-[#F5A623]" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#2B2B2B]">Authy</div>
                    <div className="text-xs text-[#5E5E5E]">iOS, Android & Desktop</div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setStep('qr')}
                className="w-full bg-[#F5A623] hover:bg-[#E09615] text-white"
              >
                Continue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: QR Code */}
          {step === 'qr' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[16px] font-[600] text-[#2B2B2B] mb-2">Scan QR Code</h2>
                <p className="text-[#5E5E5E] text-[15px]">
                  Open your authenticator app and scan this QR code to add your Maltina Admin account.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                {/* QR Code Placeholder */}
                <div className="w-48 h-48 bg-[#F2F1EE] rounded-lg flex items-center justify-center border-2 border-dashed border-[#E5E7EB]">
                  <div className="text-center text-[#9E9E9E] text-sm">
                    QR Code
                    <br />
                    <span className="text-xs">Maltina Admin MFA</span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-[#9E9E9E] mb-2">Can't scan? Enter this code manually:</div>
                  <div className="flex items-center gap-2 justify-center">
                    <code className="px-3 py-2 bg-[#F2F1EE] rounded text-sm text-[#2B2B2B] tracking-wider font-mono">
                      {secretKey}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopySecret}
                      className="p-2 h-auto"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-[#2F6B3C]" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#5E5E5E]" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setStep('verify')}
                className="w-full bg-[#F5A623] hover:bg-[#E09615] text-white"
              >
                I've Scanned the Code
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 3: Verify */}
          {step === 'verify' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[16px] font-[600] text-[#2B2B2B] mb-2">Enter Verification Code</h2>
                <p className="text-[#5E5E5E] text-[15px]">
                  Enter the 6-digit code from your authenticator app to confirm the setup.
                </p>
              </div>

              <div>
                <Label htmlFor="verification-code" className="text-sm text-[#2B2B2B] mb-2">6-Digit Code</Label>
                <Input
                  id="verification-code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-4 py-3 text-center text-2xl tracking-[0.5em] focus-visible:ring-[#F5A623] focus-visible:border-transparent"
                  maxLength={6}
                />
              </div>

              <Button
                onClick={handleVerify}
                disabled={verificationCode.length !== 6}
                className="w-full bg-[#F5A623] hover:bg-[#E09615] text-white disabled:opacity-50"
              >
                Verify Code
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 4: Backup Codes */}
          {step === 'backup' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[16px] font-[600] text-[#2B2B2B] mb-2">Save Your Backup Codes</h2>
                <p className="text-[#5E5E5E] text-[15px]">
                  Store these backup codes in a safe place. You can use them to access your account if you lose your device.
                </p>
              </div>

              <div className="bg-[#F2F1EE] rounded-lg p-4">
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code, idx) => (
                    <div key={idx} className="font-mono text-sm text-[#2B2B2B] bg-white px-3 py-2 rounded border border-[#E5E7EB]">
                      {code}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 bg-[#FFF4E6] border border-[#F5A623] rounded-lg">
                <Shield className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                <div className="text-xs text-[#5E5E5E]">
                  Each backup code can only be used once. Store them securely and do not share them with anyone.
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleDownloadBackupCodes}
                  className="flex-1 border-[#E5E7EB] text-[#2B2B2B] hover:bg-[#F2F1EE]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={() => setStep('complete')}
                  className="flex-1 bg-[#F5A623] hover:bg-[#E09615] text-white"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Complete */}
          {step === 'complete' && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-[#2F6B3C] rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-white" />
              </div>

              <div>
                <h2 className="text-[16px] font-[600] text-[#2B2B2B] mb-2">MFA Successfully Enabled</h2>
                <p className="text-[#5E5E5E] text-[15px]">
                  Your account is now protected with multi-factor authentication. You'll be asked for a verification code each time you sign in.
                </p>
              </div>

              <div className="p-4 bg-[#F2F1EE] rounded-lg text-left">
                <div className="text-sm font-medium text-[#2B2B2B] mb-1">Next time you sign in:</div>
                <ol className="text-xs text-[#5E5E5E] space-y-1 ml-4 list-decimal">
                  <li>Enter your email and password</li>
                  <li>Open your authenticator app</li>
                  <li>Enter the 6-digit code shown in the app</li>
                </ol>
              </div>

              <Button
                onClick={() => window.location.href = '/admin/home'}
                className="w-full bg-[#F5A623] hover:bg-[#E09615] text-white"
              >
                Go to Dashboard
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#9E9E9E]">
            Need help? Contact your system administrator
          </p>
        </div>
      </div>
    </div>
  );
}