module.exports = {
	"env": {
		"commonjs": true,
		"browser": true,
		"es6": true,
		"node": true
	},
	"extends": [
		"airbnb-base",
		"plugin:jsdoc/recommended"
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parser": "babel-eslint",
	"plugins": [
		"jsdoc"
	],
	"rules": {
		"no-const-assign": "warn",
		"no-this-before-super": "warn",
		"no-undef": "error",
		"no-unreachable": "warn",
		"no-unused-vars": "warn",
		"no-else-return": 0,
		"no-debugger": 0,
		"no-console": 0,
		"no-invalid-this": 0,
		// "no-useless-constructor": 0,
		"no-underscore-dangle": 0,
		"no-restricted-syntax": 0,
		"no-trailing-spaces": 0,
		"no-multi-spaces": ["error", { ignoreEOLComments: true }],
		"no-continue": 0,
		"no-plusplus": 0,
		"no-unused-expressions": 0,
		"no-return-assign": 0,
		"no-param-reassign": 0,
		"no-empty-function": 0,
		"no-multi-assign": 0,
		"no-mixed-operators": 0,
		"no-use-before-define": ["error", { "functions": false, "classes": true }],
		"no-confusing-arrow": 0,
		"no-cond-assign": ["error", "except-parens"],
		"no-await-in-loop": 0,
		"constructor-super": "warn",
		"valid-typeof": "warn",
		"class-methods-use-this": 0,
		"import/prefer-default-export": 0,
		"import/no-nodejs-modules": 0,
		"import/no-mutable-exports": 0,
		"operator-assignment": 0,
		"operator-linebreak": 0,
		"prefer-const": 0,
		"prefer-arrow-callback": 0,
		"prefer-template": 0, // string templates
		"prefer-spread": 0,
		"eol-last": 0,
		"arrow-parens": 0,
		"arrow-body-style": 0,
		"lines-between-class-members": 0,
		"comma-dangle": 0,
		"object-curly-newline": 0,
		"brace-style": 0,
		"max-classes-per-file": 0,
		"guard-for-in": 0,
		"func-names": 0,
		"wrap-iife": ["warn", "inside"],
		"implicit-arrow-linebreak": 0,
		"function-paren-newline": 0,
		"linebreak-style": 0,
		"quotes": 0,
		"spaced-comment": 0,
		"max-len": ["warn", { "code": 120 }],
		"one-var": 0,
		"one-var-declaration-per-line": 0,
		"dot-location": 0,
		"jsdoc/require-jsdoc": 0,
		"jsdoc/require-description": 0,
		"jsdoc/require-returns": 0,
		"jsdoc/require-returns-description": 0,
		"jsdoc/require-param": 0,
		"jsdoc/require-param-description": 0
	},

	settings: {
		"jsdoc": {
			"tagNamePreference": {
				"returns": "return"
			}
		},
		"import/resolver": {
			node: {},
			webpack: {}
		}
	}
};