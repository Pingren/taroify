module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-sass-guidelines",
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
  ],
  rules: {
    "selector-type-no-unknown": [
      true,
      {
        ignoreTypes: ["/^taro-/"],
      },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["host", "global"],
      },
    ],
    "max-nesting-depth": [
      5,
      {
        ignoreAtRules: ["each", "media", "supports", "include"],
      },
    ],
  },
}
