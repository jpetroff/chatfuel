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
		document.body.style.position = 'fixed';
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
				return this.$refs['scroll-container'].scrollTo(0, 999999);
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
			this._sequenceMessage(0, 3, 0);
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
			var _addTime = (this.fbpage == 'Script Doctor') ? 0 : 500;
			this._sequenceMessage(0, 2, _addTime);
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
					document.body.style.position = 'static';
				}
			},this), 2500);
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