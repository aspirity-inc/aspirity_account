namespace $.$$ {

	export class $aspirity_account_browse extends $.$aspirity_account_browse {

		@ $mol_mem
		links() {
			const list = this.domain().invoice().list()
			return list.map( item => this.Link( item.id() ) )
		}

		@ $mol_mem_key
		invoice_link( id: string ) {
			return id
		}

		@ $mol_mem_key
		invoice_title( id: string ) {
			const invoice = this.domain().invoice().Item( id )
			return `${invoice.theme()}: ${invoice.contractor_name()} - ${invoice.company_name()}`
		}

	}

}
