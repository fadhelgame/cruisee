const LINKS: Record<string, string[]> = {
  Company: ['About', 'Careers', 'Press', 'Sustainability'],
  Voyages: ['Fleet', 'Destinations', 'Packages', 'Charters'],
  Support: ['FAQ', 'Contact', 'Privacy Policy', 'Terms'],
}

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border max-w-7xl mx-auto px-8 md:px-20 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
          <div className="max-w-xs">
            <span className="font-serif text-3xl text-primary tracking-tight block mb-4">
              Cruisee
            </span>
            <p className="text-subtle text-sm leading-relaxed">
              Redefining luxury maritime travel since 2024. Built for those who believe
              the journey is the destination.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-16">
            {Object.entries(LINKS).map(([category, links]) => (
              <div key={category}>
                <span className="label-caps text-accent block mb-6">{category}</span>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-subtle text-sm hover:text-primary transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px" style={{ background: 'linear-gradient(90deg, #c9a96e 0%, #181830 50%, transparent 100%)' }} />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 text-muted">
          <span className="label-caps text-muted">© 2024 Cruisee. All rights reserved.</span>
          <div className="flex gap-8">
            {['Instagram', 'LinkedIn', 'Twitter'].map((social) => (
              <a
                key={social}
                href="#"
                className="label-caps text-subtle hover:text-accent transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
