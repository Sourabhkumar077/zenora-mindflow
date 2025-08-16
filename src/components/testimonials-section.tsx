import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Professional",
      content: "Zenora has completely transformed how I manage my anxiety. The AI therapy sessions feel so personalized and understanding. I've never felt more supported in my mental health journey.",
      rating: 5,
      avatar: "/api/placeholder/64/64",
      initials: "SJ"
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      content: "The mood tracking feature helps me understand my patterns better than any other app I've tried. The insights are incredibly valuable for my self-awareness and growth.",
      rating: 5,
      avatar: "/api/placeholder/64/64",
      initials: "MC"
    },
    {
      name: "Emily Rodriguez",
      role: "Healthcare Worker",
      content: "As someone in healthcare, I appreciate how evidence-based and professional Zenora is. The GAD-7 and PHQ-9 assessments are properly implemented and genuinely helpful.",
      rating: 5,
      avatar: "/api/placeholder/64/64",
      initials: "ER"
    },
    {
      name: "David Thompson",
      role: "Teacher",
      content: "The journaling feature with AI insights has been a game-changer for processing my daily stress. It's like having a therapist available 24/7.",
      rating: 5,
      avatar: "/api/placeholder/64/64",
      initials: "DT"
    },
    {
      name: "Lisa Park",
      role: "Business Owner",
      content: "Zenora's privacy-first approach gives me confidence to be completely open about my mental health. The security measures are impressive and reassuring.",
      rating: 5,
      avatar: "/api/placeholder/64/64",
      initials: "LP"
    },
    {
      name: "James Wilson",
      role: "Student",
      content: "The instant support feature has helped me through some really tough moments. Having access to coping strategies whenever I need them is invaluable.",
      rating: 5,
      avatar: "/api/placeholder/64/64",
      initials: "JW"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <section className="py-24 gradient-calm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-poppins text-primary-foreground mb-4">
            Trusted by Thousands
            <span className="block text-primary-foreground/80">
              Transforming Lives Daily
            </span>
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Real stories from real people who've found support, healing, and growth through Zenora's AI-powered mental health platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-medium hover:shadow-strong transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-6 h-6 text-primary-foreground/60 mr-2" />
                    <div className="flex space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  
                  <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-3">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-primary-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-primary-foreground/70">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-2" />
            <span className="text-primary-foreground font-semibold mr-2">4.9/5</span>
            <span className="text-primary-foreground/80">from 10,000+ users</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;