// Portfolio 1
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  // === Multilingual support ===
  const translations = {
    fr: {
      copyright: "Tous droits reservés",
      // Portfolio section
      portfolio1Title: "Anacad-Tech",
      portfolio1Desc: "Application de gestion des évaluations des professeurs d'une université (UCC). ",
      portfolio1IndicTitle: "Indicateurs de performance",
      portfolio1Perf: "Performance",
      portfolio1Access: "Accessibilité",
      portfolio1Seo: "Référencement",
      portfolio1TechTitle: "Implémentation technique",
      portfolio1Li1: "▸ Géneration automatique de QR code ",
      portfolio1Li2: "▸ IndexedDB pour les données hors ligne",
      portfolio1Li3: "▸ Gestion trimestriel des cours et participants",
      portfolio1Li4: "▸ Découpage dynamique du code ",
      portfolio1Li5: "▸ ",
      portfolio1Link: "Cliquer ici",

      portfolio2Title: "Fiesta",
      portfolio2Desc: "Application de gestion des céremonies (mariage, anniversaire, conférence etc). ",
      portfolio2IndicTitle: "Indicateurs de performance",
      portfolio2Perf: "Performance",
      portfolio2Access: "Accessibilité",
      portfolio2Seo: "Référencement",
      portfolio2TechTitle: "Implémentation technique",
      portfolio2Li1: "▸ Géneration des inivitaions electroniques contenant un QR code ",
      portfolio2Li2: "▸ IndexedDB pour les données hors ligne",
      portfolio2Li3: "▸ Système de rappel",
      portfolio2Li4: "▸ Contrôle en temps de l'arrivé des inivités ",

      portfolio3Title: "Joschool",
      portfolio3Desc: "Application de gestion d'école (destinée à l'apprentissage de mes étudiants) . ",
      portfolio3ObjTitle: "Objectifs",
      portfolio3Practice: "Pratiques",
      portfolio3Pedago: "Pédagogique",
      portfolio3Func: "Programmation fonctionnelles",
      portfolio3TechTitle: "Implémentation technique",
      portfolio3Li1: "▸ Gestion éléve ",
      portfolio3Li2: "▸ Gestion enseignant",
      portfolio3Li3: "▸ Gestion parents d'éléve",
      portfolio3Li4: "▸ Gestion personnel administratif ",
      portfolio3Li5: "▸ ",
      portfolio3Link: "Cliquer ici ",
      // Masomo-App (portfolio4)
      portfolio4Title: "Masomo-App",
      portfolio4Desc: "Application de gestion d'une école primaire.",
      portfolio4IndicTitle: "Indicateurs de performance",
      portfolio4Perf: "Performance",
      portfolio4Access: "Accessibilité",
      portfolio4Seo: "Référencement",
      portfolio4TechTitle: "Implémentation technique",
      portfolio4Li1: "▸ Tableau de bord synthétique",
      portfolio4Li2: "▸ Gestion des élèves, enseignants, classes",
      portfolio4Li3: "▸ Emploi du temps interactif",
      portfolio4Li4: "▸ Suivi des paiements et factures",
      portfolio4Li5: "▸ Notes & évaluations (saisie, calcul, export)",
      portfolio4Li6: "▸ Présences/absences (import/export, stats)",
      portfolio4Li7: "▸ Communication interne (fil de discussion)",
      portfolio4Li8: "▸ Gestion documentaire (upload, filtres, actions groupées)",
      portfolio4Li9: "▸ Bulletins (grille, calculs, modèles, export Excel/PDF)",
      portfolio4Li10: "▸ Paramètres (personnalisation, gestion utilisateurs)",
      portfolio4Li11: "▸ ",
      portfolio4Link: "Cliquer ici",
      // About section details
      aboutExpLabel: "Expérience:",
      aboutExpValue: "6 ans",
      aboutSiteLabel: "Site web:",
      aboutSiteValue: "josuengoma.github.io",
      aboutPhoneLabel: "Téléphone:",
      aboutPhoneValue: "+243 97 23 15 704",
      aboutCityLabel: "Ville:",
      aboutCityValue: "Kinshasa, RD Congo",
      aboutCertifLabel: "Certifications:",
      aboutCertifValue: "IBM, Meta, Coursera",
      aboutStudyLabel: "Etude:",
      aboutStudyValue: "Master en CSI",
      aboutEmailLabel: "Email:",
      aboutEmailValue: "ngomajosue80@gmail.com",
      aboutFreelanceLabel: "Freelance:",
      aboutFreelanceValue: "Disponible",
      name: "Josué Ngoma Le surmesure",
      job: "Software Engineer",
      nav: ["Accueil", "A propos", "Parcours", "Portfolio", "Services", "Contact"],
      aboutTitle: "A propos",
      aboutWho: "Qui suis-je ?",
      aboutText: `Ingénieur logiciel avec plus de {years} années d'expérience dans le\n              développement web full-stack, la modélisation de bases de données (SQL, MySQL,\n              PostgreSQL, MongoDB) et l'intégration de frameworks comme Django et Laravel.\n              Je suis également compétent en DevOps (Git, Docker, Ansible, Kubernetes,\n              Jenkins) et capable de former des équipes aux dernières technologies web. Je suis\n              un professionnel polyvalent, axé sur la résolution de problèmes et la création de\n              solutions robustes et efficaces.`,
      certifications: "Certifications et badges",
      certificationsDesc: "Mes Certifications et Badges internationales",
      skillsTitle: "Compétences",
      frontendTitle: "🎨 Développement Frontend",
      backendTitle: "⚡ Backend & APIs",
      devopsTitle: "🚀 Performance & DevOps",
      resumeTitle: "Parcours",
      resumeDesc: "Mon cursus academique, scolaire et Parcours professionnel",
      educationTitle: "Education",
      expTitle: "Expérience Professionelle",
      portfolioTitle: "Portfolio",
      portfolioDesc: "Mes récentes réalisations ",
      servicesTitle: "Mes compétences",
      servicesDesc: "Qu'est ce que je sais faire ?",
      service1Title: "Ingenieur logiciel",
      service1Desc: "Je conçois et développe des solutions logicielles performantes et évolutives",
      service2Title: "Formateur / Développeur web",
      service2Desc: "Je crée des sites web modernes et forme aux technologies du web",
      service3Title: "Administrateur base des données",
      service3Desc: "Je gère, optimise et sécurise vos bases de données efficacement.",
      service4Title: "DevOps",
      service4Desc: "J'automatise les déploiements pour une livraison continue et fiable",
      footerName: "Josué Ngoma Le surmesure",
      footerJob: "Backend Software Engineer .",

      // Diplômes
      diplomaMaster: "Master en Conception des Systèmes d'Informations (CSI) / BAC + 5",
      diplomaMasterYears: "2021 - 2023",
      diplomaMasterSchool: "Université Pédagogique Nationale de kinshasa ",
      diplomaLicence: "Licence en Mathématiques - Informatique / BAC + 3",
      diplomaLicenceYears: "2018 - 2021",
      diplomaLicenceSchool: "Université Pédagogique Nationale de kinshasa",
      diplomaBac: "Baccalauréat / Math-Physique (Série C)",
      diplomaBacYears: "2017 - 2018",
      diplomaBacSchool: "Lycée chaminade",

      // Expériences
      exp1Title: "Consultant / Enquêteur",
      exp1Years: "2024 - 2025",
      exp1Company: "VSI Afrique ",
      exp1Li1: "Enquêteur sur le projet KIN-ELENDA de la Regiso-sarl.",
      exp1Li2: "Recensement des abonnés actifs, non actifs et potentiels.",
      exp1Li3: "Négociation et rebranchement des abonnés inactifs et des clients potentiels",

      exp2Title: "Développeur web ",
      exp2Years: "2023 - 2024",
      exp2Company: "LabXTech",
      exp2Li1: "Développement et maintenance d'applications web complètes en utilisant des technologies front-end et back-end",
      exp2Li2: "Participation à la conception de l'architecture logicielle et à la mise en œuvre de solutions optimisées",
      exp2Li3: "Chef de departement du \"Developpement web\"",

      exp3Title: "Consultant / Développeur web fullstack",
      exp3Years: "Fev - Dec 2025",
      exp3Company: "NAZA Service",
      exp3Li1: "Conception et mise en œuvre de solutions web personnalisées pour les clients.",
      exp3Li2: "Analyse des besoins techniques et fonctionnels pour garantir la conformité des livrables.",

      exp4Title: "Développeur web stagiaire",
      exp4Years: "Fév - Août 2023",
      exp4Company: "Orange Digital Center",
      exp4Li1: "Participation à des projets de développement en équipe.",
      exp4Li2: "Apprentissage et application des bonnes pratiques de codage.",
      exp4Li3: "Recommended and consulted with clients on the most appropriate graphic design",
      exp4Li4: "Contribution à la création de prototypes d'applications web et mobiles sous la supervision de développeurs seniors.",

      exp5Title: "Développeur & Formateur web",
      exp5Years: "2020 - Courant",
      exp5Company: "JOScenter",
      exp5Li1: "Conception et animation de formations sur le développement web pour des groupes d'apprenants.",
      exp5Li2: "Développement de supports de cours et d'exercices pratiques pour les langages de programmation enseignés dans les formations."
    },
    en: {
      copyright: "All rights reserved",
      // Portfolio section
      portfolio1Title: "Anacad-Tech",
      portfolio1Desc: "Teacher evaluation management application for a university (UCC).",
      portfolio1IndicTitle: "Performance Indicators",
      portfolio1Perf: "Performance",
      portfolio1Access: "Accessibility",
      portfolio1Seo: "SEO",
      portfolio1TechTitle: "Technical Implementation",
      portfolio1Li1: "▸ Automatic QR code generation",
      portfolio1Li2: "▸ IndexedDB for offline data",
      portfolio1Li3: "▸ Quarterly management of courses and participants",
      portfolio1Li4: "▸ Dynamic code splitting",
      portfolio1Li5: "▸ ",
      portfolio1Link: "Click here",

      portfolio2Title: "Fiesta",
      portfolio2Desc: "Event management application (wedding, birthday, conference, etc).",
      portfolio2IndicTitle: "Performance Indicators",
      portfolio2Perf: "Performance",
      portfolio2Access: "Accessibility",
      portfolio2Seo: "SEO",
      portfolio2TechTitle: "Technical Implementation",
      portfolio2Li1: "▸ Generation of electronic invitations with QR code",
      portfolio2Li2: "▸ IndexedDB for offline data",
      portfolio2Li3: "▸ Reminder system",
      portfolio2Li4: "▸ Real-time arrival control of guests",

      portfolio3Title: "Joschool",
      portfolio3Desc: "School management application (for my students' learning).",
      portfolio3ObjTitle: "Objectives",
      portfolio3Practice: "Practice",
      portfolio3Pedago: "Pedagogical",
      portfolio3Func: "Functional programming",
      portfolio3TechTitle: "Technical Implementation",
      portfolio3Li1: "▸ Student management",
      portfolio3Li2: "▸ Teacher management",
      portfolio3Li3: "▸ Parent management",
      portfolio3Li4: "▸ Administrative staff management",
      portfolio3Li5: "▸ ",
      portfolio3Link: "Click here ",
      // Masomo-App (portfolio4)
      portfolio4Title: "Masomo-App",
      portfolio4Desc: "Primary school management application.",
      portfolio4IndicTitle: "Performance Indicators",
      portfolio4Perf: "Performance",
      portfolio4Access: "Accessibility",
      portfolio4Seo: "SEO",
      portfolio4TechTitle: "Technical Implementation",
      portfolio4Li1: "▸ Dashboard overview",
      portfolio4Li2: "▸ Management of students, teachers, classes",
      portfolio4Li3: "▸ Interactive timetable",
      portfolio4Li4: "▸ Payment and invoice tracking",
      portfolio4Li5: "▸ Marks & evaluations (entry, calculations, export)",
      portfolio4Li6: "▸ Attendance (import/export, stats)",
      portfolio4Li7: "▸ Internal communication (discussion feed)",
      portfolio4Li8: "▸ Document management (upload, filters, bulk actions)",
      portfolio4Li9: "▸ Report cards (grid, calculations, templates, export Excel/PDF)",
      portfolio4Li10: "▸ Settings (customization, user management)",
      portfolio4Li11: "▸ ",
      portfolio4Link: "Click here",
      // About section details
      aboutExpLabel: "Experience:",
      aboutExpValue: "6 years",
      aboutSiteLabel: "Website:",
      aboutSiteValue: "josuengoma.github.io",
      aboutPhoneLabel: "Phone:",
      aboutPhoneValue: "+243 97 23 15 704",
      aboutCityLabel: "City:",
      aboutCityValue: "Kinshasa, DR Congo",
      aboutCertifLabel: "Certifications:",
      aboutCertifValue: "IBM, Meta, Coursera",
      aboutStudyLabel: "Degree:",
      aboutStudyValue: "Master in ISD",
      aboutEmailLabel: "Email:",
      aboutEmailValue: "ngomajosue80@gmail.com",
      aboutFreelanceLabel: "Freelance:",
      aboutFreelanceValue: "Available",
      name: "Josué Ngoma Le surmesure",
      job: "Software Engineer",
      nav: ["Home", "About", "Resume", "Portfolio", "Services", "Contact"],
      aboutTitle: "About",
      aboutWho: "Who am I?",
      aboutText: `software engineer with over {years} years of experience in\n              full-stack web development, database modeling (SQL, MySQL,\n              PostgreSQL, MongoDB), and integrating frameworks like Django and Laravel.\n              I am also skilled in DevOps (Git, Docker, Ansible, Kubernetes,\n              Jenkins) and able to train teams on the latest web technologies. I am\n              a versatile professional focused on problem-solving and creating\n              robust and efficient solutions.`,
      certifications: "Certifications & Badges",
      certificationsDesc: "My International Certifications and Badges",
      skillsTitle: "Skills",
      frontendTitle: "🎨 Frontend Development",
      backendTitle: "⚡ Backend & APIs",
      devopsTitle: "🚀 Performance & DevOps",
      resumeTitle: "Resume",
      resumeDesc: "My academic, school and professional background",
      educationTitle: "Education",
      expTitle: "Professional Experience",
      portfolioTitle: "Portfolio",
      portfolioDesc: "My recent projects",
      servicesTitle: "My skills",
      servicesDesc: "What can I do?",
      service1Title: "Software Engineer",
      service1Desc: "I design and develop high-performance, scalable software solutions",
      service2Title: "Trainer / Web Developer",
      service2Desc: "I create modern websites and train in web technologies",
      service3Title: "Database Administrator",
      service3Desc: "I manage, optimize and secure your databases efficiently.",
      service4Title: "DevOps",
      service4Desc: "I automate deployments for continuous and reliable delivery",
      footerName: "Josué Ngoma Le surmesure",
      footerJob: "Backend Software Engineer .",

      // Diplomas
      diplomaMaster: "Master in Information Systems Design (CSI) / BAC + 5",
      diplomaMasterYears: "2021 - 2023",
      diplomaMasterSchool: "National Pedagogical University of Kinshasa",
      diplomaLicence: "Bachelor in Mathematics - Computer Science / BAC + 3",
      diplomaLicenceYears: "2018 - 2021",
      diplomaLicenceSchool: "National Pedagogical University of Kinshasa",
      diplomaBac: "Baccalaureate / Math-Physics (Series C)",
      diplomaBacYears: "2017 - 2018",
      diplomaBacSchool: "Chaminade High School",

      // Experiences
      exp1Title: "Consultant / Surveyor",
      exp1Years: "2024 - 2025",
      exp1Company: "VSI Africa ",
      exp1Li1: "Surveyor on the KIN-ELENDA project of Regiso-sarl.",
      exp1Li2: "Census of active, inactive and potential subscribers.",
      exp1Li3: "Negotiation and reconnection of inactive subscribers and potential clients",

      exp2Title: "Web Developer ",
      exp2Years: "2023 - 2024",
      exp2Company: "LabXTech",
      exp2Li1: "Development and maintenance of complete web applications using front-end and back-end technologies",
      exp2Li2: "Participation in the design of software architecture and implementation of optimized solutions",
      exp2Li3: "Head of the \"Web Development\" department",

      exp3Title: "Consultant / Fullstack Web Developer",
      exp3Years: "Feb - Dec 2025",
      exp3Company: "NAZA Service",
      exp3Li1: "Design and implementation of customized web solutions for clients.",
      exp3Li2: "Analysis of technical and functional requirements to ensure deliverables compliance.",

      exp4Title: "Web Developer Intern",
      exp4Years: "Feb - Aug 2023",
      exp4Company: "Orange Digital Center",
      exp4Li1: "Participation in team development projects.",
      exp4Li2: "Learning and applying coding best practices.",
      exp4Li3: "Recommended and consulted with clients on the most appropriate graphic design",
      exp4Li4: "Contributed to the creation of web and mobile application prototypes under the supervision of senior developers.",

      exp5Title: "Web Developer & Trainer",
      exp5Years: "2020 - Present",
      exp5Company: "JOScenter",
      exp5Li1: "Design and delivery of web development training for learner groups.",
      exp5Li2: "Development of course materials and practical exercises for programming languages taught in the training."
    }
  };

  function setLanguage(lang) {
    // Copyright
    const copyright = document.getElementById('copyright-text');
    if (copyright) {
      // On garde l'année dynamique
      const year = new Date().getFullYear();
      copyright.innerHTML = year + '. Josue Ngoma Le surmesure | ' + translations[lang].copyright;
    }
    // Portfolio section
    const portfolio1Title = document.getElementById('portfolio1-title');
    if (portfolio1Title) portfolio1Title.textContent = translations[lang].portfolio1Title;
    const portfolio1Desc = document.getElementById('portfolio1-desc');
    if (portfolio1Desc) portfolio1Desc.textContent = translations[lang].portfolio1Desc;
    const portfolio1IndicTitle = document.getElementById('portfolio1-indic-title');
    if (portfolio1IndicTitle) portfolio1IndicTitle.textContent = translations[lang].portfolio1IndicTitle;
    const portfolio1Perf = document.getElementById('portfolio1-perf');
    if (portfolio1Perf) portfolio1Perf.textContent = translations[lang].portfolio1Perf;
    const portfolio1Access = document.getElementById('portfolio1-access');
    if (portfolio1Access) portfolio1Access.textContent = translations[lang].portfolio1Access;
    const portfolio1Seo = document.getElementById('portfolio1-seo');
    if (portfolio1Seo) portfolio1Seo.textContent = translations[lang].portfolio1Seo;
    const portfolio1TechTitle = document.getElementById('portfolio1-tech-title');
    if (portfolio1TechTitle) portfolio1TechTitle.textContent = translations[lang].portfolio1TechTitle;
    const portfolio1Li1 = document.getElementById('portfolio1-li1');
    if (portfolio1Li1) portfolio1Li1.textContent = translations[lang].portfolio1Li1;
    const portfolio1Li2 = document.getElementById('portfolio1-li2');
    if (portfolio1Li2) portfolio1Li2.textContent = translations[lang].portfolio1Li2;
    const portfolio1Li3 = document.getElementById('portfolio1-li3');
    if (portfolio1Li3) portfolio1Li3.textContent = translations[lang].portfolio1Li3;
    const portfolio1Li4 = document.getElementById('portfolio1-li4');
    if (portfolio1Li4) portfolio1Li4.textContent = translations[lang].portfolio1Li4;
    const portfolio1Li5 = document.getElementById('portfolio1-li5');
    if (portfolio1Li5) portfolio1Li5.innerHTML = translations[lang].portfolio1Li5 + '<i class="bx bx-link"></i> : <a href="https://github.com/josuengoma/joschool" title="Visiter l\'application" target="_blank" rel="noopener" id="portfolio1-link">' + translations[lang].portfolio1Link + '</a>';

    const portfolio2Title = document.getElementById('portfolio2-title');
    if (portfolio2Title) portfolio2Title.textContent = translations[lang].portfolio2Title;
    const portfolio2Desc = document.getElementById('portfolio2-desc');
    if (portfolio2Desc) portfolio2Desc.textContent = translations[lang].portfolio2Desc;
    const portfolio2IndicTitle = document.getElementById('portfolio2-indic-title');
    if (portfolio2IndicTitle) portfolio2IndicTitle.textContent = translations[lang].portfolio2IndicTitle;
    const portfolio2Perf = document.getElementById('portfolio2-perf');
    if (portfolio2Perf) portfolio2Perf.textContent = translations[lang].portfolio2Perf;
    const portfolio2Access = document.getElementById('portfolio2-access');
    if (portfolio2Access) portfolio2Access.textContent = translations[lang].portfolio2Access;
    const portfolio2Seo = document.getElementById('portfolio2-seo');
    if (portfolio2Seo) portfolio2Seo.textContent = translations[lang].portfolio2Seo;
    const portfolio2TechTitle = document.getElementById('portfolio2-tech-title');
    if (portfolio2TechTitle) portfolio2TechTitle.textContent = translations[lang].portfolio2TechTitle;
    const portfolio2Li1 = document.getElementById('portfolio2-li1');
    if (portfolio2Li1) portfolio2Li1.textContent = translations[lang].portfolio2Li1;
    const portfolio2Li2 = document.getElementById('portfolio2-li2');
    if (portfolio2Li2) portfolio2Li2.textContent = translations[lang].portfolio2Li2;
    const portfolio2Li3 = document.getElementById('portfolio2-li3');
    if (portfolio2Li3) portfolio2Li3.textContent = translations[lang].portfolio2Li3;
    const portfolio2Li4 = document.getElementById('portfolio2-li4');
    if (portfolio2Li4) portfolio2Li4.textContent = translations[lang].portfolio2Li4;

    const portfolio3Title = document.getElementById('portfolio3-title');
    if (portfolio3Title) portfolio3Title.textContent = translations[lang].portfolio3Title;
    const portfolio3Desc = document.getElementById('portfolio3-desc');
    if (portfolio3Desc) portfolio3Desc.textContent = translations[lang].portfolio3Desc;
    const portfolio3ObjTitle = document.getElementById('portfolio3-obj-title');
    if (portfolio3ObjTitle) portfolio3ObjTitle.textContent = translations[lang].portfolio3ObjTitle;
    const portfolio3Practice = document.getElementById('portfolio3-practice');
    if (portfolio3Practice) portfolio3Practice.textContent = translations[lang].portfolio3Practice;
    const portfolio3Pedago = document.getElementById('portfolio3-pedago');
    if (portfolio3Pedago) portfolio3Pedago.textContent = translations[lang].portfolio3Pedago;
    const portfolio3Func = document.getElementById('portfolio3-func');
    if (portfolio3Func) portfolio3Func.textContent = translations[lang].portfolio3Func;
    const portfolio3TechTitle = document.getElementById('portfolio3-tech-title');
    if (portfolio3TechTitle) portfolio3TechTitle.textContent = translations[lang].portfolio3TechTitle;
    const portfolio3Li1 = document.getElementById('portfolio3-li1');
    if (portfolio3Li1) portfolio3Li1.textContent = translations[lang].portfolio3Li1;
    const portfolio3Li2 = document.getElementById('portfolio3-li2');
    if (portfolio3Li2) portfolio3Li2.textContent = translations[lang].portfolio3Li2;
    const portfolio3Li3 = document.getElementById('portfolio3-li3');
    if (portfolio3Li3) portfolio3Li3.textContent = translations[lang].portfolio3Li3;
    const portfolio3Li4 = document.getElementById('portfolio3-li4');
    if (portfolio3Li4) portfolio3Li4.textContent = translations[lang].portfolio3Li4;
    const portfolio3Li5 = document.getElementById('portfolio3-li5');
    if (portfolio3Li5) portfolio3Li5.innerHTML = translations[lang].portfolio3Li5 + '<i class="bx bx-link"></i> : <a href="https://github.com/josuengoma/joschool" class="portfolio-details-lightbox" data-glightbox="type: external" title="Visiter le dépot github" target="_blank" rel="noopener" id="portfolio3-link">' + translations[lang].portfolio3Link + '</a>';

    // Masomo-App (portfolio4)
    const portfolio4Title = document.getElementById('portfolio4-title');
    if (portfolio4Title) portfolio4Title.textContent = translations[lang].portfolio4Title;
    const portfolio4Desc = document.getElementById('portfolio4-desc');
    if (portfolio4Desc) portfolio4Desc.textContent = translations[lang].portfolio4Desc;
    const portfolio4IndicTitle = document.getElementById('portfolio4-indic-title');
    if (portfolio4IndicTitle) portfolio4IndicTitle.textContent = translations[lang].portfolio4IndicTitle;
    const portfolio4Perf = document.getElementById('portfolio4-perf');
    if (portfolio4Perf) portfolio4Perf.textContent = translations[lang].portfolio4Perf;
    const portfolio4Access = document.getElementById('portfolio4-access');
    if (portfolio4Access) portfolio4Access.textContent = translations[lang].portfolio4Access;
    const portfolio4Seo = document.getElementById('portfolio4-seo');
    if (portfolio4Seo) portfolio4Seo.textContent = translations[lang].portfolio4Seo;
    const portfolio4TechTitle = document.getElementById('portfolio4-tech-title');
    if (portfolio4TechTitle) portfolio4TechTitle.textContent = translations[lang].portfolio4TechTitle;
    const portfolio4Li1 = document.getElementById('portfolio4-li1');
    if (portfolio4Li1) portfolio4Li1.textContent = translations[lang].portfolio4Li1;
    const portfolio4Li2 = document.getElementById('portfolio4-li2');
    if (portfolio4Li2) portfolio4Li2.textContent = translations[lang].portfolio4Li2;
    const portfolio4Li3 = document.getElementById('portfolio4-li3');
    if (portfolio4Li3) portfolio4Li3.textContent = translations[lang].portfolio4Li3;
    const portfolio4Li4 = document.getElementById('portfolio4-li4');
    if (portfolio4Li4) portfolio4Li4.textContent = translations[lang].portfolio4Li4;
    const portfolio4Li5 = document.getElementById('portfolio4-li5');
    if (portfolio4Li5) portfolio4Li5.textContent = translations[lang].portfolio4Li5;
    const portfolio4Li6 = document.getElementById('portfolio4-li6');
    if (portfolio4Li6) portfolio4Li6.textContent = translations[lang].portfolio4Li6;
    const portfolio4Li7 = document.getElementById('portfolio4-li7');
    if (portfolio4Li7) portfolio4Li7.textContent = translations[lang].portfolio4Li7;
    const portfolio4Li8 = document.getElementById('portfolio4-li8');
    if (portfolio4Li8) portfolio4Li8.textContent = translations[lang].portfolio4Li8;
    const portfolio4Li9 = document.getElementById('portfolio4-li9');
    if (portfolio4Li9) portfolio4Li9.textContent = translations[lang].portfolio4Li9;
    const portfolio4Li10 = document.getElementById('portfolio4-li10');
    if (portfolio4Li10) portfolio4Li10.textContent = translations[lang].portfolio4Li10;
    const portfolio4Li11 = document.getElementById('portfolio4-li11');
    if (portfolio4Li11) portfolio4Li11.innerHTML = translations[lang].portfolio4Li11 + '<i class="bx bx-link"></i> : <a href="https://masomo-app-eta.vercel.app/" title="Visiter l\'application" target="_blank" rel="noopener" id="portfolio4-link">' + translations[lang].portfolio4Link + '</a>';
    // About section details (labels and values)
    // compute dynamic experience years
    const startYear = 2019;
    const currentYear = new Date().getFullYear();
    const experience = currentYear - startYear;

    const aboutExpLabel = document.getElementById('about-exp-label');
    if (aboutExpLabel) aboutExpLabel.textContent = translations[lang].aboutExpLabel;
    const aboutExpValue = document.getElementById('about-exp-value');
    if (aboutExpValue) aboutExpValue.textContent = (lang === 'fr') ? `${experience} ans` : `${experience} years`;
    const aboutSiteLabel = document.getElementById('about-site-label');
    if (aboutSiteLabel) aboutSiteLabel.textContent = translations[lang].aboutSiteLabel;
    const aboutSiteValue = document.getElementById('about-site-value');
    if (aboutSiteValue) aboutSiteValue.textContent = translations[lang].aboutSiteValue;
    const aboutPhoneLabel = document.getElementById('about-phone-label');
    if (aboutPhoneLabel) aboutPhoneLabel.textContent = translations[lang].aboutPhoneLabel;
    const aboutPhoneValue = document.getElementById('about-phone-value');
    if (aboutPhoneValue) aboutPhoneValue.textContent = translations[lang].aboutPhoneValue;
    const aboutCityLabel = document.getElementById('about-city-label');
    if (aboutCityLabel) aboutCityLabel.textContent = translations[lang].aboutCityLabel;
    const aboutCityValue = document.getElementById('about-city-value');
    if (aboutCityValue) aboutCityValue.textContent = translations[lang].aboutCityValue;
    const aboutCertifLabel = document.getElementById('about-certif-label');
    if (aboutCertifLabel) aboutCertifLabel.textContent = translations[lang].aboutCertifLabel;
    const aboutCertifValue = document.getElementById('about-certif-value');
    if (aboutCertifValue) aboutCertifValue.textContent = translations[lang].aboutCertifValue;
    const aboutStudyLabel = document.getElementById('about-study-label');
    if (aboutStudyLabel) aboutStudyLabel.textContent = translations[lang].aboutStudyLabel;
    const aboutStudyValue = document.getElementById('about-study-value');
    if (aboutStudyValue) aboutStudyValue.textContent = translations[lang].aboutStudyValue;
    const aboutEmailLabel = document.getElementById('about-email-label');
    if (aboutEmailLabel) aboutEmailLabel.textContent = translations[lang].aboutEmailLabel;
    const aboutEmailValue = document.getElementById('about-email-value');
    if (aboutEmailValue) aboutEmailValue.textContent = translations[lang].aboutEmailValue;
    const aboutFreelanceLabel = document.getElementById('about-freelance-label');
    if (aboutFreelanceLabel) aboutFreelanceLabel.textContent = translations[lang].aboutFreelanceLabel;
    const aboutFreelanceValue = document.getElementById('about-freelance-value');
    if (aboutFreelanceValue) aboutFreelanceValue.textContent = translations[lang].aboutFreelanceValue;
    // Hero section
    const name = document.getElementById('name');
    if (name) name.textContent = translations[lang].name;
    const job = document.getElementById('job-title');
    if (job) job.textContent = translations[lang].job;

    // Navbar
    const navSpans = document.querySelectorAll('#navbar .nav-link span');
    navSpans.forEach((el, idx) => {
      if (translations[lang].nav[idx]) el.textContent = translations[lang].nav[idx];
    });

    // About section
    const aboutTitle = document.getElementById('about-title');
    if (aboutTitle) aboutTitle.textContent = translations[lang].aboutTitle;
    const aboutWho = document.getElementById('about-who');
    if (aboutWho) aboutWho.textContent = translations[lang].aboutWho;
    const aboutText = document.getElementById('about-text');
    if (aboutText) {
      // inject the computed years into the about text and keep the exp-years span
      const html = translations[lang].aboutText.replace('{years}', '<span id="exp-years">' + experience + '</span>');
      aboutText.innerHTML = html;
    }

    // Certifications section
    const certifTitle = document.getElementById('certif-title');
    if (certifTitle) certifTitle.textContent = translations[lang].certifications;
    const certifDesc = document.getElementById('certif-desc');
    if (certifDesc) certifDesc.textContent = translations[lang].certificationsDesc;

    // Diplomas
    const diplomaMaster = document.getElementById('diploma-master');
    if (diplomaMaster) diplomaMaster.textContent = translations[lang].diplomaMaster;
    const diplomaMasterYears = document.getElementById('diploma-master-years');
    if (diplomaMasterYears) diplomaMasterYears.textContent = translations[lang].diplomaMasterYears;
    const diplomaMasterSchool = document.getElementById('diploma-master-school');
    if (diplomaMasterSchool) diplomaMasterSchool.textContent = translations[lang].diplomaMasterSchool;
    const diplomaLicence = document.getElementById('diploma-licence');
    if (diplomaLicence) diplomaLicence.textContent = translations[lang].diplomaLicence;
    const diplomaLicenceYears = document.getElementById('diploma-licence-years');
    if (diplomaLicenceYears) diplomaLicenceYears.textContent = translations[lang].diplomaLicenceYears;
    const diplomaLicenceSchool = document.getElementById('diploma-licence-school');
    if (diplomaLicenceSchool) diplomaLicenceSchool.textContent = translations[lang].diplomaLicenceSchool;
    const diplomaBac = document.getElementById('diploma-bac');
    if (diplomaBac) diplomaBac.textContent = translations[lang].diplomaBac;
    const diplomaBacYears = document.getElementById('diploma-bac-years');
    if (diplomaBacYears) diplomaBacYears.textContent = translations[lang].diplomaBacYears;
    const diplomaBacSchool = document.getElementById('diploma-bac-school');
    if (diplomaBacSchool) diplomaBacSchool.textContent = translations[lang].diplomaBacSchool;

    // Experiences
    const exp1Title = document.getElementById('exp1-title');
    if (exp1Title) exp1Title.textContent = translations[lang].exp1Title;
    const exp1Years = document.getElementById('exp1-years');
    if (exp1Years) exp1Years.textContent = translations[lang].exp1Years;
    const exp1Company = document.getElementById('exp1-company');
    if (exp1Company) exp1Company.textContent = translations[lang].exp1Company;
    const exp1Li1 = document.getElementById('exp1-li1');
    if (exp1Li1) exp1Li1.textContent = translations[lang].exp1Li1;
    const exp1Li2 = document.getElementById('exp1-li2');
    if (exp1Li2) exp1Li2.textContent = translations[lang].exp1Li2;
    const exp1Li3 = document.getElementById('exp1-li3');
    if (exp1Li3) exp1Li3.textContent = translations[lang].exp1Li3;

    const exp2Title = document.getElementById('exp2-title');
    if (exp2Title) exp2Title.textContent = translations[lang].exp2Title;
    const exp2Years = document.getElementById('exp2-years');
    if (exp2Years) exp2Years.textContent = translations[lang].exp2Years;
    const exp2Company = document.getElementById('exp2-company');
    if (exp2Company) exp2Company.textContent = translations[lang].exp2Company;
    const exp2Li1 = document.getElementById('exp2-li1');
    if (exp2Li1) exp2Li1.textContent = translations[lang].exp2Li1;
    const exp2Li2 = document.getElementById('exp2-li2');
    if (exp2Li2) exp2Li2.textContent = translations[lang].exp2Li2;
    const exp2Li3 = document.getElementById('exp2-li3');
    if (exp2Li3) exp2Li3.textContent = translations[lang].exp2Li3;

    const exp3Title = document.getElementById('exp3-title');
    if (exp3Title) exp3Title.textContent = translations[lang].exp3Title;
    const exp3Years = document.getElementById('exp3-years');
    if (exp3Years) exp3Years.textContent = translations[lang].exp3Years;
    const exp3Company = document.getElementById('exp3-company');
    if (exp3Company) exp3Company.textContent = translations[lang].exp3Company;
    const exp3Li1 = document.getElementById('exp3-li1');
    if (exp3Li1) exp3Li1.textContent = translations[lang].exp3Li1;
    const exp3Li2 = document.getElementById('exp3-li2');
    if (exp3Li2) exp3Li2.textContent = translations[lang].exp3Li2;

    const exp4Title = document.getElementById('exp4-title');
    if (exp4Title) exp4Title.textContent = translations[lang].exp4Title;
    const exp4Years = document.getElementById('exp4-years');
    if (exp4Years) exp4Years.textContent = translations[lang].exp4Years;
    const exp4Company = document.getElementById('exp4-company');
    if (exp4Company) exp4Company.textContent = translations[lang].exp4Company;
    const exp4Li1 = document.getElementById('exp4-li1');
    if (exp4Li1) exp4Li1.textContent = translations[lang].exp4Li1;
    const exp4Li2 = document.getElementById('exp4-li2');
    if (exp4Li2) exp4Li2.textContent = translations[lang].exp4Li2;
    const exp4Li3 = document.getElementById('exp4-li3');
    if (exp4Li3) exp4Li3.textContent = translations[lang].exp4Li3;
    const exp4Li4 = document.getElementById('exp4-li4');
    if (exp4Li4) exp4Li4.textContent = translations[lang].exp4Li4;

    const exp5Title = document.getElementById('exp5-title');
    if (exp5Title) exp5Title.textContent = translations[lang].exp5Title;
    const exp5Years = document.getElementById('exp5-years');
    if (exp5Years) exp5Years.textContent = translations[lang].exp5Years;
    const exp5Company = document.getElementById('exp5-company');
    if (exp5Company) exp5Company.textContent = translations[lang].exp5Company;
    const exp5Li1 = document.getElementById('exp5-li1');
    if (exp5Li1) exp5Li1.textContent = translations[lang].exp5Li1;
    const exp5Li2 = document.getElementById('exp5-li2');
    if (exp5Li2) exp5Li2.textContent = translations[lang].exp5Li2;

    // Skills section
    const skillsTitle = document.getElementById('skills-title');
    if (skillsTitle) skillsTitle.textContent = translations[lang].skillsTitle;
    const frontendTitle = document.getElementById('frontend-title');
    if (frontendTitle) frontendTitle.textContent = translations[lang].frontendTitle;
    const backendTitle = document.getElementById('backend-title');
    if (backendTitle) backendTitle.textContent = translations[lang].backendTitle;
    const devopsTitle = document.getElementById('devops-title');
    if (devopsTitle) devopsTitle.textContent = translations[lang].devopsTitle;

    // Resume section
    const resumeTitle = document.getElementById('resume-title');
    if (resumeTitle) resumeTitle.textContent = translations[lang].resumeTitle;
    const resumeDesc = document.getElementById('resume-desc');
    if (resumeDesc) resumeDesc.textContent = translations[lang].resumeDesc;
    const educationTitle = document.getElementById('education-title');
    if (educationTitle) educationTitle.textContent = translations[lang].educationTitle;
    const expTitle = document.getElementById('exp-title');
    if (expTitle) expTitle.textContent = translations[lang].expTitle;

    // Portfolio section
    const portfolioTitle = document.getElementById('portfolio-title');
    if (portfolioTitle) portfolioTitle.textContent = translations[lang].portfolioTitle;
    const portfolioDesc = document.getElementById('portfolio-desc');
    if (portfolioDesc) portfolioDesc.textContent = translations[lang].portfolioDesc;

    // Services section
    const servicesTitle = document.getElementById('services-title');
    if (servicesTitle) servicesTitle.textContent = translations[lang].servicesTitle;
    const servicesDesc = document.getElementById('services-desc');
    if (servicesDesc) servicesDesc.textContent = translations[lang].servicesDesc;
    const service1Title = document.getElementById('service1-title');
    if (service1Title) service1Title.textContent = translations[lang].service1Title;
    const service1Desc = document.getElementById('service1-desc');
    if (service1Desc) service1Desc.textContent = translations[lang].service1Desc;
    const service2Title = document.getElementById('service2-title');
    if (service2Title) service2Title.textContent = translations[lang].service2Title;
    const service2Desc = document.getElementById('service2-desc');
    if (service2Desc) service2Desc.textContent = translations[lang].service2Desc;
    const service3Title = document.getElementById('service3-title');
    if (service3Title) service3Title.textContent = translations[lang].service3Title;
    const service3Desc = document.getElementById('service3-desc');
    if (service3Desc) service3Desc.textContent = translations[lang].service3Desc;
    const service4Title = document.getElementById('service4-title');
    if (service4Title) service4Title.textContent = translations[lang].service4Title;
    const service4Desc = document.getElementById('service4-desc');
    if (service4Desc) service4Desc.textContent = translations[lang].service4Desc;

    // Footer
    const footerName = document.getElementById('footer-name');
    if (footerName) footerName.textContent = translations[lang].footerName;
    const footerJob = document.getElementById('footer-job');
    if (footerJob) footerJob.textContent = translations[lang].footerJob;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const btnFr = document.getElementById('lang-fr');
    const btnEn = document.getElementById('lang-en');
    if (btnFr && btnEn) {
      btnFr.addEventListener('click', function () {
        setLanguage('fr');
        localStorage.setItem('lang', 'fr');
        btnFr.classList.add('btn-primary');
        btnFr.classList.remove('btn-secondary');
        btnEn.classList.remove('btn-primary');
        btnEn.classList.add('btn-secondary');
      });
      btnEn.addEventListener('click', function () {
        setLanguage('en');
        localStorage.setItem('lang', 'en');
        btnEn.classList.add('btn-primary');
        btnEn.classList.remove('btn-secondary');
        btnFr.classList.remove('btn-primary');
        btnFr.classList.add('btn-secondary');
      });

      // Determine initial language: localStorage -> navigator -> default 'fr'
      const savedLang = localStorage.getItem('lang');
      let initialLang = 'fr';
      if (savedLang === 'fr' || savedLang === 'en') {
        initialLang = savedLang;
      } else {
        const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
        if (nav.startsWith('en')) initialLang = 'en';
        else if (nav.startsWith('fr')) initialLang = 'fr';
        else initialLang = 'fr';
      }

      setLanguage(initialLang);
      if (initialLang === 'fr') {
        btnFr.classList.add('btn-primary');
        btnFr.classList.remove('btn-secondary');
        btnEn.classList.remove('btn-primary');
        btnEn.classList.add('btn-secondary');
      } else {
        btnEn.classList.add('btn-primary');
        btnEn.classList.remove('btn-secondary');
        btnFr.classList.remove('btn-primary');
        btnFr.classList.add('btn-secondary');
      }
    }
  });

})()