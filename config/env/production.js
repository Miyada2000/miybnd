'use strict';

module.exports = {
	db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/miybnd',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.min.css',
				'public/lib/mdi/css/materialdesignicons.min.css',
				'public/lib/ng-sortable/dist/dist/ng-sortable.min.css',
				'public/lib/ng-sortable/dist/dist/ng-sortable.style.min.css'
		
			],
			js: [
				'public/lib/jquery/dist/jquery.min.js', 
				'public/lib/angular/angular.min.js',
				'public/lib/angular-resource/angular-resource.js', 
				'public/lib/angular-cookies/angular-cookies.js', 
				'public/lib/angular-animate/angular-animate.js', 
				'public/lib/angular-aria/angular-aria.js',
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.min.js',
				'public/lib/angular-ui-utils/ui-utils.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',			
				'public/lib/angular-busy/dist/angular-busy.js',
			    'public/lib/angular-material/angular-material.js',
				'public/lib/ng-mfb/src/mfb-directive.js',
				'public/lib/ng-sortable/dist/ng-sortable.min.js',
				'public/lib/moment/min/moment.min.js',
				'public/lib/angular-moment/angular-moment.min.js',
				'public/lib/spin.js/spin.js',
				'public/lib/angular-spinner/angular-spinner.min.js',
				'public/lib/angular-loading-spinner/angular-loading-spinner.js',
				'public/lib/ng-file-upload/ng-file-upload.min.js'
			]
		},
		//, 'public/modules/**/css/*.css'
		css: ['public/dist/application.min.css'],
		js: 'public/dist/application.min.js'

	},
	/*spotify: {
        clientID: '5063d7fc578d4b928e96e050790860c9' || 'APP_ID',
        clientSecret: 'f6f4758ea04942668385ab0d4953e014' || 'APP_SECRET',
        callbackURL: "/auth/spotify/callback"
    },
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},*/
    
    spotify: {
        clientID: '5063d7fc578d4b928e96e050790860c9' || 'APP_ID',
        clientSecret: 'f6f4758ea04942668385ab0d4953e014' || 'APP_SECRET',
        callbackURL: "/auth/spotify/callback"
    },
	facebook: {
		clientID: '162584200776112' || 'APP_ID',
		clientSecret: '99cbd345ef5002f60e56e89b9d5eb4a9' || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
    
    
    
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
