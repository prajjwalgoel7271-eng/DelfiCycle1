const PREFIX = 'delficycle:';

const keys = {
  cart: PREFIX + 'cart',
  coins: PREFIX + 'coins',
  activity: PREFIX + 'activity',
  messages: PREFIX + 'messages',
  completed: PREFIX + 'completed',
  challenges: PREFIX + 'challengeSubmissions',
};

function read(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Graceful handling if localStorage is full or disabled
  }
}

export const db = {
  getCart: () => read(keys.cart, []),
  saveCart: (v) => write(keys.cart, v),

  getCoins: () => read(keys.coins, 0),
  addCoins: (amount, label) => {
    const next = db.getCoins() + amount;
    write(keys.coins, next);
    const a = read(keys.activity, []);
    a.unshift({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      amount,
      label,
      date: new Date().toLocaleString(),
    });
    write(keys.activity, a.slice(0, 20));
    return next;
  },

  getActivity: () => read(keys.activity, []),

  getCompleted: () => read(keys.completed, []),
  completeTutorial: (id) => {
    const a = read(keys.completed, []);
    if (!a.includes(id)) {
      a.push(id);
      write(keys.completed, a);
      return true;
    }
    return false;
  },

  saveMessage: (msg) => {
    const a = read(keys.messages, []);
    a.unshift({
      ...msg,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: new Date().toISOString(),
    });
    write(keys.messages, a);
    return true;
  },
  getMessages: () => read(keys.messages, []),

  saveChallenge: (entry) => {
    const a = read(keys.challenges, []);
    a.unshift({
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: new Date().toISOString(),
    });
    write(keys.challenges, a);
    return true;
  },
  getChallengeSubmissions: () => read(keys.challenges, []),

  reset: () => Object.values(keys).forEach((k) => localStorage.removeItem(k)),
};
