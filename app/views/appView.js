define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/appTemplate.html',
    'models/pageElement',
    'views/pageShowView',
    'views/sidebarShowView',
    'app'
    ], function($, _, Backbone, AppTemplate, PageElementModel, PageView, SidebarView){
      var AppView = Backbone.View.extend({
        el: '#main',

      template: _.template(AppTemplate),

      events:{
      },

      initialize: function(){
        PageDesigner.Page = new PageElementModel();

        this.pageView = new PageView(PageDesigner.Page);
        this.sidebarView = new SidebarView;
      },

      render: function(){
        this.$el.html(this.template());

        this.assign({
          '.page-contain'             : this.pageView,
          '.sidebar-contain'          : this.sidebarView
        });
        return this;
      },

      toggleLeft: function(){
        $('.sidebar-contain').addClass('toggle-left');
      },

      toggleRight: function(){
        $('.helper-contain').addClass('toggle-right');
      },

      unrender: function(){
        this.unbind();
        this.$el.remove();
        this.undelegateEvents();
      },

      assign : function (selector, view) {
        var selectors;
        if (_.isObject(selector)) {
          selectors = selector;
        }
        else {
          selectors = {};
          selectors[selector] = view;
        }
        if (!selectors) return;
        _.each(selectors, function (view, selector) {
          view.setElement(this.$(selector)).render();
        }, this);
      }


      });

      return AppView;
    });
