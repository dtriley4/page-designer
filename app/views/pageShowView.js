define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/pageShowTemplate.html',
    'views/rowView',
    'predef-layouts',
    ], function($, _, Backbone, pageShowTemplate, RowView){
      var PageShowView = Backbone.View.extend({

        template: _.template(pageShowTemplate),

      events:{
        'click #created-page' : 'applyAction',
      'dragenter #drop-row-0' : 'handleDragEnter',
      'dragover #drop-row-0' : 'handleDragOver',
      'dragleave #drop-row-0' : 'handleDragLeave',
      'drop #drop-row-0' : 'handleDrop'
      },

      initialize: function(incomingPage){
        this.model = incomingPage;
        this.model.bind('change', this.render, this);
        PageDesigner.Vent.bind('remove-draggable', this.removeMoveRows, this);
      },

      render: function(){
        this.$el.html(this.template());
        this.delegateEvents();
        this.renderAll();
        return this;
      },

      applyAction: function(e){
        e.stopPropagation();
        if(PageDesigner.Vent.state == 'edit')
          this.editPageInfo();
        PageDesigner.Vent.state = '';
      },

      addMoveRows: function(){
        this.$('#created-row').each(function(){
          $(this).attr('draggable', true);
          $(this).addClass('activated-border');
          $(this).addClass('moveable');
        });
      },

      removeMoveRows: function(){
        this.$('#created-row').each(function(){
          $(this).attr('draggable', false);
          $(this).removeClass('activated-border');
          $(this).removeClass('moveable');
        });
        this.$('#created-column').each(function(){
          $(this).attr('draggable', false);
          $(this).removeClass('activated-border');
          $(this).removeClass('moveable');
        });
        this.$('#created-content').each(function(){
          $(this).attr('draggable', false);
          $(this).removeClass('activated-border');
          $(this).removeClass('moveable');
        });
      },

      editPageInfo: function(){
        PageDesigner.Vent.trigger('edit-info', this.model);
      },

      clearPage: function(){
        PageDesigner.Page.removeAllChildren();
        this.$('.row-contain').empty();
      },

      handleDragEnter: function(e){
        if (e.preventDefault) {
          e.preventDefault(); 
        }
        var dropClass = localStorage.getItem('dropClass');
        var dropType = localStorage.getItem('dropType');
        if(dropClass == 'layout-type' || dropType == 'created-row'){
          this.$('#drop-row-0').addClass('green');
          this.$('#drop-row-0').addClass('over');
        }

        return false;
      },

      handleDragOver: function(e){
        if (e.preventDefault) {
          e.preventDefault(); 
        }
        return false;
      },

      handleDragLeave: function(){
        this.$('#drop-row-0').removeClass('green');
        this.$('#drop-row-0').removeClass('over');
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
          var childIndexToPlaceBefore = this.model.get('children')[0].get('id');
          var firstChildIndex = this.model.getChild(dropId);
          var secondChildIndex = -1; 
          if(this.model.shiftAddChild(firstChildIndex, secondChildIndex))
            $('#'+childIndexToPlaceBefore).before($('#'+ dropId));
        }
        this.$('#drop-row-0').removeClass('green');
        this.$('#drop-row-0').removeClass('over');
        return false;
      },

      renderOne: function(row){
        this.rowView = new RowView(this.model.get('children')[row], this);
        this.$('.row-contain').append(this.rowView.el);
        this.rowView.render();
      },

      renderAll: function(){
        var children = this.model.get('children');
        for(var row in children){
          this.renderOne(row);
        }
      },

      renderLayout: function(layoutOption){
        var layout = this.selectLayout(layoutOption);
        this.rowView = new RowView(layout, this);
        if(this.model.get('children').length == 0)
          this.model.addChild(this.rowView.model)
        else
          this.model.insertBefore(this.model.get('children')[0], this.rowView.model);
        this.$('.row-contain').prepend(this.rowView.el);
        this.rowView.render();
        this.$('#drop-row-0').empty();
      },

      selectLayout: function(layout){
        switch(layout){
        case 'w':
          return PageDesigner.Page.makeWhole();
          break;
        case 'h':
          return PageDesigner.Page.makeTwoHalves();
          break;
        case 't':
          return PageDesigner.Page.makeThreeThirds();
          break;
        case 'q':
          return PageDesigner.Page.makeFourQuarters();
          break;
        case 'hqq':
          return PageDesigner.Page.makeHalfQuarterQuarter();
          break;
        case 'qhq':
          return PageDesigner.Page.makeQuarterHalfQuarter();
          break;
        case 'qqh':
          return PageDesigner.Page.makeQuarterQuarterHalf();
          break;
        case 't2t':
          return PageDesigner.Page.makeThirdTwoThird();
          break;
        case '2tt':
          return PageDesigner.Page.makeTwoThirdThird();
          break;
        case 'q3q':
          return PageDesigner.Page.makeQuarterThreeQuarter();
          break;
        case '3qq':
          return PageDesigner.Page.makeThreeQuarterQuarter();
          break;
        }
      },


      unrender: function(){
        this.unbind();
        this.$el.remove();
        this.undelegateEvents();
      }

      });

      return PageShowView;
    });
