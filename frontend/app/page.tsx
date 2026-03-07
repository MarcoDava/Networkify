import Link from "next/link"
import { ArrowRight, Waypoints, Users, MessageSquare, Ghost, Sparkles, ChevronRight } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: Waypoints,
      title: "Referral Path Engine",
      desc: "Find the smartest path through your network to any company via 1st and 2nd degree connections.",
      color: "from-brand-500 to-brand-600",
      iconBg: "bg-brand-500/10",
      iconColor: "text-brand-400",
    },
    {
      icon: Users,
      title: "Smart Contact Ranking",
      desc: "AI ranks who to message first based on relationship strength and response likelihood.",
      color: "from-accent-cyan to-brand-400",
      iconBg: "bg-accent-cyan/10",
      iconColor: "text-accent-cyan",
    },
    {
      icon: MessageSquare,
      title: "AI Outreach Messages",
      desc: "Generate personalized networking messages tailored to each connection and opportunity.",
      color: "from-accent-emerald to-accent-cyan",
      iconBg: "bg-accent-emerald/10",
      iconColor: "text-accent-emerald",
    },
    {
      icon: Ghost,
      title: "Ghost Job Detection",
      desc: "Identify phantom job postings by analyzing repost frequency and hiring team connections.",
      color: "from-accent-amber to-accent-rose",
      iconBg: "bg-accent-amber/10",
      iconColor: "text-accent-amber",
    },
  ]

  return (
    <div className="relative">
      <section className="relative pt-24 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-surface border border-dark-glassBorder text-sm text-zinc-400 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent-amber" />
            <span>Powered by Neo4j Graph + Gemini AI</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 animate-fade-in">
            Find your warmest path to{" "}
            <span className="text-gradient">any company</span>
          </h1>

          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 animate-fade-in leading-relaxed">
            Upload your LinkedIn connections. Our AI builds your career graph, 
            finds hidden referral paths, and crafts the perfect outreach message.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link href="/upload" className="btn-primary text-base px-8 py-4">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="btn-secondary text-base px-8 py-4">
              View Demo
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-sm text-zinc-500 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-emerald" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-emerald" />
              <span>Data stays private</span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse-slow" />
      </section>

      <section className="py-24 px-6 border-t border-dark-glassBorder">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need to network smarter
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Turn your LinkedIn data into actionable career intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="glass-card p-8 card-hover group"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-t border-dark-glassBorder">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-600/10 via-transparent to-accent-cyan/10 pointer-events-none" />
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 relative z-10">
              Ready to find your path?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 max-w-lg mx-auto relative z-10">
              Upload your LinkedIn CSV and start discovering warm connections in seconds.
            </p>
            <Link href="/upload" className="btn-primary text-base px-8 py-4 relative z-10">
              Upload Your Network
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
