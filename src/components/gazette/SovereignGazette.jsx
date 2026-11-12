import React, { useState } from 'react';
import { Newspaper, ArrowRight, Clock, Bookmark, Sparkles, Flame, Flower2 } from 'lucide-react';

const ARTICLES = [
  {
    id: 'sleep-sanctuary',
    issue: 'DISPATCH NO. 01',
    category: 'SANCTUARY CRAFT',
    title: 'THE ANATOMY OF STILLNESS: WHY EGYPTIAN COTTON MATTERS',
    author: 'Chief Butler Housekeeping',
    readTime: '3 MIN READ',
    date: 'Autumn Edition',
    excerpt:
      'We spent four months auditioning 22 textile mills across the Nile delta. The conclusion? Nothing silences the noise of modern executive life like 500-thread count long-staple cotton paired with custom goose-down pillows.',
    quote: '"True luxury is not ornament; it is the silence in which you wake."',
    image: '/images/rooms/deluxe-room/deluxe-2.webp',
    tag: 'SLEEP SCIENCE',
  },
  {
    id: 'malibu-cocktail-alchemy',
    issue: 'DISPATCH NO. 02',
    category: 'ROOFTOP CULTURE',
    title: 'SMOKED BOURBON & SUNSET SHADOWS: THE MALIBU CODEX',
    author: 'Head Mixologist',
    readTime: '4 MIN READ',
    date: 'Twilight Series',
    excerpt:
      'At 84 meters elevation on Medical College Road, the wind shifts right at 5:45 PM. That is when our smoked applewood chips meet aged bourbon and freshly torched cinnamon bark.',
    quote: '"A cocktail should be a chapter, not just an aperitif."',
    image: '/images/malibu/malibu-2.webp',
    tag: 'CRAFT MIXOLOGY',
  },
  {
    id: 'vedic-chronicles',
    issue: 'DISPATCH NO. 03',
    category: 'ANCIENT WELLNESS',
    title: 'THE THIRD-EYE CASCADE: DEMYSTIFYING SHIRODHARA',
    author: 'Vedic Ayurveda Vaidya',
    readTime: '5 MIN READ',
    date: 'Vedic Lineage',
    excerpt:
      'When medicated sesame and brahma oil falls in an unbroken thread onto the forehead, the nervous system enters theta wave synchronization within 11 minutes.',
    quote: '"We do not treat fatigue; we restore the natural rhythm of the pulse."',
    image: '/images/wellness/wellness-3.png',
    tag: 'AYURVEDA SECRETS',
  },
];

export default function SovereignGazette() {
  const [selectedArticle, setSelectedArticle] = useState(ARTICLES[0]);

  return (
    <section id="regal-gazette" className="py-24 px-4 bg-stone-100 text-charcoal select-none relative overflow-hidden border-t border-stone-300">
      {/* Background Subtle Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-serif font-black uppercase text-stone-300/40 pointer-events-none select-none">
        GAZETTE
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Henrietta-Style Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-forest-950 pb-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold-dark text-[10px] font-sans font-black tracking-[0.25em] uppercase mb-3">
              <Newspaper className="w-3.5 h-3.5 text-gold-dark" />
              The Radiant Chronicle • Vol. V
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black uppercase tracking-tight text-forest-950 leading-none">
              The Sovereign Gazette
            </h2>
          </div>

          <p className="mt-3 md:mt-0 text-xs sm:text-sm text-charcoal/70 font-sans max-w-sm">
            Behind-the-scenes dispatches on architecture, rooftop mixology, sleep engineering, and Vedic restoration.
          </p>
        </div>

        {/* 3 Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => {
            const isSelected = selectedArticle.id === article.id;
            return (
              <article
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className={`bg-white rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col justify-between p-6 cursor-pointer group shadow-sm hover:shadow-xl ${
                  isSelected ? 'border-forest-950 ring-2 ring-gold/40 -translate-y-1' : 'border-stone-200 hover:border-gold'
                }`}
                data-cursor="READ STORY"
                data-cursor-variant="hover"
              >
                {/* Article Header */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-sans font-bold tracking-widest uppercase text-gold-dark border-b border-stone-200 pb-3 mb-4">
                    <span>{article.issue}</span>
                    <span className="flex items-center gap-1 text-charcoal/60">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>

                  {/* Thumbnail Artwork */}
                  <div className="rounded-2xl overflow-hidden aspect-[16/10] mb-5 border border-stone-200 group-hover:border-gold transition-colors">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-stone-100 text-forest-950 text-[9px] font-sans font-bold tracking-widest uppercase mb-2">
                    {article.category}
                  </span>

                  <h3 className="text-xl font-serif font-bold text-forest-950 uppercase leading-snug group-hover:text-gold-dark transition-colors mb-3">
                    {article.title}
                  </h3>

                  <p className="text-xs text-charcoal/70 font-sans line-clamp-3 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                </div>

                {/* Article Footer Quote & Action */}
                <div className="border-t border-stone-200 pt-4 mt-auto">
                  <p className="text-[11px] font-serif italic text-gold-dark mb-3">
                    {article.quote}
                  </p>
                  <div className="flex items-center justify-between text-xs font-sans font-bold text-forest-950 group-hover:text-gold-dark uppercase tracking-wider">
                    <span>Dispatch by {article.author}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Selected Article Reading Modal / Expand Banner */}
        {selectedArticle && (
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-white border-2 border-forest-950 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 text-xs font-sans font-bold tracking-widest uppercase text-gold-dark">
                <span>{selectedArticle.issue}</span>
                <span>•</span>
                <span>{selectedArticle.category}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-black uppercase text-forest-950 leading-tight">
                {selectedArticle.title}
              </h3>
              <p className="text-sm sm:text-base text-charcoal/80 font-sans leading-relaxed">
                {selectedArticle.excerpt}
              </p>
              <div className="p-4 rounded-2xl bg-stone-50 border-l-4 border-gold text-forest-950 font-serif italic text-base">
                {selectedArticle.quote}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-forest-950 text-ivory text-center space-y-3">
              <Sparkles className="w-6 h-6 text-gold" />
              <h4 className="font-serif font-bold text-lg text-white">Experience It Live</h4>
              <p className="text-xs font-sans text-ivory/70">
                Book a bespoke sanctuary stay or reserve a sunset table at Malibu Rooftop to live this story.
              </p>
              <button
                onClick={() => {
                  const target = document.getElementById('interactive-3d-showcase');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-full bg-gold text-forest-950 font-sans font-bold text-xs uppercase tracking-wider shadow-md hover:bg-gold-light transition-colors"
              >
                Inspect 3D Sanctuaries
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

