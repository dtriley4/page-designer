define([
    'jquery',
    'underscore',
    'backbone',
    'views/contentView',
    'text!templates/colTemplate.html',
    'models/pageElement'
    ], function($, _, Backbone, ContentView, ColTemplate, PageElementModel){
      var ColView = Backbone.View.extend({

        template: _.template(ColTemplate),

      events:{
        'click #created-column' : 'applyAction',
      'dragenter #drop-content-0' : 'dropZoneDragEnter',
      'dragover #drop-content-0' : 'dropZoneDragOver',
      'dragleave #drop-content-0' : 'dropZoneDragLeave',
      'drop #drop-content-0' : 'dropZoneDrop',
      },

      initialize: function(model, parentOf){
        this.model = model;
        this.parentOf = parentOf;
        this.model.bind('change', this.render, this);
      },

      render: function(){
        this.$el.html(this.template(this.model.attributes));
        this.delegateEvents();
        this.renderAll();
        return this;
      },

      applyAction: function(e){
        e.stopPropagation();
        if(PageDesigner.Vent.state == 'delete'){
          this.deleteCol();
        }
        if(PageDesigner.Vent.state == 'edit')
          this.editColInfo();
      },

      deleteCol: function(){
        if(confirm('Are you sure you\'d like to delete this?')){
          this.parentOf.model.removeChild(this.model.get('id'));
          this.unrender();
          this.parentOf.render();
        }
        PageDesigner.Vent.state = ' ';
        PageDesigner.Vent.trigger('state-change');
      },

      moveContent: function(){
        this.$('#created-content').each(function(){
          $(this).attr('draggable', true);
          $(this).addClass('activated-border');
          $(this).addClass('moveable');
        });
      },

      editColInfo: function(){
        PageDesigner.Vent.trigger('edit-info', this.model);
      },

      dropZoneDragEnter: function(e){
        if (e.preventDefault) {
          e.preventDefault(); 
        }
        var dropClass = localStorage.getItem('dropClass');
        var dropType = localStorage.getItem('dropType');
        if(dropClass == 'widget-type' || dropType == 'created-content'){
          this.$('#drop-content-0').addClass('green');
          this.$('#drop-content-0').addClass('over');
        }
      },

      dropZoneDragOver: function(e){
        if (e.preventDefault) {
          e.preventDefault(); 
        }
        return false;
      },

      dropZoneDragLeave: function(){
        this.$('#drop-content-0').removeClass('green');
        this.$('#drop-content-0').removeClass('over');
      },

      dropZoneDrop: function(e){
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        var dropClass = localStorage.getItem('dropClass');
        var dropType = localStorage.getItem('dropType');
        var dropId = localStorage.getItem('dropId');
        if(dropClass == 'widget-type'){
          var newContent = new PageElementModel({tag: 'div', htmlClass:'content'});
          if(dropType == 'text')
            newContent.set('content', '####New Default Content from drop');
          if(dropType == 'media')
            newContent.set('content', '![Singapore!](/assets/singapore.jpg "Singapore")');
          if(dropType == 'custom')
            newContent.set('content', '####Custom Content');
          if(this.model.get('children').length == 0)
            this.model.addChild(newContent);
          else
            this.model.insertBefore(this.model.get('children')[0], newContent);
          this.render();
        }
        if(dropType == 'created-content'){
          var childIndexToPlaceBefore = this.model.get('children')[0].get('id');
          var firstChildIndex = this.model.getChild(dropId);
          var secondChildIndex = -1; 
          if(this.model.shiftAddChild(firstChildIndex, secondChildIndex))
            $('#'+childIndexToPlaceBefore).before($('#'+ dropId));
        }
        this.$('#created-column').removeClass('green');
        this.$('#drop-content-0').removeClass('green');
        this.$('#drop-content-0').removeClass('over');
      },

      renderOne: function(con){
        this.contentView = new ContentView(this.model.get('children')[con], this);
        this.$('.col-'+this.model.get('position')).append(this.contentView.el);
        this.contentView.render();
      },

      renderAll: function(){
        var children = this.model.get('children');
        for(var con in children){
          if (children.hasOwnProperty(con)) {
            this.renderOne(con);
          }
        }
      },

      unrender: function(){
        this.$el.remove();
        this.unbind();
        this.undelegateEvents();
      }

      });


      return ColView;
    });
