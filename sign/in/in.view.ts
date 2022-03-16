namespace $.$$ {

	export class $aspirity_account_sign_in extends $.$aspirity_account_sign_in {

		submit() {
			const token = `Basic ${btoa( this.name() + ':' + this.pass() )}`
			this.$.$aspirity_account_transport.token( token )
		}

	}

}
