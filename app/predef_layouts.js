define([
    'models/pageElement'
    ], function(PageElementModel){
      var defaultText = '####New Default Content';
PageElementModel.prototype.makeWhole =  function(){
    var row = new PageElementModel({tag: 'div', htmlClass:'row'});
    var col = new PageElementModel({tag: 'div', htmlClass:'twelve columns'});
    row.addChild(col);
    var text = new PageElementModel({tag: 'div', htmlClass:'content'});
    text.set('content', defaultText);
    col.addChild(text);
    return row;
}

PageElementModel.prototype.makeTwoHalves =  function(){
    var row = new PageElementModel({tag: 'div', htmlClass:'row'});
    var col = new PageElementModel({tag: 'div', htmlClass:'six columns'});
    row.addChild(col);
    var col2 = new PageElementModel({tag: 'div', htmlClass:'six columns'});
    row.addChild(col2);
    var text = new PageElementModel({tag: 'div', htmlClass:'content'});
    text.set('content', defaultText);
    var text2 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text2.set('content', defaultText);
    col.addChild(text);
    col2.addChild(text2);
    return row;
}

PageElementModel.prototype.makeThreeThirds =  function(){
    var row = new PageElementModel({tag: 'div', htmlClass:'row'});
    var col = new PageElementModel({tag: 'div', htmlClass:'four columns'});
    row.addChild(col);
    var col2 = new PageElementModel({tag: 'div', htmlClass:'four columns'});
    row.addChild(col2);
    var col3 = new PageElementModel({tag: 'div', htmlClass:'four columns'});
    row.addChild(col3);
    var text = new PageElementModel({tag: 'div', htmlClass:'content'});
    text.set('content', defaultText);
    var text2 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text2.set('content', defaultText);
    var text3 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text3.set('content', defaultText);
    col.addChild(text);
    col2.addChild(text2);
    col3.addChild(text3);
    return row;
}

PageElementModel.prototype.makeFourQuarters =  function(){
    var row = new PageElementModel({tag: 'div', htmlClass:'row'});
    var col = new PageElementModel({tag: 'div', htmlClass:'three columns'});
    row.addChild(col);
    var col2 = new PageElementModel({tag: 'div', htmlClass:'three columns'});
    row.addChild(col2);
    var col3 = new PageElementModel({tag: 'div', htmlClass:'three columns'});
    row.addChild(col3);
    var col4 = new PageElementModel({tag: 'div', htmlClass:'three columns'});
    row.addChild(col4);
    var text = new PageElementModel({tag: 'div', htmlClass:'content'});
    text.set('content', defaultText);
    var text2 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text2.set('content', defaultText);
    var text3 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text3.set('content', defaultText);
    var text4 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text4.set('content', defaultText);
    col.addChild(text);
    col2.addChild(text2);
    col3.addChild(text3);
    col4.addChild(text4);
    return row;
}

PageElementModel.prototype.makeHalfQuarterQuarter =  function(){
    var row = new PageElementModel({tag: 'div', htmlClass:'row'});
    var col = new PageElementModel({tag: 'div', htmlClass:'six columns'});
    row.addChild(col);
    var col2 = new PageElementModel({tag: 'div', htmlClass:'three columns'});
    row.addChild(col2);
    var col3 = new PageElementModel({tag: 'div', htmlClass:'three columns'});
    row.addChild(col3);
    var text = new PageElementModel({tag: 'div', htmlClass:'content'});
    text.set('content', defaultText);
    var text2 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text2.set('content', defaultText);
    var text3 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text3.set('content', defaultText);
    col.addChild(text);
    col2.addChild(text2);
    col3.addChild(text3);
    return row;
}

PageElementModel.prototype.makeQuarterHalfQuarter =  function(){
    var row = new PageElementModel({tag: 'div', htmlClass:'row'});
    var col = new PageElementModel({tag: 'div', htmlClass:'three columns'});
    row.addChild(col);
    var col2 = new PageElementModel({tag: 'div', htmlClass:'six columns'});
    row.addChild(col2);
    var col3 = new PageElementModel({tag: 'div', htmlClass:'three columns'});
    row.addChild(col3);
    var text = new PageElementModel({tag: 'div', htmlClass:'content'});
    text.set('content', defaultText);
    var text2 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text2.set('content', defaultText);
    var text3 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text3.set('content', defaultText);
    col.addChild(text);
    col2.addChild(text2);
    col3.addChild(text3);
    return row;
}

PageElementModel.prototype.makeQuarterQuarterHalf =  function(){
    var row = new PageElementModel({tag: 'div', htmlClass:'row'});
    var col = new PageElementModel({tag: 'div', htmlClass:'three columns'});
    row.addChild(col);
    var col2 = new PageElementModel({tag: 'div', htmlClass:'three columns'});
    row.addChild(col2);
    var col3 = new PageElementModel({tag: 'div', htmlClass:'six columns'});
    row.addChild(col3);
    var text = new PageElementModel({tag: 'div', htmlClass:'content'});
    text.set('content', defaultText);
    var text2 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text2.set('content', defaultText);
    var text3 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text3.set('content', defaultText);
    col.addChild(text);
    col2.addChild(text2);
    col3.addChild(text3);
    return row;
}

PageElementModel.prototype.makeThirdTwoThird =  function(){
    var row = new PageElementModel({tag: 'div', htmlClass:'row'});
    var col = new PageElementModel({tag: 'div', htmlClass:'four columns'});
    row.addChild(col);
    var col2 = new PageElementModel({tag: 'div', htmlClass:'eight columns'});
    row.addChild(col2);
    var text = new PageElementModel({tag: 'div', htmlClass:'content'});
    text.set('content', defaultText);
    var text2 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text2.set('content', defaultText);
    col.addChild(text);
    col2.addChild(text2);
    return row;
}

PageElementModel.prototype.makeTwoThirdThird =  function(){
    var row = new PageElementModel({tag: 'div', htmlClass:'row'});
    var col = new PageElementModel({tag: 'div', htmlClass:'eight columns'});
    row.addChild(col);
    var col2 = new PageElementModel({tag: 'div', htmlClass:'four columns'});
    row.addChild(col2);
    var text = new PageElementModel({tag: 'div', htmlClass:'content'});
    text.set('content', defaultText);
    var text2 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text2.set('content', defaultText);
    col.addChild(text);
    col2.addChild(text2);
    return row;
}

PageElementModel.prototype.makeQuarterThreeQuarter =  function(){
    var row = new PageElementModel({tag: 'div', htmlClass:'row'});
    var col = new PageElementModel({tag: 'div', htmlClass:'three columns'});
    row.addChild(col);
    var col2 = new PageElementModel({tag: 'div', htmlClass:'nine columns'});
    row.addChild(col2);
    var text = new PageElementModel({tag: 'div', htmlClass:'content'});
    text.set('content', defaultText);
    var text2 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text2.set('content', defaultText);
    col.addChild(text);
    col2.addChild(text2);
    return row;
}

PageElementModel.prototype.makeThreeQuarterQuarter =  function(){
    var row = new PageElementModel({tag: 'div', htmlClass:'row'});
    var col = new PageElementModel({tag: 'div', htmlClass:'nine columns'});
    row.addChild(col);
    var col2 = new PageElementModel({tag: 'div', htmlClass:'three columns'});
    row.addChild(col2);
    var text = new PageElementModel({tag: 'div', htmlClass:'content'});
    text.set('content', defaultText);
    var text2 = new PageElementModel({tag: 'div', htmlClass:'content'});
    text2.set('content', defaultText);
    col.addChild(text);
    col2.addChild(text2);
    return row;
}


});
