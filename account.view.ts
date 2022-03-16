namespace $.$$ {

	export class $aspirity_account extends $.$aspirity_account {

		signed() {
			return !!this.$.$aspirity_account_transport.token()
		}

		pages() {
			if ( !this.signed() ) return [ this.Sign_in() ]

			return [ this.Browse() ]
		}

	}

}
