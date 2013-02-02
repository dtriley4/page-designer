define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/infoPanel/editInfoForm/formTemplate.html',
    'text!templates/infoPanel/classInputTemplate.html',
    'text!templates/infoPanel/idInputTemplate.html'
    ], function($, _, Backbone, EditInfoTemplate, classInputTemplate, idInputTemplate){
      var EditInfoView = Backbone.View.extend({

        template: _.template(EditInfoTemplate),
        classInputTemplate: _.template(classInputTemplate),
        idInputTemplate: _.template(idInputTemplate),

        
      events:{
        'click #submit-information' : 'submitInformation',
        'click #cancel-information' : 'cancelForm'
      },

      initialize: function(){
      },

      render: function(){
        this.$el.html(this.template());
        this.delegateEvents();
        this.renderInputs();
        return this;
      },

      renderInputs: function(){
        this.renderClassInput();
        this.renderIdInput();
      },

      renderClassInput: function(){
        if(this.$classInput) this.$classInput.remove();

        this.$classInput = $(this.classInputTemplate({
          value : this.model.get('htmlClass') || ''
        }));
        this.$('#class-input').html(this.$classInput);
        return this;
      },

      renderIdInput: function(){
        if(this.$idInput) this.$idInput.remove();

        this.$idInput = $(this.idInputTemplate({
          value : this.model.get('htmlId') || ''
        }));
        this.$('#id-input').html(this.$idInput);
        return this;
      },

      submitInformation: function(){
        this.model.set('htmlClass', this.$('#class-input input').val());
        this.model.set('htmlId', this.$('#id-input input').val());
        this.cancelForm();
      },

      cancelForm: function(){
        PageDesigner.Vent.state = ' ';
        PageDesigner.Vent.trigger('state-change');
        this.unrender();
      },

      unrender: function(){
        this.unbind();
        this.$el.remove();
        this.undelegateEvents();
      }

      });

      return EditInfoView;
    });
