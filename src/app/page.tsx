'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Map, Shield, Zap } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const featureData = [
  {
    icon: Map,
    title: 'Real-Time Maps',
    desc: 'Live TomTom integration for instant parking discovery',
  },
  {
    icon: Shield,
    title: 'Secure Booking',
    desc: 'Transactional reservations with atomic locking',
  },
  {
    icon: Zap,
    title: 'AI Assistant',
    desc: 'Smart recommendations powered by enterprise logic',
  },
  {
    icon: ArrowRight,
    title: 'Quick Response',
    desc: '1-click incident reporting for emergencies',
  },
]

export default function Home() {
  return (
    <main className="bg-sp-black min-h-screen overflow-hidden">
      {/* Navigation */}
      <motion.nav
        className="glass-effect backdrop-blur-lg border-b border-sp-orange/10 sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-4">
          <motion.h1
            className="text-2xl md:text-3xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            SmartPark
          </motion.h1>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-8 min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Decorative Glows */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-sp-orange/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-sp-amber/5 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div variants={itemVariants}>
            <h1 className="heading-1 gradient-text mb-6">
              Find Parking <span className="text-sp-orange">Instantly</span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Enterprise-grade parking discovery and management for Hinjewadi Phase 1. 
            Real-time slots, secure booking, and instant incident resolution.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              className="btn-primary flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 107, 44, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-8 bg-sp-charcoal/30 border-y border-sp-orange/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="heading-2 gradient-text-amber text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why SmartPark?
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featureData.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="card-interactive group"
                  whileHover={{ y: -5, boxShadow: '0 0 30px rgba(255, 107, 44, 0.2)' }}
                >
                  <div className="flex flex-col h-full">
                    <motion.div
                      className="mb-4 p-3 bg-sp-orange/10 rounded-lg w-fit"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-6 h-6 text-sp-orange" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-sp-orange transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <motion.div
          className="max-w-4xl mx-auto glass-effect rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-sp-orange/5 to-sp-amber/5 pointer-events-none" />

          <motion.div className="relative z-10">
            <h2 className="heading-3 gradient-text mb-4">Ready to transform parking?</h2>
            <p className="text-text-secondary mb-8 text-lg">
              Join enterprise managers and users on SmartPark today.
            </p>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        className="border-t border-sp-orange/10 bg-sp-charcoal/50 py-8 px-4 md:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto text-center text-text-secondary text-sm">
          <p>&copy; 2026 SmartPark. Enterprise Parking Management for Hinjewadi Phase 1, Pune.</p>
        </div>
      </motion.footer>
    </main>
  )
}
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
