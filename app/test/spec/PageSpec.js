describe("Page", function() {

  beforeEach(function() {
    page = Object.create(Page);
  });

  it("should be able to register new elements", function(){
    var newElement = new Object;
    page.register(newElement);
    expect(page.childrenCount).toBeGreaterThan(0);
  });

  it("should be able to get all of the elements", function(){
    var newElement = new Object;
    page.register(newElement);
    page.getAllElements();
    expect(page.getAllElements()).toBe(page.children);
  });

  it("should be able to unregister existing elements", function(){
    var newElement = new Object;
    page.register(newElement);
    var beforeUnreg = page.childrenCount;
    page.unregister('element-0');
    expect(beforeUnreg).toBeGreaterThan(page.childrenCount);
  });

});
