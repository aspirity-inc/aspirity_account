namespace $.$$ {

	export class $aspirity_account_invoice_page extends $.$aspirity_account_invoice_page {

		subject() {
			return this.invoice().value( 'theme' )
		}

		number() {
			return this.invoice().value( 'accountNumber' )
		}

		status() {
			return this.invoice().value( 'status' )
		}

		contractor() {
			return this.invoice().value( 'contractorName' )
		}

		logo() {
			return this.invoice().company()?.logo
		}

		name_full() {
			return this.invoice().company()?.name
		}

		name_short() {
			return this.invoice().company()?.short_name
		}

		address_actual() {
			return this.invoice().company()?.fact_address
		}

		address_reg() {
			return this.invoice().company()?.jur_address
		}

		invoice_title() {
			return `${this.invoice().subject()}`
		}

		auto() {
			this.invoice().load_full()
		}

	}

}
