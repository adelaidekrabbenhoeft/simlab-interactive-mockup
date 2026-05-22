const siteSpecific = {
  title: 'WCER SimLab',
  tagline: 'Simulation-Based Learning to Manage Challenging Situations',
  searchPlaceholder: 'Ask anything about SimLab…',
  exploreLabel: 'Explore',
  footer: '© 2025–2026 University of Wisconsin–Madison SimLab',
  menuItems: ['About', 'Publications', 'News', 'Connect'],
  topLevel: ['Home']
};

const contentItems = {

  /* -------- Pages -------- */

  Home: {
    label: 'Home',
    context: 'Select a topic above to explore SimLab concepts.',
    tags: ['home']
  },

  About: {
    label: 'About',
    context: 'Mission, approach, and background',
    tags: ['about']
  },

  Design: {
    label: 'Design',
    context: 'Methods for development and delivery',
    tags: ['design']
  },

  Team: {
    label: 'Team',
    context: 'SimLab personnel',
    tags: ['team']
  },

  Publications: {
    label: 'Publications',
    context: 'SimLab publications and related scholarly work',
    tags: ['publications']
  },

  News: {
    label: 'News',
    context: 'News, events, and updates',
    tags: ['news']
  },

  Connect: {
    label: 'Connect',
    context: 'Ways to connect and collaborate',
    tags: ['connect']
  },

  /* -------- Boxes -------- */

  AboutSimLab: {
    title: 'About SimLab',
    text: 'SimLab is a project within WCER established to address training and assessment of professionals’ skills in managing challenging situations.',
    tags: ['about', 'home']
  },

  SimLabMission: {
    title: "SimLab’s Mission",
    text: 'SimLab’s mission is to provide practitioners with realistic, structured simulation experiences.',
    tags: ['about']
  },

  SimLabApproach: {
    title: "SimLab’s Approach",
    text: 'SimLab uses modern assessment design, AI, and evidence‑based professional learning approaches.',
    tags: ['design']
  },

  WhatIsChallenging: {
    title: 'What Do We Mean by “Challenging”?',
    text: 'SimLab tackles challenging situations involving difficult <a href="#" data-nav="ChallengingTask">tasks</a>, charged <a href="#" data-nav="ChallengingContent">content</a>, and stressful <a href="#" data-nav="ChallengingContext">contexts</a>.',
    tags: ['design', 'challenge']
  },

  ChallengingTask: {
    title: 'What Are Challenging Tasks?',
    text: 'The skill is difficult: A professional must demonstrate competence that is tough to acquire. Examples include giving hard feedback, being honest without damaging trust or motivation, or reading group dynamics and sensing tension, exclusion, confusion, or disengagement before it becomes problematic.',
    tags: ['design', 'challenge']
  },

  ChallengingContent: {
    title: 'What Is Challenging Content?',
    text: 'The content is fraught: A professional must address a sensitive or nuanced topic. Examples include asking about one\'s or someone else\'s mental health, or feeling out a suspicion of worrying situations such as abuse.',
    tags: ['design', 'challenge']
  },

  ChallengingContext: {
    title: 'What Are Challenging Contexts?',
    text: 'The context is charged: A professional must defuse a potentially explosive situation. Examples include calming an angry individual or soothing a distraught individual, who may be at a peer level or at a higher or lower level in the social hierarchy.',
    tags: ['design', 'challenge']
  },

  SimLabOffers: {
    title: 'What SimLab Offers',
    text: 'SimLab offers professionals the opportunity to rehearse high‑stakes conversations.',
    tags: ['design', 'home']
  },

  ConnectWithUs: {
    title: 'Connect With Us',
    text: 'See our <a href="#" data-nav="Team">Team</a> page or email simlab@wcer.wisc.edu.',
    tags: ['connect']
  },

  PartnerSupport: {
    title: 'Partner Support',
    text: 'SimLab supports partners with simulation development, delivery, and analysis.',
    tags: ['connect', 'design']
  }
};

const keywordMap = {
  about: 'About',
  challenge: 'Design',
  challenging: 'Design',
  design: 'Design',
  team: 'Team',
  people: 'Team',
  publications: 'Publications',
  news: 'News',
  connect: 'Connect',
  contact: 'Connect'
};