import { Brain, Heart, BarChart3, MessageCircle, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Therapy",
      description: "Get personalized therapy sessions powered by advanced AI that adapts to your unique needs and emotional patterns.",
      gradient: "gradient-primary"
    },
    {
      icon: Heart,
      title: "Mood Tracking",
      description: "Monitor your emotional well-being with intuitive mood tracking tools that help identify patterns and triggers.",
      gradient: "gradient-secondary"
    },
    {
      icon: BarChart3,
      title: "Mental Health Assessments",
      description: "Take validated assessments like GAD-7 and PHQ-9 to get professional insights into your mental health status.",
      gradient: "gradient-calm"
    },
    {
      icon: MessageCircle,
      title: "Smart Journaling",
      description: "Express your thoughts with AI-guided journaling that provides insights and suggestions for emotional growth.",
      gradient: "gradient-primary"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your mental health data is completely private and secure, with end-to-end encryption and HIPAA compliance.",
      gradient: "gradient-secondary"
    },
    {
      icon: Zap,
      title: "Instant Support",
      description: "Access immediate support and coping strategies whenever you need them, 24/7 availability.",
      gradient: "gradient-calm"
    },
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-poppins text-foreground mb-4">
            Powerful Features for
            <span className="block text-transparent bg-clip-text gradient-primary">
              Your Mental Wellness
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover comprehensive tools designed by mental health professionals and powered by AI to support your journey to better mental health.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-soft hover:shadow-medium transition-all duration-300 border-border/50 hover:border-primary/20 group">
                <CardHeader>
                  <div className={`w-12 h-12 ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-poppins text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;