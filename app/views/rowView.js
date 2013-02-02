define([
    'jquery',
    'underscore',
    'backbone',
    'views/colView',
    'text!templates/rowTemplate.html',
    ], function($, _, Backbone, ColView, RowTemplate){
      var RowView = Backbone.View.extend({

        template: _.template(RowTemplate),

      events:{
        'click #created-row' : 'applyAction',
      'dragstart #created-row' : 'rowDragStart',
      'dragend #created-row' : 'rowDragEnd',
      'dragenter .drop-row' : 'handleDragEnter',
      'dragover .drop-row' : 'handleDragOver',
      'dragleave .drop-row' : 'handleDragLeave',
      'drop .drop-row' : 'handleDrop'
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
          this.deleteRow();
        }
        if(PageDesigner.Vent.state == 'rearrange'){
          this.parentOf.addMoveRows(); 
        }
        if(PageDesigner.Vent.state == 'edit')
          this.editRowInfo();
      },

      deleteRow: function(){
        if(confirm('Are you sure you\'d like to delete this?')){
          this.parentOf.model.removeChild(this.model.get('id'));
          this.unrender();
        }
        PageDesigner.Vent.state = ' ';
        PageDesigner.Vent.trigger('state-change');
      },

      addMoveRows: function(){
        this.$('#created-row').each(function(){
          $(this).attr('draggable', true);
          $(this).addClass('activated-border');
          $(this).addClass('moveable');
        });
      },

      /* Due to design inconsistency columns wont be moveable
       * 
       */
      moveColumns: function(){
        this.$('#created-column').each(function(){
          $(this).attr('draggable', true);
          $(this).addClass('activated-border');
          $(this).addClass('moveable');
        });
      },

      editRowInfo: function(){
        PageDesigner.Vent.trigger('edit-info', this.model);
      },


      rowDragStart: function(e){
        if(e.originalEvent.target.id == 'created-row'){
          localStorage.setItem('dropClass', e.target.className);
          localStorage.setItem('dropType', e.target.id);
          localStorage.setItem('dropId', e.target.parentElement.id);
          this.$el[0].style.opacity = '0.4';
        }
      },

      handleDragEnter: function(e){
        var dropClass = localStorage.getItem('dropClass');
        var dropType = localStorage.getItem('dropType');
        if(dropClass == 'layout-type' || dropType == 'created-row'){
          this.$('.drop-row').addClass('green');
          this.$('.drop-row').addClass('over');
        }
      },

      handleDragOver: function(e){
        if (e.preventDefault) {
          e.preventDefault(); 
        }
        return false;
      },

      handleDragLeave: function(){
        this.$('.drop-row').removeClass('green');
        this.$('.drop-row').removeClass('over');
      },

      rowDragEnd: function(){
        this.$el[0].style.opacity = '';
      },

      handleDrop: function(e){
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        var dropClass = localStorage.getItem('dropClass');
        var dropType = localStorage.getItem('dropType');
        var dropId = localStorage.getItem('dropId');
        if(dropClass == 'layout-type')
          this.renderLayout(dropType);
        if(dropType == 'created-row'){
          var childIndexToPlaceAfter = this.model.get('id');
          var firstChildIndex = this.parentOf.model.getChild(dropId);
          var secondChildIndex = this.parentOf.model.getChild(childIndexToPlaceAfter); 
          if(this.parentOf.model.shiftAddChild(firstChildIndex, secondChildIndex))
            $('#'+childIndexToPlaceAfter).after($('#'+dropId));
        }
        this.$('.drop-row').removeClass('green');
        this.$('.drop-row').removeClass('over');
        return false;
      },

      renderOne: function(col){
        this.colView = new ColView(this.model.get('children')[col], this);
        this.$('.row-'+this.model.get('position')).append(this.colView.el);
        this.colView.render();
      },

      renderAll: function(){
        var children = this.model.get('children');
        for(var col in children){
          if (children.hasOwnProperty(col)) {
            this.renderOne(col);
          }
        }
      },

      renderLayout: function(layoutOption){
        var layout = this.parentOf.selectLayout(layoutOption);
        this.rowView = new RowView(layout, this.parentOf);
        this.$el.after(this.rowView.el);
        this.parentOf.model.insertAfter(this.model, this.rowView.model);
        this.rowView.render();
      },

      unrender: function(){
        this.unbind();
        this.$el.remove();
        this.undelegateEvents();
      }

      });


      return RowView;
    });
