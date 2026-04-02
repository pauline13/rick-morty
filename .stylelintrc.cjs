module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  plugins: ['stylelint-order'],

  rules: {
    'order/properties-order': [
      [
        'position',
        'top',
        'right',
        'bottom',
        'left',
        'z-index',

        'display',
        'align-items',
        'justify-content',
        'flex',
        'gap',

        'width',
        'height',

        'margin',
        'padding',

        'font',
        'font-size',
        'line-height',
        'font-weight',
        'color',

        'background',
        'border',
        'border-radius',

        'transition',
        'opacity'
      ]
    ],
    'selector-class-pattern': [
      '^([A-Z]+[a-z0-9]+)+(__[a-z0-9]+([A-Z][a-z0-9]+)*)?(_[a-z0-9]+([A-Z][a-z0-9]+)*)?$',
      { resolveNestedSelectors: true }
    ],
    'scss/at-rule-no-unknown': true
  },
  overrides: [
    {
      files: ['src/shared/styles/base.css', 'src/shared/styles/normalize.css'],
      rules: {
        'selector-class-pattern': null,
        'declaration-block-no-shorthand-property-overrides': null,
        'custom-property-empty-line-before': null
      }
    }
  ]
};
