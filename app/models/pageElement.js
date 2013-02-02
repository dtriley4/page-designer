define([
    'jquery',
    'underscore',
    'backbone',
    'page',
    'backbone-nested'
    ], function($, _, Backbone, Page){
      var PageElementModel = Backbone.NestedModel.extend({
        initialize: function(newPage) {
          this.set('id', Page.register(this))
        },

      defaults: {
        'position': 0,
      'children': []

      },

      addChild: function(child) {
        this.get('children').push(child);
        this.trigger('change');
      },

      getChild: function(id){
        for (var child = 0; child < this.get('children').length; child++)
        if (this.get('children')[child].get('id') == id)
        return child;
      return -1;
      },

      removeChild: function(id) {
        var children = this.get('children');
        for (var child in children) {
          if (children.hasOwnProperty(child)) {
            if (children[child].get('id') == id) {
              children.splice(child, 1);
              Page.unregister(id);
              if(this.get('htmlClass') == 'row')
                this.cleanUpColumns();
              return true;
            }
          }
        }
      },

      removeAllChildren: function() {
        var children = this.get('children');
        for (var child in children) {
          if (children.hasOwnProperty(child)) {
            Page.unregister(children[child].get('id'));
            children.splice(child, children.length);
            return true;
          }
        }
      },

      /**
       * Add an element at the specified index
       * @param {Object} o The object to add
       * @param {int} index The index position the element has to be inserted
       * @return {Boolean} True if you can insert
       */
      insertAt : function(o, index){    
        if ( index > -1 && index <= this.get('children').length ) {
          this.get('children').splice(index, 0, o);
          return true;
        }       
        return false;
      },

      /**
       * Add an element after another element
       * @param {Object} The object before which you want to insert
       * @param {Object} The object to insert
       * @return {Boolean} True if inserted, false otherwise
       */
      insertBefore : function(o, toInsert){
        var inserted = false;
        var index = this.get('children').indexOf(o);
        if(index == -1)
          return false;
        else {
          toInsert.set('position', this.get('children').length); 
          if(index == 0){
            this.get('children').unshift(toInsert);
            return true;
          }
          else
            return this.insertAt(toInsert, index - 1);
        }   
      },

      /**
       * Add an element before another element
       * @param {Object} The object after which you want to insert
       * @param {Object} The object to insert
       * @return {Boolean} True if inserted, false otherwise
       */
      insertAfter : function(o, toInsert){
        var inserted = false;
        var index = this.get('children').indexOf(o);
        if(index == -1)
          return false;
        else {
          toInsert.set('position', this.get('children').length);
          if(index == this.length - 1){
            this.get('children').push(toInsert);
            return true;
          }
          else
            return this.insertAt(toInsert, index + 1);
        }   
      },

      cleanUpColumns: function(){
        var children = this.get('children');
        if(children.length == 1){
          for(var child in children)
            if (children.hasOwnProperty(child)) {
              children[child].attributes.htmlClass = 'twelve columns';
            }
        }
        if(children.length == 2){
          for(var child in children)
            if (children.hasOwnProperty(child)) {
              children[child].attributes.htmlClass = 'six columns';
            }
        }
        if(children.length == 3){
          for(var child in children)
            if (children.hasOwnProperty(child)) {
              children[child].attributes.htmlClass = 'four columns';
            }
        }
        else if(children.length < 1)
          console.log('i, the row, need to be deleted');

      },

      shiftAddChild: function (firstChildIndex, secondChildIndex) {
        var children = this.get('children');
        if(firstChildIndex == secondChildIndex)
          return false
            if (secondChildIndex >= children.length) {
              var k = secondChildIndex - children.length;
              while ((k--) + 1) {
                children.push(undefined);
              }
            }
        if(secondChildIndex == -1){
          if(firstChildIndex == 0)
            return false;
          children.splice(0, 0, children.splice(firstChildIndex, 1)[0]);
        }
        else{
          finalIndex = secondChildIndex;
          if(firstChildIndex > secondChildIndex)
            finalIndex = secondChildIndex + 1;
          children.splice(finalIndex, 0, children.splice(firstChildIndex, 1)[0]);
        }
        return true; 
      },

      toJsonString: function(){
        return JSON.stringify(this.attributes);        
      },

      setNewModel: function(newPage){
        var existingPage = newPage;
        for(var prop in existingPage){
          if(existingPage.hasOwnProperty(prop)){
            if(prop == 'children'){
              for(var child in existingPage[prop]){
                if (existingPage[prop].hasOwnProperty(child)) {
                  var newPageChild = new PageElementModel();
                  this.addChild(newPageChild);
                  newPageChild.setNewModel(existingPage[prop][child]);
                }
              }
            }
            else
              this.set(prop, existingPage[prop]);
          }
        }
      }

      });
      return PageElementModel;
    });
