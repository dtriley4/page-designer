window.PageDesigner = {
  Vent: {},
};

require.config({
  baseUrl: "app",
  paths: {
    'jquery':               'lib/jquery/jquery-1.7.1',
  'underscore':           'lib/underscore/underscore-min',
  'backbone':             'lib/backbone/backbone',
  'text':                 'lib/require/text',
  'templates': 	          '../app/templates',
  'jquery-ui':            'lib/jquery-ui/jquery-ui',
  'modernizr' :           'lib/foundation/modernizr.foundation',
  'jquery-reveal':        'lib/foundation/jquery.foundation.reveal',
  'jquery-forms':         'lib/foundation/jquery.foundation.forms',
  'foundation-accordion': 'lib/foundation/jquery.foundation.accordion',
  'offcanvas':            'lib/foundation/offcanvas',
  'numToAlpha':           'javascript/numToAlpha',
  'page':                 'page_api',
  'predef-layouts':       'predef_layouts',
  'extend':               'javascript/extend',
  'backbone-nested':      'lib/backbone/backbone-nested',
  'markdown' :            'lib/markdown/markdown',
  'app' :                 'lib/foundation/app',
  'ajax-uploader' :       'lib/file-uploader/ajaxupload'
  },
  shim: {
    'app' : ['foundation-accordion'],
    'foundation-accordion' : ['jquery'],
    'jquery' : ['modernizr'],
    'ajax-uploader' : ['jquery'],
    'backbone-nested' : ['backbone'],
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
  }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'views/appView'
    ], function($, _, Backbone, AppRouter, AppView) {
      PageDesigner.Vent = _.extend({}, Backbone.Events);
      PageDesigner.$ = $;

      AppRouter.initialize();
      var appView = new AppView();
      appView.render();
    });

