namespace $ {

	export class $aspirity_account_transport extends $mol_object2 {

		static api_base() {
			return 'https://api.codetabs.com/v1/proxy/?quest=https://helpmate.int.aspirity.com/_next/data/CyYy66KHAhtQN5bEooLAa/'
		}

		@ $mol_mem
		static token( next?: string | null ) {
			return this.$.$mol_state_local.value( 'token' , next )
		}

		@ $mol_mem
		static headers() {
			const headers = {
				'Content-Type': 'application/json',
			}
			
			const token = this.token()
			if( !token ) return headers
			
			return {
				... headers,
				'Authorization': `${token}`,
			}
		}

		@ $mol_action
		static request(
			path: string ,
			method: string ,
			body?: object ,
		) {
			const uri = this.api_base() + path
			const res = $mol_wire_sync( this.$.$mol_fetch ).request( uri , {
				method ,
				headers : this.headers(),
				body: body ? JSON.stringify( body ) : undefined ,
			} )

			if ( res.status === 401 || res.status === 0 ) {
				this.token( null )
			}
			return new $mol_fetch_response( res )
		}

		@ $mol_action
		static load( path : string ) : any {
			const res = this.request( path , 'get' ).json()
			return res
		}

		@ $mol_action
		static save(
			path : string ,
			method : 'post' | 'put' ,
			body : object
		) : any {
			const res = this.request( path , method , body ).json()
			return res
		}

	}

}
