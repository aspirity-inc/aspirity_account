namespace $.$$ {

	export class $aspirity_account extends $.$aspirity_account {

		signed() {
			return !!this.$.$aspirity_account_transport.token()
		}

		@ $mol_mem_key
		invoice( id: string ) {
			return this.domain().invoice().Item( id )
		}

		invoice_arg() {
			return this.$.$mol_state_arg.value( 'invoice' )
		}

		filter_enabled() {
			return this.$.$mol_state_arg.value( 'filter' ) !== null
		}

		new_arg() {
			return this.$.$mol_state_arg.value( 'new' ) !== null
		}

		contractor_arg() {
			return this.$.$mol_state_arg.value( 'contractor' ) !== null
		}

		contact_arg() {
			return this.$.$mol_state_arg.value( 'contact' ) !== null
		}

		@ $mol_mem
		pages() {
			if ( !this.signed() ) return [ this.Sign_in() ]

			return [
				this.Browse(),
				... this.new_arg() ? [ this.New() ] : [],
				... this.invoice_arg() && !this.new_arg() ? [ this.Invoice( this.invoice_arg() ) ] : [],
				... this.contractor_arg() ? [ this.Contractor() ] : [],
				... this.contact_arg() ? [ this.Contact() ] : [],
			]
		}

	}

}
