Ext.regApplication({
	name : 'vocabbuilderapp',

	profiles : {
		phoneBlackberry : function() {
			return Ext.is.Blackberry;
		},
		phoneAndroid : function() {
			return Ext.is.Android;
		},
		tabletPortrait : function() {
			return Ext.is.Tablet && Ext.orientation == 'portrait';
		},
		tabletLandscape : function() {
			return Ext.is.Tablet && Ext.orientation == 'landscape';
		}
	},

	launch : function() {
		this.launched = true;
		this.mainLaunch();
	},

	mainLaunch : function() {
		if (!device || !this.launched) {
			return;
		}
		this.showUI();
	},

	showUI : function() {
		var count = 0;
		var wordlist_size = datax["words"].length - 1;

		var div_end = '</div>';
		var div_question = '<div class="spacer"></div><div class="question">';
		var div_answer = '<div class="spacer"></div><div class="answer">';

		var question_panel = new Ext.Panel({
			html : div_question + datax["words"][count]["word"] + div_end
		});

		var answer_panel = new Ext.Panel({
			showAnimation : 'flip',
			hidden : true
		});

		var back_button = new Ext.Button({
			text : 'Back',
			ui : 'back',
			disabled : true,
			handler : function() {
				show_button.enable();
				answer_panel.setVisible(false);
				question_panel.update(div_question + datax["words"][--count]["word"] + div_end);
				if (count == 0) {
					back_button.disable();
				}
				if (count == wordlist_size) {
					next_button.disable();
				} else {
					next_button.enable();
				}
			}
		});

		var next_button = new Ext.Button({
			text : 'Next',
			ui : 'forward',
			handler : function() {
				show_button.enable();
				answer_panel.setVisible(false);
				question_panel.update(div_question + datax["words"][++count]["word"] + div_end);
				if (count > 0) {
					back_button.enable();
				}
				if (count == wordlist_size) {
					next_button.disable();
				}
			}
		});

		var show_button = new Ext.Button({
			text : 'Show',
			ui : 'normal',
			handler : function() {
				show_button.disable();
				answer_panel.update(div_answer + datax["words"][count]["meaning"] + div_end);
				answer_panel.setVisible(true);
			}
		});

		var toolbar = new Ext.Toolbar({
			dock : 'bottom',
			items : [ back_button, {
				xtype : 'spacer'
			}, show_button, {
				xtype : 'spacer'
			}, next_button ]
		});

		var panel = new Ext.Panel({
			fullscreen : true,
			layout : 'vbox',
			cls : 'base',
			listeners : {
				orientationchange : function(thisPnl, orientation, width, height) {
				}
			},
			items : [ question_panel, answer_panel ],
			dockedItems : [ toolbar ]
		});
	}
});