const siteSpecific = {
  title: 'WCER SimLab: The Journey',
  tagline: 'Step out of the ordinary. Master the challenging.',
  searchPlaceholder: 'Search for trials, mentors, or concepts...',
  exploreLabel: 'Explore the Path',
  footer: '© 2025–2026 University of Wisconsin–Madison SimLab',
  menuItems: ['The Ordinary World', 'The Call', 'The Trials', 'The Mentors', 'The Return'],
  topLevel: ['Home']
};

const contentItems = {

  Home: {
    label: 'The Threshold',
    context: 'Every practitioner faces moments that test their limits. Select a stage of the journey above to explore how SimLab prepares you for the challenges ahead.',
    tags: ['home']
  },

  'The Ordinary World': {
    label: 'The Ordinary World',
    context: 'Before the challenge arises, we must understand the baseline. This is our mission and the everyday reality of the professionals we serve.',
    tags: ['ordinary-world', 'about']
  },

  'The Call': {
    label: 'The Call to Adventure',
    context: 'A difficult situation presents itself. We use modern assessment design and AI to help you answer the call.',
    tags: ['the-call', 'design']
  },

  'The Trials': {
    label: 'The Trials',
    context: 'The core of our simulations. Face challenging tasks, fraught content, and charged contexts in a safe environment.',
    tags: ['the-trials', 'challenge']
  },

  'The Mentors': {
    label: 'The Mentors',
    context: 'Meet the guides who build the simulations and research the science of professional learning.',
    tags: ['mentors', 'team', 'publications']
  },

  'The Return': {
    label: 'The Return',
    context: 'Bring your new skills back to your practice. Connect with us to bring SimLab to your organization.',
    tags: ['the-return', 'connect']
  },

  /* =======================
     THE LORE (Boxes)
  ======================= */

  MissionBox: {
    title: 'The SimLab Mission',
    text: 'Our mission is to provide practitioners with realistic, structured simulation experiences so they aren\'t facing the unknown alone.',
    tags: ['ordinary-world', 'home']
  },

  ApproachBox: {
    title: 'Forging the Tools',
    text: 'SimLab uses evidence-based professional learning approaches combined with AI to create dynamic, responsive scenarios.',
    tags: ['the-call', 'design']
  },

  ChallengeDefinition: {
    title: 'Defining the Obstacle',
    text: 'We tackle situations involving difficult <a href="#" data-nav="TaskTrial">tasks</a>, charged <a href="#" data-nav="ContentTrial">content</a>, and stressful <a href="#" data-nav="ContextTrial">contexts</a>.',
    tags: ['the-trials', 'the-call']
  },

  TaskTrial: {
    title: 'Trial 1: The Task',
    text: 'The skill is difficult. You must demonstrate competence that is tough to acquire, like giving hard feedback or reading group dynamics before they fracture.',
    tags: ['the-trials', 'challenge']
  },

  ContentTrial: {
    title: 'Trial 2: The Content',
    text: 'The content is fraught. You must address sensitive topics, such as navigating mental health discussions or addressing suspicions of abuse.',
    tags: ['the-trials', 'challenge']
  },

  ContextTrial: {
    title: 'Trial 3: The Context',
    text: 'The environment is charged. You must defuse explosive situations, calm angry individuals, or navigate complex social hierarchies under pressure.',
    tags: ['the-trials', 'challenge']
  },

  ResearchBox: {
    title: 'The Archives (Publications)',
    text: 'Explore our scholarly work and the foundational research that powers every simulation we design.',
    tags: ['mentors', 'publications']
  },

  TeamBox: {
    title: 'Meet the Guides',
    text: 'Our personnel are dedicated to researching, developing, and facilitating high-stakes conversation training.',
    tags: ['mentors', 'team']
  },

  PartnerBox: {
    title: 'Equipping Your Team',
    text: 'SimLab supports partners with simulation development, delivery, and analysis. Bring the journey to your organization.',
    tags: ['the-return', 'connect', 'home']
  }
};

const keywordMap = {
  mission: 'The Ordinary World',
  about: 'The Ordinary World',
  design: 'The Call',
  ai: 'The Call',
  trials: 'The Trials',
  challenge: 'The Trials',
  task: 'The Trials',
  content: 'The Trials',
  context: 'The Trials',
  team: 'The Mentors',
  guides: 'The Mentors',
  research: 'The Mentors',
  connect: 'The Return',
  partner: 'The Return'
};