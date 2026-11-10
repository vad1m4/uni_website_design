import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  BookOpen,
  Headphones,
  Play,
  Compass,
  Sprout,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { categories, photos, resources } from "@/lib/data";
import { CategoryCard, ResourceCard, SectionHeading } from "@/components/ui";
export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span /> SMALL STEPS. REAL PROGRESS.
          </p>
          <h1>
            Maximize
            <br />
            your <span className="serif-accent">potential.</span>
          </h1>
          <p className="hero-description">
            Your journey to becoming your best self starts here. Build better
            habits, learn valuable skills, and make progress in the areas that
            matter to you.
          </p>
          <div className="hero-actions">
            <Link href="/categories" className="button button-dark">
              Start improving
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/courses" className="button button-outline">
              Explore courses
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-note">
            <div className="avatar-stack">
              <img src="https://i.pravatar.cc/80?img=47" alt="" />
              <img src="https://i.pravatar.cc/80?img=12" alt="" />
              <img src="https://i.pravatar.cc/80?img=49" alt="" />
              <span>
                <Sprout size={17} />
              </span>
            </div>
            <p>
              A space for curious minds.
              <br />
              <b>And your next chapter.</b>
            </p>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo">
            <img
              src={photos.hero}
              alt="Sunlight over a dramatic mountain summit"
              fetchPriority="high"
            />
            <div className="photo-overlay" />
            <div className="photo-caption">
              <span>THE ONLY WAY IS FORWARD.</span>
              <p>
                Your next chapter
                <br />
                starts with you.
              </p>
            </div>
            <span className="photo-coordinate">46°34′ N &nbsp; 10°49′ E</span>
            <div className="summit-mark">
              <ArrowUpRight size={35} strokeWidth={1} />
            </div>
          </div>
          <div className="floating-label">
            <span className="floating-icon">
              <TrendingUp size={19} />
            </span>
            <div>
              <b>A little better, every day.</b>
              <span>Progress over perfection.</span>
            </div>
            <Sparkles size={17} />
          </div>
          <Link href="/goals" className="floating-progress">
            <div className="mini-progress-top">
              <span className="mini-check">
                <Check size={15} />
              </span>
              <span>YOUR NEXT SMALL WIN</span>
              <ArrowUpRight size={15} />
            </div>
            <b>Make time for yourself</b>
            <div className="mini-week">
              {"MTWTFSS".split("").map((d, i) => (
                <span className={i < 4 ? "done" : ""} key={i}>
                  {i < 4 ? <Check size={11} /> : d}
                </span>
              ))}
            </div>
            <p>A little consistency goes a long way.</p>
          </Link>
          <span className="hero-scribble">keep going ↗</span>
        </div>
      </section>
      <div className="principle-strip">
        <div className="container">
          <span>
            <BookOpen size={17} />
            Practical knowledge
          </span>
          <span>
            <Compass size={17} />
            Your own direction
          </span>
          <span>
            <TrendingUp size={17} />
            Progress you can see
          </span>
          <span>
            <Sprout size={17} />
            Growth at your pace
          </span>
        </div>
      </div>
      <section className="section container categories-section">
        <SectionHeading
          eyebrow="A BETTER YOU, IN EVERY DIRECTION"
          title="What would you like to work on?"
          description="There’s no single path to growth. Find the one that feels right for you."
          href="/categories"
          action="All categories"
        />
        <div className="category-grid home-categories">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
          <div className="category-invitation">
            <span className="invitation-star">✳</span>
            <h3>
              Your pace.
              <br />
              Your potential.
            </h3>
            <p>
              You don’t have to change everything.
              <br />
              Just start with one thing.
            </p>
            <Link href="/goals" className="text-link">
              Set your first goal
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="how-section">
        <div className="container">
          <SectionHeading
            eyebrow="LESS OVERWHELM. MORE DIRECTION."
            title="Small steps. A meaningful difference."
            description="Everything you need to turn “one day” into day one."
          />
          <div className="steps-grid">
            {[
              {
                n: "01",
                icon: Compass,
                title: "Discover your direction",
                text: "Explore the areas of your life you want to develop. Follow your curiosity and find your starting point.",
              },
              {
                n: "02",
                icon: BookOpen,
                title: "Learn your way",
                text: "Read, listen, or watch. Build practical knowledge through resources and courses that fit your day.",
              },
              {
                n: "03",
                icon: TrendingUp,
                title: "Turn learning into growth",
                text: "Set personal goals, put ideas into practice, and see how your small steps add up over time.",
              },
            ].map((step) => (
              <div className="step" key={step.n}>
                <div className="step-top">
                  <span>{step.n}</span>
                  <step.icon size={25} strokeWidth={1.4} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="A LITTLE KNOWLEDGE GOES A LONG WAY"
          title="A good place to start."
          description="Fresh perspectives and practical ideas for your everyday."
          href="/resources"
          action="Explore the library"
        />
        <div className="resource-grid">
          {resources.slice(0, 3).map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
      <section className="formats-section container">
        <div>
          <p className="eyebrow">MADE FOR THE WAY YOU LEARN</p>
          <h2>
            Different formats.
            <br />
            <span className="serif-accent">Same forward motion.</span>
          </h2>
          <p className="muted">
            A quiet read. A walk with your headphones. A moment to watch and
            reflect. Learning fits your life.
          </p>
        </div>
        <div className="format-options">
          {[
            {
              format: "Text",
              label: "Read & reflect",
              text: "Practical articles. Ideas worth keeping.",
              icon: BookOpen,
            },
            {
              format: "Audio",
              label: "Listen & learn",
              text: "A little perspective, wherever you are.",
              icon: Headphones,
            },
            {
              format: "Video",
              label: "Watch & discover",
              text: "Slow down and see things differently.",
              icon: Play,
            },
          ].map((f) => (
            <Link key={f.format} href={`/resources?format=${f.format}`}>
              <span className="format-option-icon">
                <f.icon size={21} />
              </span>
              <div>
                <h3>{f.label}</h3>
                <p>{f.text}</p>
              </div>
              <ArrowUpRight size={19} />
            </Link>
          ))}
        </div>
      </section>
      <section className="cta-section container">
        <div className="cta-decoration">✳</div>
        <p className="eyebrow">YOUR POTENTIAL IS PERSONAL.</p>
        <h2>
          Make a little room
          <br />
          for a <span className="serif-accent">better you.</span>
        </h2>
        <p>One goal. One lesson. One step closer.</p>
        <Link href="/dashboard" className="button button-dark">
          Find your starting point
          <ArrowUpRight size={18} />
        </Link>
        <span className="cta-footnote">
          Free to explore. Yours to make progress.
        </span>
      </section>
    </>
  );
}
