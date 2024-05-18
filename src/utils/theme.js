export const muiCustomTheme = {
	button: {
		styles: {
			base: {
				initial: {
					textTransform: "none",
				},
			},
		},
	},
	select: {
		styles: {
			base: {
				container: {
					minWidth: "min-w-[50px]",
				},
			},
			variants: {
				static: {
					sizes: {
						md: {
							select: {
								pt: "pt-1.5",
								pb: "pb-1.5",
							},
						},
					},
				},
			},
		},
	},
};
