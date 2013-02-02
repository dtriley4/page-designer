define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/sidebarShowTemplate.html',
    'text!templates/infoPanel/labelTemplate.html',
    'views/editInfoView'
    ], function($, _, Backbone, SidebarShowTemplate, LabelTemplate, EditInfoView){
      var SidebarShowView = Backbone.View.extend({

        template: _.template(SidebarShowTemplate),
      labelTemplate: _.template(LabelTemplate),


      events:{
        'dragstart .layout-type' : 'handleDragStart',
      'dragstart .widget-type' : 'handleDragStart',
      'click .tool-type' : 'handleClickTool',
      'click #save-page' : 'savePage',
      'dragenter .layout-type' : 'handleDragEnter',
      'dragover .layout-type' : 'handleDragOver',
      'dragleave .layout-type' : 'handleDragLeave',
      'dragend .widget-type' : 'handleDragEnd',
      'dragend .layout-type' : 'handleDragEnd',
      'drop .layout-type' : 'handleDrop'
      },

      initialize: function(){
        PageDesigner.Vent.bind('state-change', this.renderLabel, this);
        PageDesigner.Vent.bind('edit-info', this.renderEditInfo, this);
      },

      render: function(){
        this.$el.html(this.template(PageDesigner));
        this.renderActivityPanel();
        return this;
      },

      renderActivityPanel: function(){
        this.renderLabel();
      },

      renderLabel: function(){
        if(this.$label) this.$label.remove();

        this.$label = $(this.labelTemplate({
          label : PageDesigner.Vent.state
        }));
        this.$('#state-label').html(this.$label);
        return this;
      },

      renderEditInfo: function(targetDiv){
        var editInfoView = new EditInfoView({model: targetDiv});
        this.$('#edit-information').append(editInfoView.el)
          editInfoView.render();
      },

      handleDragStart: function(e){
        if(e.originalEvent.target.className == 'layout-type')
          $('.drop-row').addClass('over');
        if(e.originalEvent.target.className == 'widget-type')
          $('.drop-content').addClass('over');
        e.originalEvent.dataTransfer.effectAllowed = 'move';
        e.originalEvent.dataTransfer.setData('text/plain', e.target.id);
        localStorage.setItem('dropClass', e.target.className);
        localStorage.setItem('dropType', e.target.id);
      },

      handleClickTool: function(e){
        if(PageDesigner.Vent.state == e.target.id){
          PageDesigner.Vent.state = ' ';
          PageDesigner.Vent.trigger('state-change');
        }
        else{
          PageDesigner.Vent.state = e.target.id;
          PageDesigner.Vent.trigger('state-change');
        }
        PageDesigner.Vent.trigger('remove-draggable');
      },

      savePage: function(){
        var json = JSON.parse(PageDesigner.Page.toJsonString());
        var data = { json: json };
        var url = $('#page-form').attr("action");
        var authenticity_token = $('input[name="authenticity_token"]').attr('value');
        console.log("Data!", authenticity_token, "\n\n", json);

        $.ajax({
          type: "PUT",
          url: url+".json",
          headers: { 
            'X-CSRF-Token': authenticity_token
          },
          contentType: "application/json",
          data: JSON.stringify(data)
        });

      },
      handleDragEnter: function(){
      },

      handleDragOver: function(e){
        if (e.preventDefault) {
          e.preventDefault(); 
        }
        return false;
      },

      handleDragLeave: function(){
      },

      handleDragEnd: function(){
        $('.drop-row').removeClass('over');
        $('.drop-content').removeClass('over');
      },

      handleDrop: function(e){
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        return false;
      },

      unrender: function(){
        this.unbind();
        this.$el.remove();
        this.undelegateEvents();
      }

      });

      return SidebarShowView;
    });
