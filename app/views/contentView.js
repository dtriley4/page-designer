define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/contentTemplate.html',
    'models/pageElement',
    'markdown'
    ], function($, _, Backbone, ContentTemplate, PageElementModel){
      var ContentView = Backbone.View.extend({

        template: _.template(ContentTemplate),

      events:{
        'click #created-content' : 'applyAction',
      'dblclick .content' : 'editContent',
      'blur .edit'      : 'closeInput',
      'dragstart #created-content' : 'contentDragStart',
      'dragenter .drop-content' : 'handleDragEnter',
      'dragover .drop-content' : 'handleDragOver',
      'dragleave .drop-content' : 'handleDragLeave',
      'drop .drop-content' : 'handleDrop'
      },

      initialize: function(model, parentOf){
        this.model = model;
        this.parentOf = parentOf;
        this.model.bind('change', this.render, this);
        PageDesigner.Vent.bind('uploaded-image', this.uploadedImage, this);
        PageDesigner.Vent.bind('cancel-upload', this.render, this);
      },

      render: function(){
        this.$el.html(this.template(this.model.attributes));
        this.input = this.$('.edit');
        this.delegateEvents();
        return this;
      },

      applyAction: function(e){
        e.stopPropagation();
        if(PageDesigner.Vent.state == 'delete'){
          this.deleteCon();
        }
        if(PageDesigner.Vent.state == 'rearrange'){
          this.parentOf.moveContent();
        }
        if(PageDesigner.Vent.state == 'edit')
          this.editConInfo();
      },

      editConInfo: function(){
        PageDesigner.Vent.trigger('edit-info', this.model);
      },

      editContent: function(e){
        this.$el.addClass('editing');
        this.input.focus();
      },

      closeInput: function(){
        var value = this.input.val();
        this.model.set({content: value});
        this.$el.removeClass("editing");
      },

      deleteCon: function(){
        if(confirm('Are you sure you\'d like to delete this?')){
          this.parentOf.model.removeChild(this.model.get('id'));
          this.unrender();
        }
        PageDesigner.Vent.state = ' ';
        PageDesigner.Vent.trigger('state-change');
      },

      contentDragStart: function(e){
        if(e.target.className == "" && e.target.id == "" && e.target.parentElement.id == ""){
          localStorage.setItem('dropClass', e.target.parentElement.parentElement.className);
          localStorage.setItem('dropType', e.target.parentElement.parentElement.id);
          localStorage.setItem('dropId', e.target.parentElement.parentElement.parentElement.id);
        }
        else{
          localStorage.setItem('dropClass', e.target.className);
          localStorage.setItem('dropType', e.target.id);
          localStorage.setItem('dropId', e.target.parentElement.id);
        }
        if(localStorage.getItem('dropType') == 'created-content'){
          //this.$el[0].style.opacity = '0.4';
        }
      },

      handleDragEnter: function(e){
        var dropClass = localStorage.getItem('dropClass');
        var dropType = localStorage.getItem('dropType');
        if(dropClass == 'widget-type' || dropType == 'created-content'){
          this.$('.drop-content').addClass('green');
          this.$('.drop-content').addClass('over');
        }
      },

      handleDragOver: function(e){
        if (e.preventDefault) {
          e.preventDefault(); 
        }
        return false;
      },

      handleDragLeave: function(){
        this.$('.drop-content').removeClass('green');
        this.$('.drop-content').removeClass('over');
      },

      handleDrop: function(e){
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
            newContent.set('content', '![Singapore!](assets/images/singapore.jpg "Singapore")');
          if(dropType == 'custom')
            newContent.set('content', '####Custom Content');
          this.parentOf.model.insertAfter(this.model, newContent);
          this.parentOf.render();
        }
        if(dropType == 'created-content'){
          var childIndexToPlaceAfter = this.model.get('id');
          var firstChildIndex = this.parentOf.model.getChild(dropId);
          var secondChildIndex = this.parentOf.model.getChild(childIndexToPlaceAfter); 
          if(this.parentOf.model.shiftAddChild(firstChildIndex, secondChildIndex))
            $('#'+childIndexToPlaceAfter).after($('#'+dropId));
        }
        $('.drop-content').removeClass('green');
        $('.drop-content').removeClass('over');
      },

      uploadedImage: function(){
        this.parentOf.render();
      },

      unrender: function(){
        this.unbind();
        this.$el.remove();
        this.undelegateEvents();
      }

      });


      return ContentView;
    });
