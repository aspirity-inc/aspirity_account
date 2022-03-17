namespace $.$$ {

	export class $aspirity_account_new extends $.$aspirity_account_new {

		@ $mol_mem
		status_dict() {
			const res = this.$.$aspirity_account_transport.load( 'api/invoice-status' )
			const list = $aspirity_account_invoice_response_dict( res )
			const dict = Object.fromEntries( list.map( o => Object.values( o ) ) )
			return dict
		}

		@ $mol_mem
		contractor_dict() {
			const res = this.$.$aspirity_account_transport.load( 'api/contractor' )
			const list = $aspirity_account_invoice_response_dict( res )
			const dict = Object.fromEntries( list.map( o => Object.values( o ) ) )
			return dict
		}

		@ $mol_mem
		contact_dict() {
			const res = this.$.$aspirity_account_transport.load( 'api/contractorContacts' )
			const list = $aspirity_account_invoice_response_dict( res )
			const dict = Object.fromEntries( list.map( o => Object.values( o ) ) )
			return dict
		}

		@ $mol_mem
		invoice_dict() {
			const res = this.$.$aspirity_account_transport.load( 'api/invoice-type' )
			const list = $aspirity_account_invoice_response_dict( res )
			const dict = Object.fromEntries( list.map( o => Object.values( o ) ) )
			return dict
		}

		@ $mol_mem
		company_dict() {
			const res = this.$.$aspirity_account_transport.load( 'api/company-details' )
			const list = $mol_data_array($aspirity_account_invoice_response_company)(res)
			const dict = Object.fromEntries( list.map( o => [ o._id , o.name ] ) )
			return dict
		}

		@ $mol_mem
		currency_dict() {
			const res = this.$.$aspirity_account_transport.load( 'api/currency' )
			const list = $aspirity_account_invoice_response_dict( res )
			const dict = Object.fromEntries( list.map( o => Object.values( o ) ) )
			return dict
		}


		@ $mol_mem
		row_list( next?: number[] ) {
			return next ?? []
		}

		row_add() {
			const list = this.row_list()
			this.row_list( [ ... list , list.length ] )
		}

		rows() {
			return this.row_list().map( id => this.Row( id ) )
		}

	}

	export class $aspirity_account_new_date extends $.$aspirity_account_new_date {

		format() {
			return 'YYYY-MM-DD'
		}

		trigger_content() {
			return [ this.value_moment()?.toString( this.format() ) ?? this.Icon() ]
		}

		@ $mol_mem
		value( val? : string ) {
			
			const moment = this.value_moment()
			
			if( val === undefined ) return moment?.toString( this.format() ) ?? ''
				
			const moment2 = $mol_try( ()=> val && new $mol_time_moment( val ) ) || null
			if( moment2 instanceof Error ) return val
			
			this.value_moment( moment2! )
			
			return val
		}

	}

}
