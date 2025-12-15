import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertCircle } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const LoginScreen = ({ onLoginSuccess }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Static credentials
  const VALID_EMAIL = 'user@sip-my-vibe.com';
  const VALID_PASSWORD = 'drinkme123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        localStorage.setItem('isLoggedIn', 'true');
        onLoginSuccess();
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/4 right-10 w-40 h-40 bg-highlight/20 rounded-full blur-2xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Floating emojis */}
      <motion.span
        className="absolute top-20 left-10 text-4xl"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🍹
      </motion.span>
      <motion.span
        className="absolute top-32 right-16 text-3xl"
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
      >
        🧃
      </motion.span>
      <motion.span
        className="absolute bottom-32 left-16 text-3xl"
        animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 0.6 }}
      >
        🍸
      </motion.span>
      <motion.span
        className="absolute bottom-24 right-10 text-4xl"
        animate={{ y: [0, 12, 0], rotate: [0, -12, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: 0.2 }}
      >
        ☕
      </motion.span>

      {/* Main content */}
      <motion.div
        className="text-center z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <span className="text-6xl">🔐</span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-display text-foreground mb-2 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Welcome Back
        </motion.h1>

        <motion.p
          className="text-lg text-muted-foreground font-body mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Sign in to your <span className="text-gradient font-bold">Sip My Vibe</span>
        </motion.p>

        {/* Login Form */}
        <motion.form
          onSubmit={handleLogin}
          className="space-y-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          {/* Email Input */}
          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold text-foreground">Email</label>
            <Input
              type="email"
              placeholder="user@sip-my-vibe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full bg-muted border-2 border-muted-foreground/20 focus:border-primary focus:ring-0 text-foreground placeholder:text-muted-foreground/60 font-body transition-colors"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold text-foreground">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full bg-muted border-2 border-muted-foreground/20 focus:border-primary focus:ring-0 text-foreground placeholder:text-muted-foreground/60 font-body transition-colors"
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="flex items-center gap-2 bg-destructive/10 border-2 border-destructive rounded-lg p-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <span className="text-sm font-semibold text-destructive">{error}</span>
            </motion.div>
          )}

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full group relative"
            size="lg"
          >
            {isLoading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                ⚙️
              </motion.span>
            ) : (
              <>
                Sign In
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </>
            )}
          </Button>
        </motion.form>


      </motion.div>
    </div>
  );
};

export default LoginScreen;
