export function AboutSection() {
  return (
    <section id="about" className="container py-12 sm:py-24">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">The Challenge</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Rural and remote communities often face challenges with unreliable energy access. While solar and wind microgrids offer a sustainable solution, their efficiency depends on effective monitoring and management, which is often lacking.
            </p>
          </div>
          <div>
             <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Solution</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We've developed an IoT-based system to provide real-time insights into energy generation, storage, and consumption. This enables smarter energy distribution, proactive maintenance, and empowers communities with reliable power.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
