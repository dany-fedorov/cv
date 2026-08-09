// Base CV content — the single source of truth.
// Strings may contain inline HTML (<b>, <a>).

export const cv = {
  name: 'Danylo Fedorov',
  tagline: 'Software Engineer / Engineering Manager · Kyiv, Ukraine',
  contacts: [
    'dany.fedorov.d@gmail.com',
    '<a href="https://www.linkedin.com/in/danylo-fedorov">linkedin.com/in/danylo-fedorov</a>',
    '<a href="https://github.com/dany-fedorov">github.com/dany-fedorov</a>',
  ],

  // Variant CVs set this to show the "Applying for" box; null hides it.
  target: null,

  summary: [
    'Software engineer with <b>10 years of commercial experience</b> spanning language tooling, backend services, cloud infrastructure, and engineering leadership. For the last ~3 years I’ve led platform teams at BetterMe; before that — 4 years of hands-on DevOps and full-stack delivery on AWS. I started my career building a COBOL-to-Java translator in Common Lisp.',
    'Proven record of productive stack switches: Common Lisp → Node.js/React → AWS/DevOps → engineering management.',
  ],

  experience: [
    {
      company: 'BetterMe',
      meta: 'health & wellness technology, Kyiv · 2 yrs 10 mos',
      roles: [
        { title: 'Engineering Manager, Platform', dates: 'May 2025 – present' },
        { title: 'Development Team Lead, Platform', dates: 'Nov 2023 – May 2025' },
      ],
      bullets: [
        'Lead platform teams building shared backend services and internal tooling used by product teams across the company.',
        'Architected and led delivery of a taxes-management system that generated significant revenue and LTV surplus.',
        'Cut <b>$120K/year</b> in vendor costs — solution research and usage-data analysis gave us leverage to renegotiate the contract, with no engineering changes required.',
        'Initiated a refactoring project that made complex third-party integrations <b>2× faster</b> to deliver.',
        'Built a hiring process for backend-oriented Full Stack engineers; hired <b>12 of 15</b> direct reports across two teams.',
        'Led a role transformation in two teams, merging Dev and QA into a single engineering role.',
      ],
    },
    {
      company: 'Geniusee',
      meta: 'software product development, Kyiv · 4 yrs',
      roles: [
        { title: 'Tech Lead / DevOps Engineer (AWS, Node.js, React)', dates: 'Jun 2022 – Nov 2023' },
        { title: 'DevOps Engineer / Software Developer (AWS, Node.js, React)', dates: 'Nov 2019 – Jun 2022' },
      ],
      bullets: [
        'Designed, built, and operated web applications and APIs for client products (Node.js, React).',
        'Owned AWS cloud infrastructure and CI/CD pipelines; automated environments and deployments with shell tooling on Linux.',
        'As tech lead: was responsible for technical decisions while continuing hands-on delivery.',
        'Built an interview process for Node.js developers.',
      ],
    },
    {
      company: 'ISS Soft Ukraine (Інформаційні Програмні Системи)',
      meta: 'Kyiv · 3 yrs 2 mos',
      roles: [
        {
          title: 'Software Developer (Node.js, React)',
          dates: 'Feb 2018 – Oct 2019',
          bullets: ['Developed frontend for code analysis platform.'],
        },
        {
          title: 'Software Developer (Common Lisp)',
          dates: 'Sep 2016 – Feb 2018',
          bullets: [
            'Developed a COBOL-to-Java translator: parsing, AST transformation, and Java code generation for legacy-code modernization.',
          ],
        },
      ],
    },
  ],

  skills: [
    { label: 'Expert', items: 'Git, Bash / shell scripting, Node.js / TypeScript, CI/CD (GitHub Actions), AWS' },
    { label: 'Proficient', items: 'Linux, Python, React, SQL, LLM-assisted code generation' },
    { label: 'Management', items: 'people management, hiring, delivery management' },
  ],

  education: [
    {
      degree: 'MSc program, Cyber Defense',
      org: 'SET University · completed one semester of coursework',
      dates: '2024',
    },
    {
      degree: 'BSc, Computer Engineering',
      org: 'NTUU "Kyiv Polytechnic Institute"',
      dates: '2014 – 2018',
    },
  ],

  certifications: [
    {
      name: 'AWS Certified Solutions Architect – Associate',
      org: 'Amazon Web Services',
      dates: '2023 – 2026',
    },
    {
      name: 'AWS Certified Developer – Associate',
      org: 'Amazon Web Services',
      dates: '2023 – 2026',
    },
  ],

  languages: 'Ukrainian — native · English — Upper-Intermediate (B2)',

  outputBasename: 'Danylo_Fedorov_CV',
};
