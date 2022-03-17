namespace $ {

	const Rec = $mol_data_record
	const Str = $mol_data_string
	const Arr = $mol_data_array
	const Num = $mol_data_number

	export const $aspirity_account_invoice_response_dict = Arr(Rec({
		_id: Str,
		name: Str,
	}))

	const Res_list_invoice = Rec({
		_id: Str,
		companyName: Str,
		contractorName: Str,
		employeesNames: Arr(Str),
		logo: Str,
		theme: Str,
	})

	const Res_list_filter = Rec({
		companyNames: Arr(Str),
		contractorNames: Arr(Str),
		themes: Arr(Str),
	})

	const Res_list = Rec({
		filterProps: Res_list_filter,
		invoices: Arr(Res_list_invoice)
	})

	const Res_list_page = Rec({
		pageProps: Res_list,
	})

	const Res_invoice_bank = Rec({
		account_name: Str,
		account_number: Num,
		bank_info: Str,
		routing_number: Str,
		swift: Str,
	})

	export const $aspirity_account_invoice_response_company = Rec({
		bank_details: Res_invoice_bank,
		fact_address: Str,
		jur_address: Str,
		logo: Str,
		name: Str,
		short_name: Str,
		_id: Str,
	})

	const Res_invoice = Rec({
		companyDetails: $aspirity_account_invoice_response_company,
		accountNumber: Str,
		contractorName: Str,
		id: Str,
		status: Str,
		theme: Str,
	})

	const Res_invoice_page = Rec({
		pageProps: Res_invoice,
	})

	interface Invoice {
		_id: string
		companyName: string
		contractorName: string
		employeesNames: readonly string[]
		theme: string
		logo: string
		// load lazy
		id?: string
		status?: string
		accountNumber?: string
		companyDetails?: typeof $aspirity_account_invoice_response_company.Value
		// load status
		loaded?: boolean
	}


	type Invoice_dict = Record< string , Invoice >

	export class $aspirity_account_invoice_list extends $mol_store< Invoice_dict > {

		domain(): $aspirity_account_domain {
			throw new Error('Not implemented')
		}

		@ $mol_mem
		data( next?: Invoice_dict ) {
			if( next !== undefined ) return next

			const res = this.$.$aspirity_account_transport.load( '_next/data/CyYy66KHAhtQN5bEooLAa/invoice/list.json' )
			const { pageProps: { filterProps, invoices } } = Res_list_page( res )

			this.filter( filterProps )
			
			const dict: Invoice_dict = {}
			for( const item of invoices ) {
				dict[ item._id! ] = item
			}
			
			return dict
		}

		@ $mol_mem
		filter( next?: typeof Res_list_filter.Value ) {
			return next
		}

		@ $mol_mem
		list() {
			return Object.keys( this.data() ).map(
				key => this.Item( key )
			)
		}

		@ $mol_mem_key
		Item( id : string ) {
			const obj = this.sub( id , this.Invoice( id ) )
			obj.list = $mol_const( this )
			return obj
		}

		@ $mol_mem_key
		Invoice( id: string ) {
			return new $aspirity_account_invoice( this.value( id ) )
		}
		
	}

	export class $aspirity_account_invoice extends $mol_store< Invoice > {

		list(): $aspirity_account_invoice_list {
			return this.$.$mol_fail( new Error( 'Not implemented' ) )
		}

		@ $mol_mem
		load_full() {
			if ( !this.value('loaded') ) {
				const res = this.$.$aspirity_account_transport.load( `_next/data/CyYy66KHAhtQN5bEooLAa/invoice/${this.id()}.json` )
				const { pageProps } = Res_invoice_page( res )
				const merged = Object.assign( {} , this.data(), pageProps, { loaded: true } )
				return this.data( merged )
			}
			return this.data()
		}

		id() {
			return this.value( '_id' )
		}

		company_name() {
			return this.value( 'companyName' )
		}

		contractor_name() {
			return this.value( 'contractorName' )
		}

		subject() {
			return this.value( 'theme' )
		}

		logo() {
			return this.value( 'logo' )
		}

		employee_names() {
			return this.value( 'employeesNames' )
		}

		@ $mol_mem
		company() {
			return this.value( 'companyDetails' )
		}

	}

}
