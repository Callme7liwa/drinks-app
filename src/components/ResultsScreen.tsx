import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DrinkResult } from '@/pages/Index';
import { RefreshCw, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ResultsScreenProps {
  result: DrinkResult;
  onStartOver: () => void;
}

const ResultsScreen = ({ result, onStartOver }: ResultsScreenProps) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `My drink vibe: ${result.drinkName}`,
          text: result.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          `My drink vibe is "${result.drinkName}"! ${result.description} 🍹 Find yours at ${window.location.href}`
        );
        toast({
          title: "Copied to clipboard!",
          description: "Share your drink vibe with friends!",
        });
      }
    } catch (error) {
      console.log('Share cancelled');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden">
      {/* Confetti background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: -50,
            }}
            initial={{ y: 0, rotate: 0, opacity: 0 }}
            animate={{
              y: 1000,
              rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          >
            {['🎉', '✨', '🍹', '⭐', '🎊'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center z-10 max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-lg font-bold text-primary mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Your drink has arrived! 🎉
        </motion.p>

        {/* Image */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-4 border-foreground shadow-brutal-lg bg-card">
            <img
              src={result.imageUrl}
              alt={result.drinkName}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Decorative elements */}
          <motion.span
            className="absolute -top-4 -right-2 text-4xl"
            animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute -bottom-2 -left-4 text-3xl"
            animate={{ rotate: [0, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          >
            🌟
          </motion.span>
        </motion.div>

        {/* Drink name */}
        <motion.h1
          className="text-4xl md:text-5xl font-display text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {result.drinkName}
        </motion.h1>

        {/* Description */}
        <motion.div
          className="bg-card border-2 border-foreground rounded-2xl p-6 shadow-brutal mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-lg text-muted-foreground font-body leading-relaxed">
            {result.description}
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            variant="outline"
            size="lg"
            onClick={handleShare}
            className="flex-1"
          >
            <Share2 className="w-5 h-5" />
            Share
          </Button>
          <Button
            size="lg"
            onClick={onStartOver}
            className="flex-1"
          >
            <RefreshCw className="w-5 h-5" />
            Start Over
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultsScreen;
