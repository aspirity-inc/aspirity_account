namespace $.$$ {

	export class $aspirity_account_browse extends $.$aspirity_account_browse {

		@ $mol_mem
		links() {
			const list = this.domain().invoice().list()
			const filter = list.filter( $mol_match_text( this.query() , item => [ item.company_name() , item.contractor_name() , item.subject() ] ) )
			return filter.map( item => this.Link( item.id() ) )
		}

		@ $mol_mem_key
		invoice_link( id: string ) {
			return id
		}

		@ $mol_mem_key
		invoice_title( id: string ) {
			const invoice = this.domain().invoice().Item( id )
			return `${invoice.company_name()}: ${invoice.subject()} - ${invoice.contractor_name()}`
		}

		sign_out() {
			this.$.$aspirity_account_transport.token( null )
		}

		page_body() {
			return [
				... this.filter() ? [ this.Filter() ] : [],
				this.List(),
			]
		}

		query(next?: any) {
			return this.$.$mol_state_arg.value( 'filter' , next ) ?? ''
		}

		suggests() {
			const list = this.domain().invoice().list()

			const words = list.map( item => {
				const { companyName, contractorName, theme } = item.data()
				const fields = [ companyName, contractorName, theme ].map( val => val.trim().toLowerCase().split( /\s+/ ) )
				return fields.flat()
			} ).flat()

			const res = Array.from(new Set(words)).filter( word => {
				const tags = this.query().toLowerCase().trim().split( /\s+/ ).filter( tag => tag )
				if ( tags.includes( word ) ) return false
				return tags.some( tag => word.includes( tag ) )
			} )

			return res
		}

		filter_subject(next?: any) {
			return this.$.$mol_state_arg.value( 'filter_subject' , next ) ?? ''
		}

		filter_company(next?: any) {
			return this.$.$mol_state_arg.value( 'filter_company' , next ) ?? ''
		}

		filter_contractor(next?: any) {
			return this.$.$mol_state_arg.value( 'filter_contractor' , next ) ?? ''
		}

		filter_subject_options() {
			return this.domain().invoice().filter()?.themes ?? []
		}

		filter_company_options() {
			return this.domain().invoice().filter()?.companyNames ?? []
		}
		
		filter_contractor_options() {
			return this.domain().invoice().filter()?.contractorNames ?? []
		}
	}

	export class $aspirity_account_browse_select extends $.$aspirity_account_browse_select {
		trigger_content() {
			return [
				... !this.value() ? [ this.title() , this.Trigger_icon() ] : [ this.Clear() ],
				... this.option_content( this.value() ),
			] as readonly $mol_view_content[]
		}

		clear( event: Event ) {
			event.preventDefault()
			this.value( '' )
		}
	}

}
