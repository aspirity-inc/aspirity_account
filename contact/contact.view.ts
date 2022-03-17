namespace $.$$ {

	export class $aspirity_account_contact extends $.$aspirity_account_contact {

		submit() {
			const obj = {
				name: this.name(),
				email: this.email(),
				phone: this.phone(),
				comment: this.comment(),
			}
			this.$.$aspirity_account_transport.save( 'api/contractorContacts' , 'post' , obj )
			this.enabled( false )
		}


	}

}
