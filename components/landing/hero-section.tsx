'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { cn } from '@/lib/cn'
import { Menu, X, ChevronRight, TrendingUp } from 'lucide-react'
import { useScroll, motion } from 'framer-motion'

// ============================================================================
// HERO SECTION - Main Export
// ============================================================================

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        {/* Hero Section with Video Background */}
        <section>
          <div className="py-24 md:pb-32 lg:pb-36 lg:pt-72">
            {/* Content Layer */}
            <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium tracking-tight text-white md:text-6xl lg:mt-16 xl:text-7xl">
                  Master the Art of{' '}
                  <span className="text-[var(--color-blue-400)]">Reading Companies</span>
                </h1>
                <p className="mt-8 max-w-2xl text-balance text-lg text-white/70">
                  Stop chasing tips that lose money. Learn to analyze financial statements,
                  understand market dynamics, and make informed investment decisions like
                  professional investors.
                </p>

                <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 rounded-full bg-white text-black hover:bg-white/90 pl-5 pr-3 text-base font-medium"
                  >
                    <Link href="/market-statistics">
                      <span className="text-nowrap">Start Learning</span>
                      <ChevronRight className="ml-1 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-12 rounded-full px-5 text-base text-white hover:bg-white/10"
                  >
                    <Link href="/company/search">
                      <span className="text-nowrap">Search Companies</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Video Background Container - Optimized */}
            <div className="aspect-[2/3] absolute inset-1 overflow-hidden rounded-3xl border border-white/10 sm:aspect-video lg:rounded-[3rem]">
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/videos/hero-poster.webp"
                className="size-full object-cover opacity-60"
              >
                <source src="/videos/hero-bg.webm" type="video/webm" />
                <source src="/videos/hero-bg.mp4" type="video/mp4" />
              </video>
              {/* Single combined gradient overlay for better performance */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Logo Slider Section */}
        <section className="bg-[var(--color-background)] pb-2">
          <div className="group relative m-auto max-w-7xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:border-[var(--color-border)] md:pr-6">
                <p className="text-end text-sm text-[var(--color-text-muted)]">
                  Powering the best teams
                </p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={40} speed={80} gap={112}>
                  {companyLogos.map((company) => (
                    <CompanyLogo key={company.name} name={company.name} src={company.src} />
                  ))}
                </InfiniteSlider>

                {/* Simple gradient fade edges - performant replacement for ProgressiveBlur */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-background)] via-[var(--color-background)]/80 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

// ============================================================================
// COMPANY LOGOS - Local logo files
// ============================================================================

const companyLogos = [
  { name: 'Zerodha', src: '/logos/Zerodha_logo.png' },
  { name: 'Groww', src: '/logos/groww_logo.webp' },
  { name: 'Upstox', src: '/logos/upstox-new-logo.svg' },
  { name: 'Angel One', src: '/logos/Angel_One_Logo.png' },
  { name: 'NSE', src: '/logos/NSE_Logo.svg' },
  { name: 'BSE', src: '/logos/BSE_logo.svg' },
  { name: 'HDFC Bank', src: '/logos/HDFC_Bank_Logo.png' },
  { name: 'ICICI Bank', src: '/logos/ICICI_Bank_Logo.png' },
]

// ============================================================================
// COMPANY LOGO COMPONENT - Image-based logos
// ============================================================================

function CompanyLogo({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex items-center justify-center h-10 px-4">
      <Image
        src={src}
        alt={name}
        width={100}
        height={24}
        className="h-6 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
        loading="lazy"
      />
    </div>
  )
}

// ============================================================================
// NAVIGATION MENU ITEMS
// ============================================================================

const menuItems = [
  { name: 'Features', href: '/market-statistics' },
  { name: 'Solution', href: '/company/search' },
  { name: 'Pricing', href: '/ai-assistant' },
  { name: 'About', href: '#about' },
]

// ============================================================================
// HERO HEADER - Floating Navigation
// ============================================================================

function HeroHeader() {
  const [menuState, setMenuState] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const { scrollYProgress } = useScroll()

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrolled(latest > 0.05)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="group fixed z-20 w-full pt-2"
      >
        <div
          className={cn(
            'mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12',
            scrolled && 'bg-black/50 backdrop-blur-2xl'
          )}
        >
          <motion.div
            className={cn(
              'relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6',
              scrolled && 'lg:py-4'
            )}
          >
            {/* Logo */}
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <EquityEdgeLogo />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu
                  className={cn(
                    'm-auto size-6 text-white duration-200',
                    menuState && 'rotate-180 scale-0 opacity-0'
                  )}
                />
                <X
                  className={cn(
                    'absolute inset-0 m-auto size-6 text-white duration-200',
                    !menuState && '-rotate-180 scale-0 opacity-0'
                  )}
                />
              </button>

              {/* Desktop Navigation */}
              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-white/70 hover:text-white block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile Menu & Auth Buttons */}
            <div
              className={cn(
                'bg-[var(--color-surface)] mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-[var(--color-border)] p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none',
                menuState && 'block'
              )}
            >
              {/* Mobile Navigation */}
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] block duration-150"
                        onClick={() => setMenuState(false)}
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>
    </header>
  )
}

// ============================================================================
// EQUITYEDGE LOGO
// ============================================================================

function EquityEdgeLogo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[var(--color-blue-400)] to-[var(--color-blue-500)] flex items-center justify-center">
        <TrendingUp className="w-4 h-4 text-white" />
      </div>
      <span className="text-lg font-semibold text-white">EquityEdge</span>
    </div>
  )
}
