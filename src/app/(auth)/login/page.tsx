'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/lib/validators/auth.schemas';
import { useAuth } from '@/contexts/auth-context';
import { Mail, Lock, Shield, AlertCircle, CheckCircle, X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState<'credentials' | '2fa' | 'success' | 'failed'>('credentials');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleCredentialsSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call for credentials verification
      setTimeout(() => {
        setIsLoading(false);
        setStep('2fa');
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const fullCode = code.join('');
    
    console.log('Entered code:', fullCode); // Debug log
    console.log('Code array:', code); // Debug log
    
    // Simulate API call for 2FA verification
    setTimeout(async () => {
      try {
        if (fullCode === '123456') {
          setStep('success');
          setIsLoading(false); // Stop loading on success
          
          // Add a delay before attempting login to show success state
          setTimeout(async () => {
            try {
              const credentials = getValues();
              console.log('Simulating login with credentials:', credentials); // Debug log
              
              // Simulate successful login instead of calling real API
              setTimeout(() => {
                console.log('Login simulation successful, redirecting...');
                // Simulate successful login redirect
                router.push('/admin/home');
              }, 1500);
              
            } catch (loginErr) {
              console.error('Login error:', loginErr); // Debug log
              setError(loginErr instanceof Error ? loginErr.message : 'Login failed');
              setStep('failed');
            }
          }, 1000);
        } else {
          setIsLoading(false);
          setError(`The verification code you entered is incorrect. You entered: ${fullCode}`);
          setStep('failed');
        }
      } catch (err) {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : 'Login failed');
        setStep('failed');
      }
    }, 1000);
  };

  const handleCodeInput = (index: number, value: string) => {
    // Only allow numeric input
    if (value && !/^\d$/.test(value)) return;
    
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    console.log('Code updated:', newCode); // Debug log

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const resetToCredentials = () => {
    setStep('credentials');
    setCode(['', '', '', '', '', '']);
    setError(null);
  };

  const retry2FA = () => {
    setStep('2fa');
    setCode(['', '', '', '', '', '']);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex items-center justify-center p-6">
      {/* Main Container */}
      <div className="w-full max-w-110">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#F5A623] rounded-xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">M</span>
          </div>
          <h1 className="text-[20px] font-[600] text-[#2B2B2B]">Maltina Tour Admin</h1>
          <p className="text-[13px] text-[#9E9E9E] mt-1">Operations Control Panel</p>
        </div>

        {/* Credentials Step */}
        {step === 'credentials' && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-8">
            <div className="mb-6">
              <h2 className="text-[16px] font-[600] text-[#2B2B2B]">Sign In</h2>
              <p className="text-[13px] text-[#9E9E9E] mt-1">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit(handleCredentialsSubmit)} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[13px] font-[500] text-[#2B2B2B]">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
                  <Input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="admin@maltina.com"
                    className="pl-10 h-10 text-[13px] border-[#E5E7EB] focus-visible:ring-[#F5A623] focus-visible:border-transparent"
                  />
                </div>
                {errors.email && (
                  <p className="text-[12px] text-[#8C1D18]">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[13px] font-[500] text-[#2B2B2B]">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
                  <Input
                    {...register('password')}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10 h-10 text-[13px] border-[#E5E7EB] focus-visible:ring-[#F5A623] focus-visible:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E] hover:text-[#2B2B2B] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[12px] text-[#8C1D18]">{errors.password.message}</p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <Alert className="border-[#8C1D18] bg-[#8C1D18]/5">
                  <AlertCircle className="h-4 w-4 text-[#8C1D18]" />
                  <AlertDescription className="text-[12px] text-[#8C1D18]">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-[#F5A623] text-white text-[13px] font-[500] hover:bg-[#E09615] focus-visible:ring-[#F5A623]"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
              <p className="text-[12px] text-[#9E9E9E] text-center">
                Need access? Contact your system administrator
              </p>
            </div>
          </div>
        )}

        {/* 2FA Step */}
        {step === '2fa' && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#F5A623]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-[#F5A623]" />
              </div>
              <h2 className="text-[16px] font-[600] text-[#2B2B2B]">Two-Factor Authentication</h2>
              <p className="text-[13px] text-[#9E9E9E] mt-1">Enter the 6-digit code from your authenticator app</p>
            </div>

            <form onSubmit={handle2FASubmit} className="space-y-6">
              {/* 6-Digit Code Input */}
              <div className="flex justify-center gap-2">
                {code.map((digit, index) => (
                  <Input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeInput(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-[20px] font-[500] border-[#E5E7EB] focus-visible:ring-[#F5A623] focus-visible:border-transparent"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <Alert className="border-[#8C1D18] bg-[#8C1D18]/5">
                  <AlertCircle className="h-4 w-4 text-[#8C1D18]" />
                  <AlertDescription className="text-[12px] text-[#8C1D18]">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || code.some(d => !d)}
                className="w-full h-10 bg-[#F5A623] text-white text-[13px] font-[500] hover:bg-[#E09615] focus-visible:ring-[#F5A623]"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  'Verify & Sign In'
                )}
              </Button>

              {/* Back Link */}
              <Button
                type="button"
                variant="ghost"
                onClick={resetToCredentials}
                className="w-full text-[13px] text-[#9E9E9E] hover:text-[#2B2B2B] h-auto p-0"
              >
                Back to login
              </Button>
            </form>

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
              <p className="text-[12px] text-[#9E9E9E] text-center">
                Lost access to your authenticator? Contact IT support
              </p>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {step === 'success' && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2F6B3C] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-[16px] font-[600] text-[#2B2B2B]">Authentication Successful</h2>
              <p className="text-[13px] text-[#9E9E9E] mt-2">Redirecting to Operations Cockpit...</p>
              
              <div className="mt-6 flex justify-center">
                <div className="w-8 h-8 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        )}

        {/* Failed Modal */}
        {step === 'failed' && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#8C1D18] rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-[16px] font-[600] text-[#2B2B2B]">Authentication Failed</h2>
              <p className="text-[13px] text-[#9E9E9E] mt-2">The verification code you entered is incorrect</p>
              
              <div className="mt-6 space-y-3">
                <Button
                  onClick={retry2FA}
                  className="w-full h-10 bg-[#F5A623] text-white text-[13px] font-[500] hover:bg-[#E09615]"
                >
                  Try Again
                </Button>
                <Button
                  onClick={resetToCredentials}
                  variant="outline"
                  className="w-full h-10 border-[#E5E7EB] text-[#2B2B2B] text-[13px] font-[500] hover:bg-[#F2F1EE]"
                >
                  Back to Login
                </Button>
              </div>

              <p className="text-[12px] text-[#9E9E9E] mt-6">
                Multiple failed attempts will lock your account for security
              </p>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-[11px] text-[#9E9E9E]">
            All login attempts are logged and monitored for security
          </p>
        </div>
      </div>
    </div>
  );
}