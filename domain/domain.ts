namespace $ {

	export class $aspirity_account_domain extends $mol_object2 {

		@ $mol_mem
		invoice() {
			const obj = new $aspirity_account_invoice_list
			obj.domain = $mol_const( this )
			return obj
		}

	}

}
