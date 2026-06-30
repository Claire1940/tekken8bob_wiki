import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tekken8bob.wiki'
  const path = '/about'

  return {
    title: 'About TEKKEN 8 Bob Wiki - Your TEKKEN 8 DLC Resource',
    description: 'Learn about TEKKEN 8 Bob Wiki, a community-driven resource hub providing release dates, move lists, Spinner Ball stance guides, Heat tools, combos, punishers, and matchup notes for the Bob DLC character in TEKKEN 8.',
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'TEKKEN 8 Bob Wiki',
      title: 'About TEKKEN 8 Bob Wiki',
      description: 'Learn about our mission to provide the best TEKKEN 8 Bob DLC resources and guides.',
      images: [
        {
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          alt: 'TEKKEN 8 Bob Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About TEKKEN 8 Bob Wiki',
      description: 'Learn about our mission to provide the best TEKKEN 8 Bob DLC resources.',
      images: [`${siteUrl}/images/hero.webp`],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About TEKKEN 8 Bob Wiki
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Your community-driven resource center for the Bob DLC character in TEKKEN 8
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Welcome to TEKKEN 8 Bob Wiki</h2>
            <p>
              TEKKEN 8 Bob Wiki is an <strong>unofficial, fan-made resource website</strong> dedicated to helping players
              master the Bob DLC character in the fighting game "TEKKEN 8" (available on PlayStation 5, Xbox Series X|S,
              and PC via Steam). We are a community-driven platform that provides release date tracking, move lists,
              stance breakdowns, combo routes, punishers, and matchup insights to enhance your gameplay.
            </p>
            <p>
              Whether you are waiting for Bob's Season 3 early access or already labbing Freestyle Karate combos,
              TEKKEN 8 Bob Wiki is here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: <strong>to empower TEKKEN 8 players with accurate, up-to-date information
              and practical tools</strong> that help them succeed with the Bob character. We strive to:
            </p>
            <ul>
              <li><strong>Provide reliable information:</strong> Keep our content updated with the latest patches, move adjustments, and DLC schedule changes</li>
              <li><strong>Build useful references:</strong> Develop move lists, combo routes, and punisher tables that help players make informed decisions</li>
              <li><strong>Foster community:</strong> Create a welcoming space where players can share strategies, lab setups, and matchup knowledge</li>
              <li><strong>Stay accessible:</strong> Keep all resources free and easy to use for players of all skill levels</li>
            </ul>

            <h2>Our Vision</h2>
            <p>
              We envision TEKKEN 8 Bob Wiki as the <strong>go-to destination</strong> for every TEKKEN 8 player looking
              to pick up Bob. We want to be the resource that players trust and rely on, whether they need release and
              early access dates, want to understand the Spinner Ball stance, or are looking for matchup-specific counter
              strategies.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Feature Card 1 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">📅</div>
              <h3 className="text-xl font-semibold text-white mb-2">Release & Early Access</h3>
              <p className="text-slate-300">
                Clear release dates, Season 3 Pass early access windows, and standalone DLC unlock details for Bob
                across all platforms.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🥋</div>
              <h3 className="text-xl font-semibold text-white mb-2">Move Lists</h3>
              <p className="text-slate-300">
                Organized command references covering standing, crouching, and special moves, with version notes as
                the meta evolves after launch.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Stances & Heat</h3>
              <p className="text-slate-300">
                Breakdowns of Bob's Spinner Ball stance, its derivatives, and Heat system tools including Heat Engagers
                and Heat Smash.
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎬</div>
              <h3 className="text-xl font-semibold text-white mb-2">Combo Routes</h3>
              <p className="text-slate-300">
                Layered combo routes from beginner-friendly strings to advanced wall and Heat combos, sorted by
                difficulty.
              </p>
            </div>

            {/* Feature Card 5 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-2">Punishers</h3>
              <p className="text-slate-300">
                Frame-based punisher tables and launch-punish options so you can consistently capitalize on your
                opponent's mistakes.
              </p>
            </div>

            {/* Feature Card 6 */}
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="text-2xl mb-3">🌍</div>
              <h3 className="text-xl font-semibold text-white mb-2">Matchups & Multilingual</h3>
              <p className="text-slate-300">
                Matchup notes against the roster plus content available in multiple languages including English,
                Spanish, Japanese, and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Community-Driven</h2>
            <p>
              TEKKEN 8 Bob Wiki is built <strong>by the community, for the community</strong>. We welcome contributions,
              feedback, and suggestions from players of all skill levels. Our content is constantly evolving based on:
            </p>
            <ul>
              <li><strong>Player feedback:</strong> Your suggestions help us improve and expand our resources</li>
              <li><strong>Community lab work:</strong> New combo routes, tech, and matchup discoveries shared by players</li>
              <li><strong>Patch updates:</strong> We monitor official patch notes and adjust our content accordingly</li>
              <li><strong>Meta shifts:</strong> We track how the meta develops and update guides based on real tournament and ranked play</li>
            </ul>
            <p>
              <strong>Want to contribute?</strong> Whether you have found a new combo, a stronger punish, or have
              suggestions for new guides, we would love to hear from you! Reach out through our contact channels below.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>About the Team</h2>
            <p>
              TEKKEN 8 Bob Wiki is maintained by a dedicated team of passionate fighting game players and developers
              who love TEKKEN 8 as much as you do. We are players first, constantly labbing combos, testing matchups,
              and staying updated with the latest Season 3 developments.
            </p>
            <p>
              Our team combines expertise in:
            </p>
            <ul>
              <li><strong>Frame data analysis:</strong> Deep understanding of TEKKEN 8 mechanics, Bob's toolkit, and the Heat system</li>
              <li><strong>Web development:</strong> Building fast, user-friendly tools and interfaces</li>
              <li><strong>Content creation:</strong> Writing clear, helpful guides and tutorials</li>
              <li><strong>Community management:</strong> Listening to player feedback and fostering a positive environment</li>
            </ul>
            <p className="text-slate-400 italic text-sm">
              Project Codename: "Speed & Weight" – Mastering Freestyle Karate, one rep at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Important Disclaimer</h2>
            <p className="text-yellow-400/90">
              <strong>TEKKEN 8 Bob Wiki is an unofficial fan-made website.</strong> We are NOT affiliated with,
              endorsed by, or associated with Bandai Namco Entertainment Inc., the TEKKEN Team, or any official entities.
            </p>
            <p>
              All game content, trademarks, characters, and assets are the property of their respective owners.
              We use game-related content under fair use principles for informational and educational purposes only.
            </p>
            <p>
              TEKKEN 8 Bob Wiki is a non-profit, community resource created by fans, for fans.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Get in Touch</h2>
            <p>
              We would love to hear from you! Whether you have questions, suggestions, found an error, or just want to say hi:
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@tekken8bob.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@tekken8bob.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Corrections & Reports</h3>
                <a href="mailto:support@tekken8bob.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@tekken8bob.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Submissions</h3>
                <a href="mailto:contribute@tekken8bob.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@tekken8bob.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Partnerships</h3>
                <a href="mailto:partnerships@tekken8bob.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  partnerships@tekken8bob.wiki
                </a>
              </div>
            </div>
            <p className="text-slate-400 text-sm">
              <strong>Response Time:</strong> We aim to respond to all inquiries within 2-3 business days.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Community</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest Bob release news, combo tech, and TEKKEN 8 Season 3 updates.
            Bookmark this site and check back regularly for new content!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
