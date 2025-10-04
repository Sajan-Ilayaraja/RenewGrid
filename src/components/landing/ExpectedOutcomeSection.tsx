import Image from 'next/image';

export function ExpectedOutcomeSection() {
  return (
    <section id="outcome" className="container py-12 sm:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <h2 className="text-base font-semibold leading-7 text-primary">Expected Outcomes</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Empowering Communities with Sustainable Energy
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our goal is to transform how microgrids are managed, leading to tangible benefits for communities and the environment.
          </p>
          <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
            <div className="relative pl-9">
              <dt className="inline font-semibold text-foreground">
                Improved Efficiency.
              </dt>
              <dd className="inline"> By intelligently managing energy flow, we minimize waste and ensure power is available when it's needed most.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-foreground">
                Smart Distribution.
              </dt>
              <dd className="inline"> Our analytics help predict demand, allowing for smarter, more equitable distribution of energy resources.</dd>
            </div>
            <div className="relative pl-9">
              <dt className="inline font-semibold text-foreground">
                Community Empowerment.
              </dt>
              <dd className="inline"> Access to reliable data and control over their energy resources empowers local communities to thrive.</dd>
            </div>
          </dl>
        </div>
        <div className="order-1 lg:order-2">
          <Image
            src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
            alt="Solar panels on rooftops providing clean energy to communities"
            width={600}
            height={400}
            className="w-full rounded-xl shadow-xl ring-1 ring-gray-400/10"
          />
        </div>
      </div>
    </section>
  );
}
