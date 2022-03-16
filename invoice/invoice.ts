namespace $ {

	const Rec = $mol_data_record
	const Str = $mol_data_string
	const Arr = $mol_data_array
	const Num = $mol_data_number

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

	const Res_invoice_company = Rec({
		bank_details: Res_invoice_bank,
		fact_address: Str,
		jur_address: Str,
		logo: Str,
		name: Str,
		short_name: Str,
		_id: Str,
	})

	const Res_invoice = Rec({
		companyDetails: Res_invoice_company,
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
		// Load lazy
		id?: string
		status?: string
		accountNumber?: string
		companyDetails?: typeof Res_invoice_company.Value
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

			const res = this.$.$aspirity_account_transport.load( 'invoice/list.json' )
			const { pageProps: { filterProps, invoices } } = Res_list_page( res )
			
			const dict: Invoice_dict = {}
			for( const item of invoices ) {
				dict[ item._id! ] = item
			}
			
			return dict
		}

		@ $mol_mem_key
		load_full( id: string ) {
			const { [id]: item , ...dict } = this.data()
			if ( !item.loaded ) {
				const res = this.$.$aspirity_account_transport.load( `invoice/${id}.json` )
				const { pageProps } = Res_invoice_page( res )
				const merged = Object.assign( item , pageProps, { loaded: true } )
				this.data({ ... dict , [id]: merged })
			}
		}
		
		@ $mol_mem
		list() {
			return Object.keys( this.data() ).map(
				key => this.Item( key )
			)
		}

		@ $mol_mem_key
		Item( id : string ) {
			const obj = this.sub( id , new $aspirity_account_invoice( this.data()[ id ] ) )
			obj.list = $mol_const( this )
			return obj
		}
		
	}

	export class $aspirity_account_invoice extends $mol_store< Invoice > {

		list(): $aspirity_account_invoice_list {
			return this.$.$mol_fail( new Error( 'Not implemented' ) )
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

		theme() {
			return this.value( 'theme' )
		}

		logo() {
			return this.value( 'logo' )
		}

		employee_names() {
			return this.value( 'employeesNames' )
		}

	}

}
