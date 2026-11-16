/**
 * The fixed Codex asset contract. Only these file names ever exist on disk —
 * never invent another one here.
 */
export const assets = {
  bgGame: require('../../assets/bg_game.png'),
  logo: require('../../assets/logo.png'),
  iconHome: require('../../assets/icon_home.png'),
  iconPause: require('../../assets/icon_pause.png'),
  journal: require('../../assets/sprite_1.png'),
  memory: require('../../assets/sprite_2.png'),
  emptyTimeline: require('../../assets/sprite_3.png'),
  savedAccent: require('../../assets/sprite_4.png'),
  emptySearch: require('../../assets/sprite_5.png'),
} as const;

export default assets;
