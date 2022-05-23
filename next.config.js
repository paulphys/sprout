const removeImports = require("next-remove-imports")();

module.exports = removeImports({
	async rewrites() {
		return [
			{
				source: "/drives/:id/:folderId*",
				destination: "/drives/:id",
			},
		];
	},
	experimental: { esmExternals: true },
});
