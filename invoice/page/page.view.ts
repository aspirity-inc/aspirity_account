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

		// logo() {
		// 	return this.invoice().value( 'companyDetails' ).logo
		// }

		auto() {
			this.domain().invoice().load_full( this.invoice().id() )
		}

	}

}
