namespace $.$$ {

	export class $aspirity_account_contact_select extends $.$aspirity_account_contact_select {

		dict() {
			const res = this.$.$aspirity_account_transport.load( 'api/contractorContacts' )
			const list = $aspirity_account_invoice_response_dict( res )
			const dict = Object.fromEntries( list.map( o => Object.values( o ) ) )
			return dict
		}

	}

}
