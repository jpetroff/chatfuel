(function(w){
"use strict";
// File /Users/john/SyncDocs/reps/chatfuel/src/js/preamble.js

w.Components = {}
// End of /Users/john/SyncDocs/reps/chatfuel/src/js/preamble.js
})(window);
(function(w){
"use strict";
// File /Users/john/SyncDocs/reps/chatfuel/src/components/popup.js

w.Components['popup-modal'] = {
	template: "<transition name=modal><div class=popup-modal><div class=popup-modal__wrapper @click.stop.self=\"$emit(\'close\')\"><div class=popup-modal__container><div class=popup-modal__header><slot name=header>default header</slot></div><div class=popup-modal__body><slot name=body>default body</slot></div><div class=popup-modal__footer><slot name=footer>default footer <button class=popup-modal__default-button @click=\"$emit(\'close\')\">OK</button></slot></div></div></div></div></transition>"
}

// End of /Users/john/SyncDocs/reps/chatfuel/src/components/popup.js
})(window);
(function(w){
"use strict";
// File /Users/john/SyncDocs/reps/chatfuel/src/components/text-field.js

w.Components['text-field'] = {
	template: '<div class=text-field :class=\"{\n	\'text-field_error\': validator.$error,\n	\'text-field_has-input\': focus || value\n}\"><div class=disabled-overlay></div><input :value=value @input=updateValue($event.target.value) @focus=\"focus = true\" @blur=\"focus = false\" type=text class=text-field__input id=text-field-field__destination name=destination><label class=text-field__label for=text-field-field__destination>{{message}}</label></div>',
	props: [
		'label',
		'label-error',
		'value',
		'validator'
	],
	created: function() {
		this.triggerError = _.debounce(_.bind(this.validator.$touch, this), 500)
	},
	data: function() {
		return {
			focus: false
		}
	},
	computed: {
		message: function() {
			if (this.validator.$error) {
				return this.labelError
			} else {
				return this.label
			}
		}
	},
	methods: {
		updateValue: function(value) {
			this.validator.$reset()
			this.$emit('input', value)
			this.triggerError()
		}
	}
}

// End of /Users/john/SyncDocs/reps/chatfuel/src/components/text-field.js
})(window);
(function(w){
"use strict";
// File /Users/john/SyncDocs/reps/chatfuel/src/js/main.js

w.App = new Vue({
	data: {
		isOpen: false,
		isReady: false,
		currentStep: 0,
		currentMessage: 0,
		fbpage: null,
		template: null,
		skipConnect: false,
		planPaid: false,
		skipPro: false,
		showTyping: true,
		connectedFbpage: false
	},
	mounted: function() {
		this.bd = document.getElementById('backdrop');
		this.botInterface = document.getElementById('bot-interface');
		this.dashboard = document.getElementById('dashboard-mockup');
		this.isReady = true;
		setTimeout(_.bind(function(){
			// this.isOpen = true;
			this.$el.classList.remove('hide');
			this.bd.classList.remove('hide');
			setTimeout(_.bind(function () {
				this.routeIntro();
			}, this), 200);
		}, this), 500);
		
		// this.routeIntro();
	},
	methods: {
		close: function() {
			this.isOpen = false;
			this.$el.classList.add('hide');
			this.bd.classList.add('hide');
		},
		_showItem: function(step, message) {
			var result = false;
			if(this.skipConnect && step == 1) {
				result = false;
			} else if(step == this.currentStep && message <= this.currentMessage) {
				result = true;
			} else if (step < this.currentStep) {
				result = true;
			}
			// console.log(result);
			return result;
		},

		// routes
		_afterRoute: function() {
			this.$nextTick(_.bind(function() {
				if(window.outerWidth < 698) {
					this.$refs['scroll-container'].scrollTo(0, 999999);
				} else {
					this.$el.scrollTo(0, 999999);
				}
			}, this));
		},
		_sequenceMessage: function(i, max, _addTime) {
			_addTime = parseInt(_addTime);
			var addTime = (_addTime && _addTime != 0) ? _addTime : 0;
			if(i == 0) addTime = 0;
			i++;
			if(i > max) return;

			this.showTyping = true;
			this._afterRoute();
			

			setTimeout(_.bind(function() {
				this.showTyping = false;
				this.currentMessage = i;
				this._afterRoute();
				setTimeout(_.bind(function(){
					this._sequenceMessage(i, max, _addTime);
					this._afterRoute();
				}, this), 0);
			},this),1200 + addTime);
		},
		routeIntro: function() {
			this._sequenceMessage(0, 2, 1200);
		},
		routeSkip: function() {
			this.skipConnect = true;
			this.routePlan();
		},
		routeTemplate: function() {
			this.currentStep = 1;
			this.currentMessage = 0;
			this._sequenceMessage(0, 1);
			// this._afterRoute();
		},
		routePlan: function() {
			this.currentStep = 2;
			this.currentMessage = 0;
			this._sequenceMessage(0, 2, 1200);
		},
		routeFinal: function() {
			this.currentStep = 3;
			this.currentMessage = 0;
			this._sequenceMessage(0, 1);
			setTimeout(_.bind(function() {
				this.close();
				if(!this.skipConnect) {
					this.botInterface.classList.remove('hide');
					this.dashboard.classList.add('hide');
				}
			},this), 2000);
		},


		// user actions
		choosePage: function(el) {
			if(this.currentStep != 0) return;
			var pageName = el.getElementsByClassName('caption')[0].textContent;

			this.fbpage = pageName;
			setTimeout(_.bind(function() {
				this.connectedFbpage = true;
			},this), 4000);
			this.routeTemplate();
		},
		chooseTemplate: function(el) {
			if(this.currentStep != 1) return;

			var templName = el.getElementsByClassName('caption')[0].textContent;

			this.template = templName;
			this.routePlan();
		},
		choosePlan(isPro) {
			if(isPro == false) {
				this.skipPro = true;
				this.planPaid = false;
			} else {
				this.skipPro = false;
				this.planPaid = true;
			}

			this.routeFinal();
		}
	}
});

w.App.$mount('#app');
// End of /Users/john/SyncDocs/reps/chatfuel/src/js/main.js
})(window);