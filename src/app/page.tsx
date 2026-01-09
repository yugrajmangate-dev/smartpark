export default function Home() {
  return (
    <main className="bg-bg-dark min-h-screen">
      <nav className="bg-bg-secondary border-b border-primary/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-text">SmartPark</h1>
          <button className="btn-primary">Login</button>
        </div>
      </nav>

      <section className="py-20 px-4 md:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
          Find Parking Faster
        </h1>
        <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          AI-powered parking discovery and reservation platform for Hinjewadi Phase 1. Stop circling, start parking.
        </p>
        <button className="btn-primary inline-block">Get Started</button>
      </section>

      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Why SmartPark?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Real-Time Map', desc: 'See available spots instantly' },
            { title: 'AI Assistant', desc: 'Smart recommendations' },
            { title: 'Secure Booking', desc: 'Instant confirmation' },
            { title: 'Manager Tools', desc: 'Easy management' },
          ].map((feature) => (
            <div key={feature.title} className="glass-effect p-6 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
