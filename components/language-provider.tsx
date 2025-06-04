"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Traduções completas
const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      timeline: "Journey",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      subtitle: "Full Stack Developer",
      description: "Full Stack developer specialized in creating modern and scalable digital experiences.",
      cta: "View Portfolio",
      scrollText: "Scroll to explore",
      techStack: {
        frontend: "React & Next.js",
        backend: "Node.js & NestJS",
        language: "TypeScript",
      },
      terminal: {
        comment: "// Frontend Excellence",
        skills: "const skills = {",
        react: "react: { level: 95, projects: 25+ },",
        nextjs: "nextjs: { level: 92, projects: 18+ },",
        typescript: "typescript: { level: 90, projects: 30+ }",
        closing: "};",
        export: "export default function Developer() {",
        return: "return <ExpertiseLevel>Advanced</ExpertiseLevel>",
        endFunction: "}",
        contact: "> developer.contact()",
        ready: '"Ready for new challenges! Let\'s build something amazing together."',
      },
    },
    about: {
      title: "About Me",
      subtitle: "Passionate Full Stack Developer",
      command: "./about --show-profile",
      description: "Learn more about my journey and passion for development",
      bio: [
        "Full Stack developer specialized in creating modern and scalable web applications with React, Next.js, Node.js and TypeScript.",
        "Currently finishing my Information Systems degree at Estácio de Sá and completing an internship at the Public Defender's Office of DF.",
        "Specialist in modern architectures, clean code and development best practices. Always seeking to learn new technologies.",
      ],
      tabs: ["Bio 1", "Bio 2", "Bio 3"],
      tags: ["React", "Next.js", "Node.js", "TypeScript", "NestJS", "PostgreSQL"],
      highlights: {
        performance: "Performance & Optimization",
        performanceDesc: "Specialist in creating fast and optimized applications for better user experience",
        teamwork: "Teamwork",
        teamworkDesc: "Collaborative experience with agile methodologies and efficient communication",
        problemSolver: "Problem Solving",
        problemSolverDesc: "Passion for solving complex challenges with creative and efficient solutions",
      },
      status: {
        available: "Available",
        location: "Brasília, DF",
        remote: "Available",
        labels: {
          status: "Status",
          location: "Location",
          remote: "Remote",
        },
      },
      cta: "Let's Work Together",
      timeline: {
        title: "My Journey",
        description: "A brief summary of my professional and academic evolution",
        viewFull: "View Complete Journey",
        events: {
          graduation: "Start of Graduation",
          graduationDesc: "Information Systems - Estácio de Sá",
          internship: "First Internship",
          internshipDesc: "Public Defender's Office of DF",
        },
      },
    },
    skills: {
      title: "Technical Skills",
      command: "./skills --show-expertise",
      description: "Modern technology stack to create scalable and performant solutions",
      categories: {
        frontend: "Frontend Development",
        backend: "Backend Development",
        tools: "DevOps & Tools",
      },
      stats: {
        linesOfCode: "Lines of Code",
        completedProjects: "Completed Projects",
        technologies: "Technologies",
        yearsExperience: "Years of Experience",
      },
      terminal: {
        frontend: `// Frontend Excellence
const skills = {
  react: { level: 95, projects: 25+ },
  nextjs: { level: 92, projects: 18+ },
  typescript: { level: 90, projects: 30+ }
};

export default function Developer() {
  return <ExpertiseLevel>Advanced</ExpertiseLevel>
}`,
        backend: `// Backend Mastery  
const server = {
  nodejs: { level: 93, apis: 15+ },
  nestjs: { level: 88, microservices: 8+ },
  python: { level: 85, django: true }
};

async function buildScalableAPI() {
  return await architecture.implement();
}`,
        tools: `// DevOps & Tools
const workflow = {
  docker: { containers: 50+, orchestration: true },
  git: { commits: 2000+, collaboration: true },
  aws: { services: 10+, deployment: true }
};

deploy.production({ uptime: '99.9%' });`,
      },
      skills: {
        frontend: [
          { name: "React.js", experience: "3+ years", projects: 25, icon: "⚛️" },
          { name: "Next.js", experience: "2+ years", projects: 18, icon: "▲" },
          { name: "TypeScript", experience: "2+ years", projects: 30, icon: "🔷" },
          { name: "Tailwind CSS", experience: "2+ years", projects: 20, icon: "🎨" },
          { name: "Framer Motion", experience: "1+ year", projects: 12, icon: "🎭" },
          { name: "React Native", experience: "1+ year", projects: 5, icon: "📱" },
        ],
        backend: [
          { name: "Node.js", experience: "3+ years", projects: 22, icon: "🟢" },
          { name: "NestJS", experience: "2+ years", projects: 15, icon: "🔴" },
          { name: "Python", experience: "2+ years", projects: 12, icon: "🐍" },
          { name: "Django", experience: "2+ years", projects: 8, icon: "🎯" },
          { name: "PostgreSQL", experience: "3+ years", projects: 25, icon: "🐘" },
          { name: "MongoDB", experience: "2+ years", projects: 10, icon: "🍃" },
        ],
        tools: [
          { name: "Docker", experience: "2+ years", projects: 15, icon: "🐳" },
          { name: "Git & GitHub", experience: "3+ years", projects: 50, icon: "📚" },
          { name: "AWS", experience: "1+ year", projects: 8, icon: "☁️" },
          { name: "Linux", experience: "2+ years", projects: 20, icon: "🐧" },
          { name: "Jest", experience: "2+ years", projects: 18, icon: "🧪" },
          { name: "Figma", experience: "2+ years", projects: 25, icon: "🎨" },
        ],
      },
      projectsText: "projects",
      metrics: {
        codeQuality: "Code Quality",
        testCoverage: "Test Coverage",
        performance: "Performance",
        accessibility: "Accessibility",
      },
      expertise: {
        title: "Featured Expertise",
        description: "Technologies I master and use to create high-quality solutions",
        areas: [
          {
            title: "Full Stack Development",
            description: "Complete development of modern web applications",
            technologies: ["React", "Next.js", "Node.js", "TypeScript"],
          },
          {
            title: "Backend Architecture",
            description: "Robust APIs and scalable architectures",
            technologies: ["NestJS", "PostgreSQL", "Docker", "AWS"],
          },
          {
            title: "Modern Frontend",
            description: "Responsive and performant interfaces",
            technologies: ["React", "Tailwind", "Framer Motion", "PWA"],
          },
        ],
      },
    },
    timeline: {
      title: "My Journey",
      description: "The evolution of my career in development through the years",
      location: "Brasília, DF - Brazil - Available for new challenges",
      events: [
        {
          date: "2018",
          title: "Discovery of Programming",
          description: "First contact with development through online courses and personal projects.",
          fullDescription:
            "I started my journey in web development creating small projects in HTML, CSS and JavaScript. That's when I discovered my passion for solving problems through code.",
        },
        {
          date: "2021",
          title: "Start of Graduation",
          description: "Started my academic journey in Information Systems at Estácio de Sá.",
          fullDescription:
            "I enrolled in the Information Systems course to formalize my knowledge and learn about software architecture, databases and development methodologies.",
        },
        {
          date: "2022",
          title: "First Internship",
          description:
            "Started Full Stack Development internship at the Public Defender's Office of the Federal District.",
          fullDescription:
            "My first professional experience, where I develop solutions that directly impact people's lives. I work with React, Next.js, Django and PostgreSQL.",
        },
        {
          date: "2023",
          title: "Specialization in React & Next.js",
          description: "Deepened knowledge in modern front-end development through Udemy.",
          fullDescription:
            "Completed advanced courses in React, Next.js, TypeScript and modern architectures. Learned about SSR, SSG, performance optimization and best practices.",
        },
        {
          date: "2023",
          title: "Backend Mastery",
          description: "Expanded expertise in back-end development with Python, Django and Node.js.",
          fullDescription:
            "Deepened knowledge in backend development, REST APIs, authentication, authorization and integration with relational and non-relational databases.",
        },
        {
          date: "2024",
          title: "Freelance Projects",
          description: "Started working on freelance projects and open source contributions.",
          fullDescription:
            "Started working as a freelancer, developing complete solutions for clients. Also began contributing to open source projects and building my online portfolio.",
        },
        {
          date: "2024",
          title: "Full Stack Developer",
          description: "Consolidation as a full stack developer focused on modern technologies.",
          fullDescription:
            "Today I am an experienced full stack developer, specialized in React, Next.js, Node.js, TypeScript and Python. I continue learning and specializing in new technologies.",
        },
      ],
    },
    projects: {
      title: "Projects",
      description: "Some of the projects I've developed and am developing",
      filters: {
        all: "All",
        frontend: "Frontend",
        backend: "Backend",
        fullstack: "Full Stack",
      },
      viewProject: "View Project",
      viewCode: "Code",
      viewAll: "View All Projects",
      list: [
        {
          title: "Public Defender's Office System",
          description:
            "Development of web interfaces using Next.js, React and TypeScript. Implementation of routes and functionalities in the back-end with Django and Python.",
          category: "fullstack",
          technologies: ["Next.js", "React", "TypeScript", "Django", "Python"],
        },
        {
          title: "Management API",
          description:
            "Robust REST API for data management with JWT authentication, complete documentation and automated tests.",
          category: "backend",
          technologies: ["NestJS", "PostgreSQL", "JWT", "Docker", "Jest"],
        },
        {
          title: "Interactive Dashboard",
          description:
            "Dashboard with real-time charts, performance metrics and data analysis using React and TypeScript.",
          category: "frontend",
          technologies: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
        },
        {
          title: "Personal Portfolio",
          description:
            "This portfolio itself, developed with Next.js, Framer Motion and Tailwind CSS, demonstrating modern design skills.",
          category: "frontend",
          technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
        },
      ],
    },
    contact: {
      title: "Let's Create Something Amazing",
      description: "I'm always open to new opportunities, challenging projects and interesting collaborations",
      command: "contact --send-message",
      commands: [
        "contact --send-message",
        "git commit -m 'Let's work together!'",
        "npm run start-collaboration",
        "docker run -p 3000:3000 awesome-project",
      ],
      sections: {
        getInTouch: "Get In Touch",
        sendMessage: "Send a Message",
      },
      methods: [
        {
          title: "Email",
          subtitle: "Response within 24h",
          value: "eliasmartinsdev8@gmail.com",
          description: "Best way to contact for professional proposals",
        },
        {
          title: "LinkedIn",
          subtitle: "Professional network",
          value: "elias-f-martins",
          description: "Connect with me for opportunities",
        },
        {
          title: "GitHub",
          subtitle: "Code and projects",
          value: "eliasfmartins",
          description: "Explore my repositories and contributions",
        },
        {
          title: "Location",
          subtitle: "Available for remote",
          value: "Brasília, DF - Brazil",
          description: "Open to on-site and remote opportunities",
        },
      ],
      quickActions: {
        title: "Quick Actions",
        schedule: "Schedule Meeting",
        whatsapp: "WhatsApp",
      },
      form: {
        name: "Name",
        email: "Email",
        company: "Company",
        projectType: "Project Type",
        message: "Message",
        newsletter: "I want to receive updates about technology and development",
        send: "Send Message",
        sending: "Sending...",
        placeholders: {
          name: "Your full name",
          email: "your@email.com",
          company: "Your company name (optional)",
          message: "Tell me about your project, deadlines, budget and any important details...",
        },
        projectTypes: {
          select: "Select project type",
          website: "Website/Landing Page",
          webapp: "Web Application",
          api: "API/Backend",
          mobile: "Mobile App",
          consulting: "Consulting",
          other: "Other",
        },
        success: {
          title: "Message Sent!",
          description: "Thank you for your contact! I will respond to your message within 24 hours.",
        },
        response: "I respond to all messages within 24 hours!",
      },
    },
    footer: {
      brand: {
        name: "Elias Martins",
        title: "Full Stack Developer",
        description:
          "Developer passionate about creating innovative solutions and exceptional digital experiences. Specialized in Node.js, React and modern technologies.",
      },
      navigation: "Navigation",
      contact: {
        title: "Contact",
        email: "📧 eliasmartinsdev8@gmail.com",
        location: "📍 Brasília, DF - Brazil",
        availability: "🕒 Available for projects",
        status: {
          title: "Current Status",
          available: "Open for opportunities",
        },
      },
      bottom: {
        madeWith: "Made with",
        and: "and lots of",
        builtWith: "Built with Next.js, TypeScript & Tailwind CSS",
      },
      socialLabels: {
        github: "GitHub",
        linkedin: "LinkedIn",
        email: "Email",
      },
    },
  },
  pt: {
    nav: {
      about: "Sobre",
      skills: "Skills",
      timeline: "Jornada",
      projects: "Projetos",
      contact: "Contato",
    },
    hero: {
      greeting: "Olá, eu sou",
      subtitle: "Desenvolvedor Full Stack",
      description: "Desenvolvedor Full Stack especializado em criar experiências digitais modernas e escaláveis.",
      cta: "Ver Portfólio",
      scrollText: "Scroll para explorar",
      techStack: {
        frontend: "React & Next.js",
        backend: "Node.js & NestJS",
        language: "TypeScript",
      },
      terminal: {
        comment: "// Frontend Excellence",
        skills: "const skills = {",
        react: "react: { level: 95, projects: 25+ },",
        nextjs: "nextjs: { level: 92, projects: 18+ },",
        typescript: "typescript: { level: 90, projects: 30+ }",
        closing: "};",
        export: "export default function Developer() {",
        return: "return <ExpertiseLevel>Advanced</ExpertiseLevel>",
        endFunction: "}",
        contact: "> developer.contact()",
        ready: '"Ready for new challenges! Let\'s build something amazing together."',
      },
    },
    about: {
      title: "Sobre Mim",
      subtitle: "Desenvolvedor Full Stack Apaixonado",
      command: "./about --show-profile",
      description: "Conheça mais sobre minha trajetória e paixão por desenvolvimento",
      bio: [
        "Desenvolvedor Full Stack especializado em criar aplicações web modernas e escaláveis com React, Next.js, Node.js e TypeScript.",
        "Atualmente finalizando minha graduação em Sistemas da Informação na Estácio de Sá e concluindo estágio na Defensoria Pública do DF.",
        "Especialista em arquiteturas modernas, clean code e boas práticas de desenvolvimento. Sempre buscando aprender novas tecnologias.",
      ],
      tabs: ["Bio 1", "Bio 2", "Bio 3"],
      tags: ["React", "Next.js", "Node.js", "TypeScript", "NestJS", "PostgreSQL"],
      highlights: {
        performance: "Performance & Otimização",
        performanceDesc: "Especialista em criar aplicações rápidas e otimizadas para melhor experiência do usuário",
        teamwork: "Trabalho em Equipe",
        teamworkDesc: "Experiência colaborativa com metodologias ágeis e comunicação eficiente",
        problemSolver: "Resolução de Problemas",
        problemSolverDesc: "Paixão por resolver desafios complexos com soluções criativas e eficientes",
      },
      status: {
        available: "Disponível",
        location: "Brasília, DF",
        remote: "Disponível",
        labels: {
          status: "Status",
          location: "Localização",
          remote: "Remoto",
        },
      },
      cta: "Vamos Trabalhar Juntos",
      timeline: {
        title: "Minha Jornada",
        description: "Um breve resumo da minha evolução profissional e acadêmica",
        viewFull: "Ver Jornada Completa",
        events: {
          graduation: "Início da Graduação",
          graduationDesc: "Sistemas da Informação - Estácio de Sá",
          internship: "Primeiro Estágio",
          internshipDesc: "Defensoria Pública do DF",
        },
      },
    },
    skills: {
      title: "Habilidades Técnicas",
      command: "./skills --show-expertise",
      description: "Stack tecnológico moderno para criar soluções escaláveis e performáticas",
      categories: {
        frontend: "Desenvolvimento Frontend",
        backend: "Desenvolvimento Backend",
        tools: "DevOps & Ferramentas",
      },
      stats: {
        linesOfCode: "Linhas de Código",
        completedProjects: "Projetos Concluídos",
        technologies: "Tecnologias",
        yearsExperience: "Anos de Experiência",
      },
      terminal: {
        frontend: `// Frontend Excellence
const skills = {
  react: { level: 95, projects: 25+ },
  nextjs: { level: 92, projects: 18+ },
  typescript: { level: 90, projects: 30+ }
};

export default function Developer() {
  return <ExpertiseLevel>Advanced</ExpertiseLevel>
}`,
        backend: `// Backend Mastery  
const server = {
  nodejs: { level: 93, apis: 15+ },
  nestjs: { level: 88, microservices: 8+ },
  python: { level: 85, django: true }
};

async function buildScalableAPI() {
  return await architecture.implement();
}`,
        tools: `// DevOps & Tools
const workflow = {
  docker: { containers: 50+, orchestration: true },
  git: { commits: 2000+, collaboration: true },
  aws: { services: 10+, deployment: true }
};

deploy.production({ uptime: '99.9%' });`,
      },
      skills: {
        frontend: [
          { name: "React.js", experience: "3+ anos", projects: 25, icon: "⚛️" },
          { name: "Next.js", experience: "2+ anos", projects: 18, icon: "▲" },
          { name: "TypeScript", experience: "2+ anos", projects: 30, icon: "🔷" },
          { name: "Tailwind CSS", experience: "2+ anos", projects: 20, icon: "🎨" },
          { name: "Framer Motion", experience: "1+ ano", projects: 12, icon: "🎭" },
          { name: "React Native", experience: "1+ ano", projects: 5, icon: "📱" },
        ],
        backend: [
          { name: "Node.js", experience: "3+ anos", projects: 22, icon: "🟢" },
          { name: "NestJS", experience: "2+ anos", projects: 15, icon: "🔴" },
          { name: "Python", experience: "2+ anos", projects: 12, icon: "🐍" },
          { name: "Django", experience: "2+ anos", projects: 8, icon: "🎯" },
          { name: "PostgreSQL", experience: "3+ anos", projects: 25, icon: "🐘" },
          { name: "MongoDB", experience: "2+ anos", projects: 10, icon: "🍃" },
        ],
        tools: [
          { name: "Docker", experience: "2+ anos", projects: 15, icon: "🐳" },
          { name: "Git & GitHub", experience: "3+ anos", projects: 50, icon: "📚" },
          { name: "AWS", experience: "1+ ano", projects: 8, icon: "☁️" },
          { name: "Linux", experience: "2+ anos", projects: 20, icon: "🐧" },
          { name: "Jest", experience: "2+ anos", projects: 18, icon: "🧪" },
          { name: "Figma", experience: "2+ anos", projects: 25, icon: "🎨" },
        ],
      },
      projectsText: "projetos",
      metrics: {
        codeQuality: "Code Quality",
        testCoverage: "Test Coverage",
        performance: "Performance",
        accessibility: "Accessibility",
      },
      expertise: {
        title: "Expertise em Destaque",
        description: "Tecnologias que domino e utilizo para criar soluções de alta qualidade",
        areas: [
          {
            title: "Full Stack Development",
            description: "Desenvolvimento completo de aplicações web modernas",
            technologies: ["React", "Next.js", "Node.js", "TypeScript"],
          },
          {
            title: "Backend Architecture",
            description: "APIs robustas e arquiteturas escaláveis",
            technologies: ["NestJS", "PostgreSQL", "Docker", "AWS"],
          },
          {
            title: "Modern Frontend",
            description: "Interfaces responsivas e performáticas",
            technologies: ["React", "Tailwind", "Framer Motion", "PWA"],
          },
        ],
      },
    },
    timeline: {
      title: "Minha Jornada",
      description: "A evolução da minha carreira em desenvolvimento através dos anos",
      location: "Brasília, DF - Disponível para novos desafios",
      events: [
        {
          date: "2018",
          title: "Descoberta da Programação",
          description: "Primeiro contato com desenvolvimento através de cursos online e projetos pessoais.",
          fullDescription:
            "Comecei minha jornada no desenvolvimento web criando pequenos projetos em HTML, CSS e JavaScript. Foi quando descobri minha paixão por resolver problemas através do código.",
        },
        {
          date: "2021",
          title: "Início da Graduação",
          description: "Comecei minha jornada acadêmica em Sistemas da Informação na Estácio de Sá.",
          fullDescription:
            "Ingressei no curso de Sistemas da Informação para formalizar meus conhecimentos e aprender sobre arquitetura de software, banco de dados e metodologias de desenvolvimento.",
        },
        {
          date: "2022",
          title: "Primeiro Estágio",
          description: "Iniciei estágio de Desenvolvimento Full Stack na Defensoria Pública do Distrito Federal.",
          fullDescription:
            "Minha primeira experiência profissional, onde desenvolvo soluções que impactam diretamente a vida das pessoas. Trabalho com React, Next.js, Django e PostgreSQL.",
        },
        {
          date: "2023",
          title: "Especialização em React & Next.js",
          description: "Aprofundei conhecimentos em desenvolvimento front-end moderno através da Udemy.",
          fullDescription:
            "Completei cursos avançados em React, Next.js, TypeScript e arquiteturas modernas. Aprendi sobre SSR, SSG, otimização de performance e melhores práticas.",
        },
        {
          date: "2023",
          title: "Domínio do Backend",
          description: "Expandiu expertise em desenvolvimento back-end com Python, Django e Node.js.",
          fullDescription:
            "Aprofundei conhecimentos em desenvolvimento backend, APIs REST, autenticação, autorização e integração com bancos de dados relacionais e não-relacionais.",
        },
        {
          date: "2024",
          title: "Projetos Freelance",
          description: "Comecei a trabalhar em projetos freelance e contribuições open source.",
          fullDescription:
            "Iniciei trabalhos como freelancer, desenvolvendo soluções completas para clientes. Também comecei a contribuir para projetos open source e construir meu portfólio online.",
        },
        {
          date: "2024",
          title: "Desenvolvedor Full Stack",
          description: "Consolidação como desenvolvedor full stack com foco em tecnologias modernas.",
          fullDescription:
            "Hoje sou um desenvolvedor full stack experiente, especializado em React, Next.js, Node.js, TypeScript e Python. Continuo aprendendo e me especializando em novas tecnologias.",
        },
      ],
    },
    projects: {
      title: "Projetos",
      description: "Alguns dos projetos que desenvolvi e estou desenvolvendo",
      filters: {
        all: "Todos",
        frontend: "Frontend",
        backend: "Backend",
        fullstack: "Full Stack",
      },
      viewProject: "Ver Projeto",
      viewCode: "Código",
      viewAll: "Ver Todos os Projetos",
      list: [
        {
          title: "Sistema da Defensoria Pública",
          description:
            "Desenvolvimento de interfaces web utilizando Next.js, React e TypeScript. Implementação de rotas e funcionalidades no back-end com Django e Python.",
          category: "fullstack",
          technologies: ["Next.js", "React", "TypeScript", "Django", "Python"],
        },
        {
          title: "API de Gerenciamento",
          description:
            "API REST robusta para gerenciamento de dados com autenticação JWT, documentação completa e testes automatizados.",
          category: "backend",
          technologies: ["NestJS", "PostgreSQL", "JWT", "Docker", "Jest"],
        },
        {
          title: "Dashboard Interativo",
          description:
            "Dashboard com gráficos em tempo real, métricas de performance e análise de dados usando React e TypeScript.",
          category: "frontend",
          technologies: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
        },
        {
          title: "Portfólio Pessoal",
          description:
            "Este próprio portfólio, desenvolvido com Next.js, Framer Motion e Tailwind CSS, demonstrando habilidades em design moderno.",
          category: "frontend",
          technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
        },
      ],
    },
    contact: {
      title: "Vamos Criar Algo Incrível",
      description: "Estou sempre aberto a novas oportunidades, projetos desafiadores e colaborações interessantes",
      command: "contact --send-message",
      commands: [
        "contact --send-message",
        "git commit -m 'Let's work together!'",
        "npm run start-collaboration",
        "docker run -p 3000:3000 awesome-project",
      ],
      sections: {
        getInTouch: "Entre em Contato",
        sendMessage: "Envie uma Mensagem",
      },
      methods: [
        {
          title: "Email",
          subtitle: "Resposta em até 24h",
          value: "eliasmartinsdev8@gmail.com",
          description: "Melhor forma de contato para propostas profissionais",
        },
        {
          title: "LinkedIn",
          subtitle: "Rede profissional",
          value: "elias-f-martins",
          description: "Conecte-se comigo para oportunidades",
        },
        {
          title: "GitHub",
          subtitle: "Código e projetos",
          value: "eliasfmartins",
          description: "Explore meus repositórios e contribuições",
        },
        {
          title: "Localização",
          subtitle: "Disponível para remoto",
          value: "Brasília, DF - Brasil",
          description: "Aberto a oportunidades presenciais e remotas",
        },
      ],
      quickActions: {
        title: "Ações Rápidas",
        schedule: "Agendar Reunião",
        whatsapp: "WhatsApp",
      },
      form: {
        name: "Nome",
        email: "Email",
        company: "Empresa",
        projectType: "Tipo de Projeto",
        message: "Mensagem",
        newsletter: "Quero receber updates sobre tecnologia e desenvolvimento",
        send: "Enviar Mensagem",
        sending: "Enviando...",
        placeholders: {
          name: "Seu nome completo",
          email: "seu@email.com",
          company: "Nome da sua empresa (opcional)",
          message: "Conte-me sobre seu projeto, prazos, orçamento e qualquer detalhe importante...",
        },
        projectTypes: {
          select: "Selecione o tipo de projeto",
          website: "Website/Landing Page",
          webapp: "Aplicação Web",
          api: "API/Backend",
          mobile: "App Mobile",
          consulting: "Consultoria",
          other: "Outro",
        },
        success: {
          title: "Mensagem Enviada!",
          description: "Obrigado pelo seu contato! Responderei sua mensagem em até 24 horas.",
        },
        response: "Respondo todas as mensagens em até 24 horas!",
      },
    },
    footer: {
      brand: {
        name: "Elias Martins",
        title: "Full Stack Developer",
        description:
          "Desenvolvedor apaixonado por criar soluções inovadoras e experiências digitais excepcionais. Especializado em Node.js, React e tecnologias modernas.",
      },
      navigation: "Navegação",
      contact: {
        title: "Contato",
        email: "📧 eliasmartinsdev8@gmail.com",
        location: "📍 Brasília, DF - Brasil",
        availability: "🕒 Disponível para projetos",
        status: {
          title: "Status Atual",
          available: "Aberto para oportunidades",
        },
      },
      bottom: {
        madeWith: "Feito com",
        and: "e muito",
        builtWith: "Desenvolvido com Next.js, TypeScript & Tailwind CSS",
      },
      socialLabels: {
        github: "GitHub",
        linkedin: "LinkedIn",
        email: "Email",
      },
    },
  },
}

type Language = "en" | "pt"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  const t = (key: string) => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key}`)
        return key
      }
    }

    return value
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
