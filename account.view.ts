namespace $.$$ {

	export class $aspirity_account extends $.$aspirity_account {

		signed() {
			return !!this.$.$aspirity_account_transport.token()
		}

		invoice( id: string ) {
			return this.domain().invoice().Item( id )
		}

		invoice_arg() {
			return this.$.$mol_state_arg.value( 'invoice' )
		}

		pages() {
			if ( !this.signed() ) return [ this.Sign_in() ]

			return [
				this.Browse(),
				... this.invoice_arg() ? [ this.Invoice( this.invoice_arg() ) ] : [],
			]
		}

	}

}
