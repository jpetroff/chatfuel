<style lang="less">
	
	.popup-modal {
		position: fixed;
		z-index: 9998;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		display: table;
		transition: opacity .3s ease;
		box-sizing: border-box;
		
		&__wrapper {
			display: flex;
			position: absolute;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			overflow-y: auto;
			padding: 30px 0;
		}

		&__container {
			width: 300px;
			padding: 20px 30px;
			background-color: #fff;
			border-radius: 2px;
			box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
			transition: all .3s ease;
			font-family: Helvetica, Arial, sans-serif;
			margin: auto;
			min-height: 600px;
		}
		
		&__header h3 {
			margin-top: 0;
			color: #42b983;
		}
		
		&__body {
			margin: 20px 0;
		}
		
		&__default-button {
			float: right;
		}
	}
	
	/*
	 * The following styles are auto-applied to elements with
	 * transition="modal" when their visibility is toggled
	 * by Vue.js.
	 *
	 * You can easily play with the modal transition by editing
	 * these styles.
	 */
	
	.modal-enter {
		opacity: 0;
	}
	
	.modal-leave-active {
		opacity: 0;
	}
	
	/*.modal-enter .popup-modal__container,*/
	/*.modal-leave-active .popup-modal__container {*/
		/*-webkit-transform: scale(1.1);*/
		/*transform: scale(1.1);*/
	/*}*/
	
	.modal-enter .popup-modal__container,
	.modal-leave-active .popup-modal__container {
		transform: translateY(20px);
		-webkit-transform: translateY(20px);
	}
</style>

<template>
	<transition name="modal">
		<div class="popup-modal" >
			<div class="popup-modal__wrapper" @click.stop.self="$emit('close')">
				<div class="popup-modal__container">
					
					<div class="popup-modal__header">
						<slot name="header">
							default header
						</slot>
					</div>
					
					<div class="popup-modal__body">
						<slot name="body">
							default body
						</slot>
					</div>
					
					<div class="popup-modal__footer">
						<slot name="footer">
							default footer
							<button class="popup-modal__default-button" @click="$emit('close')">
								OK
							</button>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
w.Components['popup-modal'] = {
	template: "<%=template%>"
}
</script>