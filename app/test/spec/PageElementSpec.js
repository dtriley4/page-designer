describe("Page Element", function() {

  beforeEach(function() {
    pageElement = new PageElement();
    childPageElement = new PageElement();
    pageElement.addChild(childPageElement);
  });

  it("should be able to get/set html id", function(){
    pageElement.setAttribute({'id': 'new-html-id'});
    expect(pageElement.getAttribute('id')).toEqual('new-html-id');
  });

  it("should be able to get/set html class", function(){
    pageElement.setAttribute({'class': 'new-html-class'});
    expect(pageElement.getAttribute('class')).toEqual('new-html-class');
  });

  it("should be able to add page elements", function(){
    subChildPageElement = new PageElement();
    expect(childPageElement.addChild(subChildPageElement)).toEqual(true);
  });

  it("should be able to have more then one page element child", function(){
    subChildPageElement = new PageElement();
    childPageElement.addChild(subChildPageElement);
    subChildPageElement2 = new PageElement();
    childPageElement.addChild(subChildPageElement2);
    subChildPageElement3 = new PageElement();
    childPageElement.addChild(subChildPageElement3);

    expect(pageElement.allChildrenCount()).toBeGreaterThan(1);
  });

  it("should be able to get a page element child by id", function(){
    subChildPageElement = new PageElement();
    childPageElement.addChild(subChildPageElement);
    expect(pageElement.getChild(subChildPageElement.attributes.id)).toBe(subChildPageElement);
  });

  it("should be able to get a page element child in deeper levels by id", function(){
    subChildPageElement = new PageElement();
    childPageElement.addChild(subChildPageElement);

    subSubChildPageElement = new PageElement();
    subChildPageElement.addChild(subSubChildPageElement);

    expect(pageElement.getChild(subSubChildPageElement.attributes.id)).toBe(subSubChildPageElement);
  });

  it("should be able to remove page element child", function(){
    subChildPageElement = new PageElement();
    childPageElement.addChild(subChildPageElement);
    var beforeRemove = pageElement.allChildrenCount();
    pageElement.removeChild(subChildPageElement.attributes.id);
    expect(pageElement.allChildrenCount()).toBeLessThan(beforeRemove);
  });

  it("should be able get children html", function(){
    subChildPageElement = new PageElement();
    childPageElement.addChild(subChildPageElement);

    expect(pageElement.getChildrenHtml()).toEqual('<div class="default " id="default"><div class="default " id="default"></div></div>');
  });
});
