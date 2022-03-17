namespace $.$$ {

	const { rem, per } = $mol_style_unit

	$mol_style_define( $aspirity_account_browse , {
		
		flex: {
			basis: rem(26),
			shrink: 0,
		},

		Filter: {
			margin: $mol_gap.block,
			zIndex: 1,
			flex: {
				direction: 'column',
			},
		},

		// Select: {
		// 	flex: {
		// 		direction: 'column',
		// 	},
		// },

		Search: {
			width: per(100),
		}

	} )

	$mol_style_define( $aspirity_account_browse_select , {
		Option_label: {
			whiteSpace: 'normal',
		},
	} )

}
