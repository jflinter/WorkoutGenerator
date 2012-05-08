wod = {
  viewstate: {}
}

wod.viewstate.ViewState = Backbone.Model.extend(); 
wod.viewstate.state = new wod.viewstate.ViewState();
wod.viewstate.state.on('change', function(){
  localStorage.viewState = JSON.stringify(wod.viewstate.state);
});

wod.persistence = function(){ 
  this.nodes = {
    exercises: $('#exercises')
  }
  this.renderState();
  this.hookEvents();
}

wod.persistence.prototype.renderState = function(){
  if(localStorage.viewState){ //TODO - error check
    var viewState = JSON.parse(localStorage.viewState);
    wod.viewstate.state.set(viewState);
    _.each(viewState, function(checked, name){
      var node =  $('[name="' + name + '"]');
      node.prop('checked', checked === 'true');
    });
  }
};

wod.persistence.prototype.hookEvents = function(){

  this.nodes.exercises.on('click', '.controls span', _.bind(function(e){
    var node = $(this);
    var nature = $(e.target).text();
    var checked = nature === 'all';
    this.nodes.exercises.find(':checkbox').each(function(index, checkbox){
      checkbox.checked = checked;
      $(checkbox).trigger('change');
    });
  }, this));

  this.nodes.exercises.on('change', 'input[type=checkbox]', function(){
    var checkbox = $(this);
    var checked = checkbox.prop('checked');
    var key = checkbox.attr('name');
    if(!checked){
      var o = {};
      o[key] = "false"; 
      wod.viewstate.state.set(o);
    }
    else {
      wod.viewstate.state.unset(key);
    }
  });
};

$(document).ready(function(){
  wod.persistence = new wod.persistence;
});
