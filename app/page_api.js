define([], function(){
var Page = {
  children:  {},
  childrenCount: 0,

  register: function(element) {
    var elementId = "element-" + this.childrenCount;
    this.children[elementId] = element;
    this.childrenCount++;
    return elementId;
  },

  unregister: function(elementId) {
    delete this.children[elementId];
  },

  getAllElements: function() {
    return this.children;
  }
}
return Page;
});

