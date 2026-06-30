"use client";

import { useState, Suspense, lazy } from "react";
import { ArrowRight, BookOpen, Check, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// Conditionally render text as a link or plain span
function LinkedTitle({
  linkData,
  children,
  className,
  locale,
}: {
  linkData: { url: string; title: string } | null | undefined;
  children: React.ReactNode;
  className?: string;
  locale: string;
}) {
  if (linkData) {
    const href = locale === "en" ? linkData.url : `/${locale}${linkData.url}`;
    return (
      <Link
        href={href}
        className={`${className || ""} hover:text-[hsl(var(--nav-theme-light))] hover:underline decoration-[hsl(var(--nav-theme-light))/0.4] underline-offset-4 transition-colors`}
        title={linkData.title}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}

// 模块通用：小标题 eyebrow 徽章 + 标题 + 简介
function ModuleHeader({
  eyebrow,
  title,
  intro,
  titleNode,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  titleNode: React.ReactNode;
}) {
  return (
    <div className="scroll-reveal mb-8 text-center md:mb-12">
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))] md:mb-4 md:text-sm">
          {eyebrow}
        </span>
      )}
      <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-5xl">{titleNode}</h2>
      {intro && (
        <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
          {intro}
        </p>
      )}
      {/* 供 SEO/可访问性使用的纯标题文本（视觉上由 titleNode 覆盖） */}
      <span className="sr-only">{title}</span>
    </div>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.tekken8bob.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "TEKKEN 8 Bob Wiki",
        description:
          "TEKKEN 8 Bob Wiki covers Bob release date, early access, moves, Spinner Ball stance, Heat tools, combos, punishers, matchup tips, and DLC updates.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "TEKKEN 8 Bob - Speed & Weight DLC Fighter",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "TEKKEN 8 Bob Wiki",
        alternateName: "TEKKEN 8 Bob",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "TEKKEN 8 Bob Wiki - Speed & Weight DLC Fighter",
        },
        sameAs: [
          "https://tekken.com/",
          "https://store.steampowered.com/app/1778820/TEKKEN_8/",
          "https://discord.com/invite/tekkenofficial",
          "https://www.reddit.com/r/Tekken/",
          "https://x.com/TEKKEN_Project",
          "https://www.youtube.com/TEKKENchannel",
        ],
      },
      {
        "@type": "VideoGame",
        name: "TEKKEN 8",
        gamePlatform: ["PlayStation 5", "Xbox Series X|S", "PC", "Steam"],
        applicationCategory: "Game",
        genre: ["Fighting", "Action"],
        numberOfPlayers: {
          minValue: 1,
          maxValue: 2,
        },
        gameItem: {
          "@type": "Thing",
          name: "Bob (Season 3 DLC Fighter)",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://store.steampowered.com/app/1778820/TEKKEN_8/",
        },
      },
      {
        "@type": "VideoObject",
        name: "TEKKEN 8 – Bob Gameplay Reveal Trailer",
        description:
          "Official TEKKEN 8 Bob gameplay reveal trailer from Bandai Namco Entertainment, showcasing Bob's Freestyle Karate style and Spinner Ball stance.",
        uploadDate: "2026-07-25",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/Sp1BF4Ov55A",
        url: "https://www.youtube.com/watch?v=Sp1BF4Ov55A",
      },
    ],
  };

  // Move List 手风琴状态
  const [moveExpanded, setMoveExpanded] = useState<number | null>(null);
  const mobileBannerAd = getPreferredMobileBannerSelection();

  // Tools Grid 卡片 → section 锚点映射（与下方 8 个 <section id> 一一对应）
  const toolsSectionIds = [
    "release-date-dlc-access",
    "gameplay-trailer-breakdown",
    "beginner-guide",
    "move-list-stances",
    "tekken-8-bob-combos",
    "tekken-8-bob-heat-system-guide",
    "tekken-8-bob-tier-list-and-meta-role",
    "tekken-8-bob-story-and-costumes",
  ];

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="scroll-reveal mb-8 text-center">
            {/* Badge */}
            <div
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-3 py-1.5 md:mb-6 md:px-4 md:py-2"
            >
              <Sparkles className="h-4 w-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs font-medium md:text-sm">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-4 text-4xl font-bold leading-[1.05] sm:text-5xl md:mb-6 md:text-7xl">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("beginner-guide")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[hsl(var(--nav-theme))] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[hsl(var(--nav-theme)/0.9)] md:px-8 md:py-4 md:text-lg"
              >
                <BookOpen className="h-5 w-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://store.steampowered.com/app/1778820/TEKKEN_8/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3.5 text-base font-semibold transition-colors hover:bg-white/10 md:px-8 md:py-4 md:text-lg"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 之后 */}
      <section className="px-4 py-10 md:py-12">
        <div className="container mx-auto max-w-5xl scroll-reveal">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="Sp1BF4Ov55A"
              title="TEKKEN 8 – Bob Gameplay Reveal Trailer"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards（位于视频区之后、Latest Updates 之前） */}
      <section className="bg-white/[0.02] px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="scroll-reveal mb-8 text-center md:mb-12">
            <h2 className="mb-3 text-3xl font-bold md:mb-4 md:text-5xl">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base text-muted-foreground md:text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {t.tools.cards.map((card: any, index: number) => {
              const sectionId = toolsSectionIds[index];
              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="group scroll-reveal cursor-pointer rounded-xl border border-border bg-card p-4 text-left transition-all duration-300 hover:border-[hsl(var(--nav-theme)/0.5)] hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)] md:p-6"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)] transition-colors group-hover:bg-[hsl(var(--nav-theme)/0.2)] md:mb-4 md:h-12 md:w-12">
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 text-[hsl(var(--nav-theme-light))] md:h-6 md:w-6"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold md:text-base">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Latest Updates Section */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* Module 1: Release Date and DLC Access (table) */}
      <section id="release-date-dlc-access" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.bobReleaseAndDlcAccess.eyebrow}
            title={t.modules.bobReleaseAndDlcAccess.title}
            intro={t.modules.bobReleaseAndDlcAccess.intro}
            titleNode={
              <LinkedTitle
                linkData={moduleLinkMap["bobReleaseAndDlcAccess"]}
                locale={locale}
              >
                {t.modules.bobReleaseAndDlcAccess.title}
              </LinkedTitle>
            }
          />

          {/* 桌面端表格 */}
          <div className="scroll-reveal hidden overflow-hidden rounded-xl border border-border md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[hsl(var(--nav-theme)/0.1)]">
                  {t.modules.bobReleaseAndDlcAccess.columns.map(
                    (col: string, i: number) => (
                      <th
                        key={i}
                        className="border-b border-border px-4 py-3 font-semibold text-foreground"
                      >
                        {col}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {t.modules.bobReleaseAndDlcAccess.rows.map(
                  (row: any, index: number) => (
                    <tr
                      key={index}
                      className="border-b border-border/60 align-top transition-colors last:border-0 hover:bg-white/5"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <DynamicIcon
                            name={row.icon}
                            className="h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]"
                          />
                          <span className="font-medium">{row.region}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.platformStore}
                      </td>
                      <td className="px-4 py-3 font-medium text-[hsl(var(--nav-theme-light))]">
                        {row.accessWindow}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.purchaseMethod}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.keyNotes}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>

          {/* 移动端堆叠卡片 */}
          <div className="scroll-reveal space-y-3 md:hidden">
            {t.modules.bobReleaseAndDlcAccess.rows.map((row: any, index: number) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-white/5 p-4"
              >
                <div className="mb-2 flex items-center gap-2">
                  <DynamicIcon
                    name={row.icon}
                    className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                  />
                  <span className="rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-0.5 text-xs font-medium">
                    {row.region}
                  </span>
                </div>
                <p className="mb-1 text-sm">
                  <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                    {row.accessWindow}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {row.platformStore}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {row.purchaseMethod}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">{row.keyNotes}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Gameplay Trailer Breakdown (card-list) */}
      <section
        id="gameplay-trailer-breakdown"
        className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.bobTrailerBreakdown.eyebrow}
            title={t.modules.bobTrailerBreakdown.title}
            intro={t.modules.bobTrailerBreakdown.intro}
            titleNode={
              <LinkedTitle
                linkData={moduleLinkMap["bobTrailerBreakdown"]}
                locale={locale}
              >
                {t.modules.bobTrailerBreakdown.title}
              </LinkedTitle>
            }
          />
          <div className="scroll-reveal grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.modules.bobTrailerBreakdown.cards.map((card: any, index: number) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-white/5 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <span className="rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-1 text-xs font-medium uppercase tracking-wider">
                    {card.label}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-[hsl(var(--nav-theme-light))]">
                  {card.headline}
                </h3>
                <p className="text-sm text-muted-foreground">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3: Beginner Guide (step-by-step) */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.bobBeginnerGuide.eyebrow}
            title={t.modules.bobBeginnerGuide.title}
            intro={t.modules.bobBeginnerGuide.intro}
            titleNode={
              <LinkedTitle
                linkData={moduleLinkMap["bobBeginnerGuide"]}
                locale={locale}
              >
                {t.modules.bobBeginnerGuide.title}
              </LinkedTitle>
            }
          />
          <div className="scroll-reveal space-y-4">
            {t.modules.bobBeginnerGuide.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-4 rounded-xl border border-border bg-white/5 p-5 md:p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <DynamicIcon
                    name={step.icon}
                    className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-bold text-[hsl(var(--nav-theme-light))]">
                      STEP {index + 1}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-bold md:text-xl">{step.title}</h3>
                  <p className="mb-3 text-sm font-medium text-[hsl(var(--nav-theme-light))]">
                    {step.goal}
                  </p>
                  <ul className="space-y-1.5">
                    {step.details.map((d: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Move List and Stances (accordion) */}
      <section
        id="move-list-stances"
        className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.bobMoveListAndStances.eyebrow}
            title={t.modules.bobMoveListAndStances.title}
            intro={t.modules.bobMoveListAndStances.intro}
            titleNode={
              <LinkedTitle
                linkData={moduleLinkMap["bobMoveListAndStances"]}
                locale={locale}
              >
                {t.modules.bobMoveListAndStances.title}
              </LinkedTitle>
            }
          />
          <div className="scroll-reveal space-y-2">
            {t.modules.bobMoveListAndStances.sections.map(
              (section: any, index: number) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-border"
                >
                  <button
                    onClick={() =>
                      setMoveExpanded(moveExpanded === index ? null : index)
                    }
                    className="flex w-full items-center gap-3 p-5 text-left transition-colors hover:bg-white/5"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                      <DynamicIcon
                        name={section.icon}
                        className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold">{section.section}</span>
                      <p className="text-xs text-muted-foreground">
                        {section.summary}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform ${moveExpanded === index ? "rotate-180" : ""}`}
                    />
                  </button>
                  {moveExpanded === index && (
                    <div className="space-y-2 px-5 pb-5">
                      {section.entries.map((entry: any, ei: number) => (
                        <div
                          key={ei}
                          className="rounded-lg border border-border bg-white/5 p-3"
                        >
                          <div className="mb-1 flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                              {entry.name}
                            </span>
                            <span className="rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-0.5 text-xs">
                              {entry.type}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {entry.confirmedUse}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Module 5: Combos (card-list) */}
      <section id="tekken-8-bob-combos" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.bobCombos.eyebrow}
            title={t.modules.bobCombos.title}
            intro={t.modules.bobCombos.intro}
            titleNode={
              <LinkedTitle linkData={moduleLinkMap["bobCombos"]} locale={locale}>
                {t.modules.bobCombos.title}
              </LinkedTitle>
            }
          />
          <div className="scroll-reveal grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.modules.bobCombos.cards.map((card: any, index: number) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-white/5 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <span className="rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                    {card.badge}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold">{card.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{card.summary}</p>
                <ul className="space-y-1.5">
                  {card.details.map((d: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Heat System Guide (step-by-step) */}
      <section
        id="tekken-8-bob-heat-system-guide"
        className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.bobHeatSystemGuide.eyebrow}
            title={t.modules.bobHeatSystemGuide.title}
            intro={t.modules.bobHeatSystemGuide.intro}
            titleNode={
              <LinkedTitle
                linkData={moduleLinkMap["bobHeatSystemGuide"]}
                locale={locale}
              >
                {t.modules.bobHeatSystemGuide.title}
              </LinkedTitle>
            }
          />
          <div className="scroll-reveal grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.modules.bobHeatSystemGuide.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="relative rounded-xl border border-border bg-white/5 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                    <DynamicIcon
                      name={step.icon}
                      className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <span className="text-xs font-bold text-[hsl(var(--nav-theme-light))]">
                    STEP {index + 1}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
                <p className="mb-3 text-sm font-medium text-[hsl(var(--nav-theme-light))]">
                  {step.action}
                </p>
                <ul className="space-y-1.5">
                  {step.details.map((d: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Tier List and Meta Role (tier-grid) */}
      <section
        id="tekken-8-bob-tier-list-and-meta-role"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.bobTierListAndMetaRole.eyebrow}
            title={t.modules.bobTierListAndMetaRole.title}
            intro={t.modules.bobTierListAndMetaRole.intro}
            titleNode={
              <LinkedTitle
                linkData={moduleLinkMap["bobTierListAndMetaRole"]}
                locale={locale}
              >
                {t.modules.bobTierListAndMetaRole.title}
              </LinkedTitle>
            }
          />
          <div className="scroll-reveal grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.modules.bobTierListAndMetaRole.tiers.map((tier: any, index: number) => (
              <div
                key={index}
                className="flex flex-col rounded-xl border border-border bg-white/5 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                    <DynamicIcon
                      name={tier.icon}
                      className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <span className="rounded-full bg-[hsl(var(--nav-theme))] px-3 py-1 text-sm font-bold text-white">
                    {tier.tier}
                  </span>
                </div>
                <h3 className="mb-1 font-bold">{tier.label}</h3>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                  {tier.score}
                </p>
                <p className="mb-3 text-sm text-muted-foreground">{tier.summary}</p>
                <ul className="space-y-1.5">
                  {tier.reasons.map((r: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: Story and Costumes (card-list) */}
      <section
        id="tekken-8-bob-story-and-costumes"
        className="scroll-mt-24 bg-white/[0.02] px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-5xl">
          <ModuleHeader
            eyebrow={t.modules.bobStoryAndCostumes.eyebrow}
            title={t.modules.bobStoryAndCostumes.title}
            intro={t.modules.bobStoryAndCostumes.intro}
            titleNode={
              <LinkedTitle
                linkData={moduleLinkMap["bobStoryAndCostumes"]}
                locale={locale}
              >
                {t.modules.bobStoryAndCostumes.title}
              </LinkedTitle>
            }
          />
          <div className="scroll-reveal grid grid-cols-1 gap-4 md:grid-cols-2">
            {t.modules.bobStoryAndCostumes.cards.map((card: any, index: number) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-white/5 p-6 transition-colors hover:border-[hsl(var(--nav-theme)/0.5)]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--nav-theme)/0.1)]">
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <span className="rounded-full border border-[hsl(var(--nav-theme)/0.3)] bg-[hsl(var(--nav-theme)/0.1)] px-2 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                    {card.badge}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-bold">{card.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{card.summary}</p>
                <ul className="space-y-1.5">
                  {card.facts.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="border-t border-border bg-white/[0.02]">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div>
              <h3 className="mb-4 text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="mb-4 font-semibold">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/tekkenofficial"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/TEKKEN_Project"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/Tekken/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.reddit}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/TEKKENchannel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.youtube}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="mb-4 font-semibold">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground transition hover:text-[hsl(var(--nav-theme-light))]"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
