const dict = {
  en: {
    add_wall: 'Wall',
    add_door: 'Door',
    add_token: 'Token',
    add_note: 'Note',
    clear_board: 'Clear Board',
    confirm_clear: 'Are you sure you want to delete all tokens?',
    yes: 'Yes',
    no: 'No',
    home_description: 'Try the board editor from the dedicated route.',
    go_to_editor: 'Go to editor',
    board_editor_title: 'Board Editor',
    edit_token: 'Edit Token',
    close_panel: 'Close panel',
    initials: 'Initials',
    eg_p1: 'Eg: P1',
    base_color: 'Base Color',
    default_color: 'Default',
    delete_token: 'Delete Token'
  },
  es: {
    add_wall: 'Muro',
    add_door: 'Puerta',
    add_token: 'Ficha',
    add_note: 'Nota',
    clear_board: 'Limpiar Tablero',
    confirm_clear: '¿Seguro que quieres borrar todas las fichas?',
    yes: 'Sí',
    no: 'No',
    home_description: 'Prueba el editor del tablero desde la ruta dedicada.',
    go_to_editor: 'Ir al editor',
    board_editor_title: 'Editor de tablero',
    edit_token: 'Editar Ficha',
    close_panel: 'Cerrar panel',
    initials: 'Iniciales',
    eg_p1: 'Ej: P1',
    base_color: 'Color de Base',
    default_color: 'Defecto',
    delete_token: 'Eliminar Ficha'
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
