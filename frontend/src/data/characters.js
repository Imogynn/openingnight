// Character data for Opening Night
// Each character has strengths, flaws, and stats that influence gameplay

export const ROLES = {
  BARTENDER: 'bartender',
  SERVER: 'server',
  BARBACK: 'barback'
};

export const TEAM_SLOTS = {
  [ROLES.BARTENDER]: 2,
  [ROLES.SERVER]: 2,
  [ROLES.BARBACK]: 1
};

export const characters = [
  // BARTENDERS
  {
    id: 'marcus-chen',
    name: 'Marcus "Mix" Chen',
    role: ROLES.BARTENDER,
    age: 28,
    ethnicity: 'Asian',
    traits: 'Lightning-fast, cocktail encyclopedia, extremely charismatic',
    background: 'Former competition bartender with a social media following. Can make 200+ drinks from memory.',
    strengths: [
      'Makes drinks incredibly fast',
      'Knows every cocktail recipe',
      'Charms customers effortlessly'
    ],
    flaws: [
      'Terrible with money and math',
      'Gets distracted telling stories'
    ],
    artPrompt: 'Asian man, late 20s, stylish undercut hair, sleeve tattoos, confident smile, wearing suspenders and rolled-up sleeves, holding a cocktail shaker mid-flip',
    baseStats: {
      confidence: 85,
      enthusiasm: 80,
      redFlags: 20
    }
  },
  {
    id: 'delia-okafor',
    name: 'Delia Okafor',
    role: ROLES.BARTENDER,
    age: 32,
    ethnicity: 'Nigerian',
    traits: 'Molecular mixology expert, organized, professional',
    background: 'Former chemist who fell in love with cocktail science. Every drink is a laboratory experiment.',
    strengths: [
      'Creates stunning molecular cocktails',
      'Extremely organized and clean',
      'Professional demeanor'
    ],
    flaws: [
      'Takes forever to make drinks',
      'Can be condescending to customers'
    ],
    artPrompt: 'Nigerian woman, early 30s, natural hair in elegant updo, lab-coat-inspired bartender apron, glasses, serious expression, surrounded by scientific-looking bar tools',
    baseStats: {
      confidence: 90,
      enthusiasm: 60,
      redFlags: 35
    }
  },
  {
    id: 'cowboy-jim',
    name: '"Cowboy" Jim Bradshaw',
    role: ROLES.BARTENDER,
    age: 52,
    ethnicity: 'White',
    traits: '20 years experience, steady under pressure, great stories',
    background: 'Old-school bartender from Texas. Has worked every dive bar and honky-tonk between Austin and Nashville.',
    strengths: [
      'Two decades of experience',
      'Never cracks under pressure',
      'Customers love his stories'
    ],
    flaws: [
      'Stuck in his ways',
      'Dismissive of fancy cocktails',
      'Can be grumpy with young staff'
    ],
    artPrompt: 'White man, 50s, weathered face, handlebar mustache, cowboy hat, western shirt with pearl snaps, leaning on bar with arms crossed',
    baseStats: {
      confidence: 95,
      enthusiasm: 50,
      redFlags: 40
    }
  },
  {
    id: 'zara-patel',
    name: 'Zara Patel',
    role: ROLES.BARTENDER,
    age: 23,
    ethnicity: 'South Asian',
    traits: 'Social media genius, brings in crowds, knows trendy drinks',
    background: 'Influencer bartender with 100K followers. Every drink is content.',
    strengths: [
      'Massive social media following',
      'Knows every trendy drink',
      'Attracts young customers'
    ],
    flaws: [
      'Constantly on phone',
      'Prioritizes Instagram over service'
    ],
    artPrompt: 'South Asian woman, early 20s, colorful hair with pink streaks, multiple piercings, vintage band t-shirt, taking a selfie with a neon drink',
    baseStats: {
      confidence: 75,
      enthusiasm: 90,
      redFlags: 45
    }
  },

  // SERVERS
  {
    id: 'tommy-obrien',
    name: "Tommy O'Brien",
    role: ROLES.SERVER,
    age: 22,
    ethnicity: 'Irish-American',
    traits: 'Puppy-dog enthusiasm, remembers regulars, tireless energy',
    background: 'First hospitality job. Golden retriever in human form. Genuinely loves making people happy.',
    strengths: [
      'Infectious enthusiasm',
      'Never forgets a name or order',
      'Works incredibly hard'
    ],
    flaws: [
      'Clumsy - drops things',
      'Too chatty (slows service)',
      'Cries when yelled at'
    ],
    artPrompt: 'Irish-American man, early 20s, red curly hair, freckles, big genuine smile, dropping a tray of drinks in slow motion, comedic timing',
    baseStats: {
      confidence: 65,
      enthusiasm: 95,
      redFlags: 35
    }
  },
  {
    id: 'samira-hassan',
    name: 'Samira Hassan',
    role: ROLES.SERVER,
    age: 26,
    ethnicity: 'Middle Eastern',
    traits: 'Four languages, extremely efficient, reads customers perfectly',
    background: 'Worked high-end restaurants in Dubai and Paris. No-nonsense professional.',
    strengths: [
      'Speaks four languages fluently',
      'Lightning-fast service',
      'Reads customer needs perfectly'
    ],
    flaws: [
      'Brutally honest with rude customers',
      'Zero small talk skills'
    ],
    artPrompt: 'Middle Eastern woman, mid-20s, sharp professional look, hijab styled elegantly, holding notepad with perfect posture, slight eyebrow raise (judging)',
    baseStats: {
      confidence: 90,
      enthusiasm: 60,
      redFlags: 30
    }
  },
  {
    id: 'ricky-gomez',
    name: 'Ricky Gomez',
    role: ROLES.SERVER,
    age: 29,
    ethnicity: 'Latino',
    traits: 'Former actor, impeccable charm, natural salesman',
    background: 'Failed actor who found his stage in hospitality. Every table is a performance.',
    strengths: [
      'Handles difficult customers brilliantly',
      'Incredible charm and charisma',
      'Upsells everything'
    ],
    flaws: [
      'Treats shifts like theater (exhausting)',
      'Unreliable with schedule'
    ],
    artPrompt: 'Latino man, late 20s, theater-kid energy, dramatic gesture mid-flourish, bowtie and vest, spotlight effect, megawatt smile',
    baseStats: {
      confidence: 85,
      enthusiasm: 85,
      redFlags: 40
    }
  },
  {
    id: 'june-park',
    name: 'June Park',
    role: ROLES.SERVER,
    age: 31,
    ethnicity: 'Korean',
    traits: 'Incredibly detail-oriented, never forgets orders, polite and sweet',
    background: 'Former office worker seeking work-life balance. Treats service like project management.',
    strengths: [
      'Perfect attention to detail',
      'Never messes up orders',
      'Polite and professional'
    ],
    flaws: [
      'Freezes under pressure',
      'Cannot handle confrontation'
    ],
    artPrompt: 'Korean woman, early 30s, neat ponytail, nervous but kind expression, holding notepad protectively, stress sweat visible, shy smile',
    baseStats: {
      confidence: 55,
      enthusiasm: 70,
      redFlags: 25
    }
  },
  {
    id: 'big-andre',
    name: 'Big Andre Williams',
    role: ROLES.SERVER,
    age: 42,
    ethnicity: 'Black',
    traits: 'Intimidating presence, surprisingly gentle, extremely loyal',
    background: 'Former bouncer who wanted a friendlier job. Gentle giant with a heart of gold.',
    strengths: [
      'Handles troublemakers effortlessly',
      'Kind and patient',
      'Fiercely loyal'
    ],
    flaws: [
      'Moves slowly',
      'Breaks glassware (too strong)',
      'Terrible at multitasking'
    ],
    artPrompt: 'Large Black man, 40s, bald, kind eyes, gentle giant vibe, tiny cocktail glass in massive hand looking comically small, apologetic expression',
    baseStats: {
      confidence: 70,
      enthusiasm: 75,
      redFlags: 30
    }
  },

  // BARBACKS
  {
    id: 'chloe-martinez',
    name: 'Chloe "Chaos" Martinez',
    role: ROLES.BARBACK,
    age: 21,
    ethnicity: 'Latina',
    traits: 'Hyperactive speed, can carry everything, never tired',
    background: 'Former track athlete with ADHD superpowers. Moves like a caffeinated tornado.',
    strengths: [
      'Incredibly fast',
      'Superhuman carrying capacity',
      'Never runs out of energy'
    ],
    flaws: [
      'Zero attention to detail',
      'Crashes into things constantly',
      'Talks non-stop'
    ],
    artPrompt: 'Latina woman, early 20s, messy bun, energy drink in one hand, carrying impossible stack of glasses, mid-collision with surprised expression, whirlwind of motion lines',
    baseStats: {
      confidence: 70,
      enthusiasm: 100,
      redFlags: 40
    }
  },
  {
    id: 'nigel-thornberry',
    name: 'Nigel Thornberry',
    role: ROLES.BARBACK,
    age: 34,
    ethnicity: 'White British',
    traits: 'Spotlessly clean, organized, punctual, follows rules',
    background: 'Former military. Runs restocking operations like tactical missions.',
    strengths: [
      'Perfectly organized',
      'Always on time',
      'Follows protocols exactly'
    ],
    flaws: [
      'Zero personality',
      'Corrects everyone constantly',
      'Insufferable rule enforcer'
    ],
    artPrompt: 'White British man, 30s, perfectly pressed uniform, clipboard, measuring tape clipped to belt, adjusting glasses disapprovingly, standing with ruler-straight posture',
    baseStats: {
      confidence: 80,
      enthusiasm: 40,
      redFlags: 45
    }
  },
  {
    id: 'luna-rodriguez',
    name: 'Luna Rodriguez',
    role: ROLES.BARBACK,
    age: 27,
    ethnicity: 'Latina',
    traits: 'Problem-solver, creative thinker, calm in chaos, surprisingly strong',
    background: 'Former art school dropout. Treats bar setup like installation art.',
    strengths: [
      'Solves problems creatively',
      'Calm under pressure',
      'Stronger than she looks'
    ],
    flaws: [
      'Too philosophical (confuses people)',
      'Shows up in bizarre outfits'
    ],
    artPrompt: 'Latina woman, late 20s, alternative style with pixie cut and shaved side, vintage band tee, covered in eclectic tattoos, zen expression while carrying kegs, crystal necklace',
    baseStats: {
      confidence: 75,
      enthusiasm: 85,
      redFlags: 25
    }
  }
];

// Helper functions
export const getCharactersByRole = (role) => {
  return characters.filter(char => char.role === role);
};

export const getCharacterById = (id) => {
  return characters.find(char => char.id === id);
};

export const getTotalSlots = () => {
  return Object.values(TEAM_SLOTS).reduce((sum, count) => sum + count, 0);
};
