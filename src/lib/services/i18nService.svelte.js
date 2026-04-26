const dict = {
  en: {
    add_wall: 'Wall',
    add_door: 'Door',
    add_token: 'Token',
    add_note: 'Note',
    clear_board: 'Clear Board',
    confirm_clear: 'Are you sure you want to delete all tokens?',
    yes: 'Yes',
    no: 'No'
  },
  es: {
    add_wall: 'Muro',
    add_door: 'Puerta',
    add_token: 'Ficha',
    add_note: 'Nota',
    clear_board: 'Limpiar Tablero',
    confirm_clear: '¿Seguro que quieres borrar todas las fichas?',
    yes: 'Sí',
    no: 'No'
  }
};

let locale = $state('en');

export const i18n = {
  get locale() { return locale; },
  set locale(val) { locale = val; },
  t(key) {
    return dict[locale]?.[key] || key;
  },
  init() {
    if (typeof navigator !== 'undefined') {
      const lang = navigator.language.split('-')[0];
      if (dict[lang]) {
        locale = lang;
      }
    }
  }
};
