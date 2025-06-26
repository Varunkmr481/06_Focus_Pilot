const levelThresholds = [
  { level: 1, hours: 50, badge: "Novice", emoji: "🎖️" },
  { level: 2, hours: 250, badge: "Apprentice", emoji: "🌟" },
  { level: 3, hours: 500, badge: "Journeyman", emoji: "🏅" },
  { level: 4, hours: 800, badge: "Expert", emoji: "🔥" },
  { level: 5, hours: 750, badge: "Master", emoji: "👑" },
  { level: 6, hours: 1000, badge: "Champion", emoji: "🏆" },
  { level: 7, hours: 1200, badge: "Hero", emoji: "⚔️" },
  { level: 8, hours: 1700, badge: "Legend", emoji: "🌌" },
  { level: 9, hours: 2400, badge: "Mythic", emoji: "✨" },
  { level: 10, hours: 3200, badge: "Guardian", emoji: "🛡️" },
  { level: 11, hours: 3900, badge: "Pioneer", emoji: "🚀" },
  { level: 12, hours: 4500, badge: "Vanguard", emoji: "⚡" },
  { level: 13, hours: 6000, badge: "Trailblazer", emoji: "🌍" },
  { level: 14, hours: 7500, badge: "Overlord", emoji: "💥" },
  { level: 15, hours: 9000, badge: "Immortal", emoji: "🌟" },
];

getLevelFromHours = function (hours) {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (Number(levelThresholds[i].hours) <= Number(hours)) {
      return {
        level: Number(levelThresholds[i].level),
        badge: levelThresholds[i].badge,
        emoji: levelThresholds[i].emoji,
      };
    }
  }

  return { level: 0, badge: "Beginner", emoji: "🎖️" };
};

module.exports = getLevelFromHours;
