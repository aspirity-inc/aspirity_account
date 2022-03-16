namespace $.$$ {

	export class $aspirity_account_browse extends $.$aspirity_account_browse {

		@ $mol_mem
		account_list() {
			return this.$.$aspirity_account_transport.load( 'invoice/list.json' )
		}

		@ $mol_mem
		links() {
			const json = this.account_list()
			console.log(json)
			return []
		}

	}

}
