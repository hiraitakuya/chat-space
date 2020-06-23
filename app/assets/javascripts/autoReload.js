$(function(){
  function buildHTML(message){
    if (message.image) {
      let html = 
        `<div class="main_chat__message_list__message_box" data-message-id=${message.id}>
          <div class="main_chat__message_list__message_box__top_box">
            <div class="main_chat__message_list__message_box__top_box__member_name">
              ${ message.user_name }
            </div>
            <div class="main_chat__message_list__message_box__top_box__date_info">
              ${ message.created_at }
            </div>
          </div>
          <div class="main_chat__message_list__message">
            <p class="Message__content">
              ${ message.content }
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    }
    else {
      let html = 
        `<div class="main_chat__message_list__message_box" data-message-id=${message.id}>
          <div class="main_chat__message_list__message_box__top_box">
            <div class="main_chat__message_list__message_box__top_box__member_name">
              ${ message.user_name }
            </div>
            <div class="main_chat__message_list__message_box__top_box__date_info">
              ${ message.created_at }
            </div>
          </div>
          <div class="main_chat__message_list__message">
            <p class="Message__content">
              ${ message.content }
            </p>
          </div>
        </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.main_chat__message_list__message_box:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(message){
      if (message.length !== 0 ){
        let insertHTML = '';
        $.each(message, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.main_chat__message_list').append(insertHTML);
        $('.main_chat__message_list').animate({ scrollTop: $('.main_chat__message_list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});